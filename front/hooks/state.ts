import { groupUtxoByToken } from 'opact-sdk'
import { useStateStorage } from './state-starage'

const userState = () =>
  useState<any>('opact:userstate', () => null)
const useOpactState = () =>
  useState<any>('opact:state', () => null)
const useReceipts = () =>
  useState<any>('opact:userreceips', () => null)
const useAppIsLoading = () =>
  useState<any>('opact:isloading', () => true)

export const useAppState = () => {
  const userData = userState()
  const state = useOpactState()
  const receipts = useReceipts()
  const isLoading = useAppIsLoading()

  const { $toaster } = useNuxtApp()

  const { get, store } = useStateStorage()

  const computeState = (
    secret: any,
    currentId: any,
    storedUtxos: any,
    storedReceipts: any
  ): Promise<any> => {
    return new Promise((resolve) => {
      const worker = new Worker('/data.69a0031b.js', {
        type: 'module'
      })
      worker.postMessage({
        input: {
          secret,
          currentId,
          storedUtxos,
          storedReceipts
        }
      })

      worker.addEventListener(
        'message',
        (e) => {
          if (e.data.type === 'done') {
            resolve(e.data.payload)
            worker.terminate()
          }
        },
        false
      )
    })
  }

  const computeUserData = (state: any, secret: any) =>
    groupUtxoByToken(
      state.decryptedData,
      state.nullifiers,
      secret
    )

  const loadAppState = async (secret: any) => {
    isLoading.value = true

    const { currentId, storedUtxos, storedReceipts } =
      get()

    console.log('currentId', currentId)
    console.log('storedUtxos', storedUtxos)
    console.log('storedReceipts', storedReceipts)

    const {
      lastId,
      treeBalances = {},
      receipts: loadedReceipts = {}
    } = (await computeState(
      secret,
      currentId,
      storedUtxos,
      storedReceipts
    )) || {}

    console.log('treeBalances', treeBalances)

    const tokens: any = {}

    if (treeBalances.coin) {
      tokens.coin = treeBalances.coin
    }

    if (treeBalances['opact-coin']) {
      tokens['opact-coin'] = treeBalances['opact-coin']
    }

    const nfts: any = {}

    if (treeBalances['poly-fungible-v2-reference']) {
      nfts['poly-fungible-v2-reference'] =
        treeBalances['poly-fungible-v2-reference']
    }

    isLoading.value = false
    receipts.value = loadedReceipts
    userData.value = {
      nfts,
      tokens
    }

    store(userData.value, loadedReceipts, lastId)
  }

  const updateUserData = (args: any, flag = 1) => {
    const {
      batch,
      token,
      tokenType,
      extData: { tokenAmount }
    } = args

    isLoading.value = true

    const name = token.namespace.refName.name

    let treeBalance = userData.value[tokenType][name]

    if (!treeBalance) {
      treeBalance = {
        token: {
          ...token,
          decimals: 12
        },
        utxos: [],
        balance: BigInt(0)
      }
    }

    treeBalance.balance =
      treeBalance.balance + BigInt(tokenAmount)

    if (flag > 0) {
      treeBalance.utxos = [
        ...treeBalance.utxos,
        ...batch.utxosOut.filter(
          ({ amount }: any) => amount > 0
        )
      ]

      userData.value[tokenType][name] = treeBalance

      isLoading.value = false

      $toaster.success({
        title: 'Deposit sent'
      })

      store(userData.value)

      return
    }

    const blindings = batch.utxosIn.map(
      ({ blinding }: any) => blinding
    )

    treeBalance.utxos = treeBalance.utxos.filter(
      ({ blinding }: any) => !blindings.includes(blinding)
    )

    treeBalance.utxos = [
      ...treeBalance.utxos,
      ...batch.utxosOut.filter(
        ({ amount }: any) => amount > 0
      )
    ]

    userData.value[tokenType][name] = treeBalance

    store(userData.value)

    isLoading.value = false

    $toaster.success({
      type: 'success',
      title: 'Transfer sent'
    })
  }

  return {
    // States
    state,
    receipts,
    userData,
    isLoading,

    // Functions
    computeState,
    loadAppState,
    updateUserData,
    computeUserData
  }
}
