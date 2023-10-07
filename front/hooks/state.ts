import { formatInteger, groupUtxoByToken } from 'opact-sdk'

const userState = () => useState<any>('opact:userstate', () => null)
const useOpactState = () => useState<any>('opact:state', () => null)
const useAppIsLoading = () => useState<any>('opact:isloading', () => true)

export const useAppState = () => {
  const userData = userState()
  const state = useOpactState()
  const isLoading = useAppIsLoading()

  const computeState = (secret: any) => {
    return new Promise((resolve) => {
      const worker = new Worker('/data.41198612.js', { type: 'module' })
      worker.postMessage({ input: { secret } })

      worker.addEventListener('message', (e) => {
        if (e.data.type === 'done') {
          resolve(e.data.payload)
          worker.terminate()
        }
      }, false)
    })
  }

  const computeUserData = (state: any, secret: any) => groupUtxoByToken(
    state.decryptedData,
    state.nullifiers,
    secret
  )

  const loadAppState = async (secret: any) => {
    isLoading.value = true

    const computedState = await computeState(secret)

    const computedUserData = computeUserData(computedState, secret)

    const tokens: any = {}

    if (computedUserData.coin) {
      tokens.coin = computedUserData.coin
    }

    if (computedUserData['opact-coin']) {
      tokens['opact-coin'] = computedUserData['opact-coin']
    }

    const nfts: any = {}

    if (computedUserData['poly-fungible-v2-reference']) {
      nfts['poly-fungible-v2-reference'] = computedUserData['poly-fungible-v2-reference']
    }

    console.log('computedState', computedState)

    isLoading.value = false
    state.value = computedState
    userData.value = {
      nfts,
      tokens,
    }
  }

  const updateUserData = (utxosOut: any[], utxosIn: any[], tokenId: any, amount: any, flag = 1) => {
    isLoading.value = true

    state.value.commitments = [
      ...state.value.commitments,
      ...utxosOut.map(({ hash }: any) => ({ value: hash.toString() }))
    ]

    const treeBalance = userData.value[tokenId]

    treeBalance.balance = treeBalance.balance + BigInt(formatInteger(amount * flag, 12))

    if (flag > 0) {
      treeBalance.utxos = [...treeBalance.utxos, ...utxosOut]

      userData.value = [treeBalance]

      isLoading.value = false

      return
    }

    const blindings = utxosIn.map(({ blinding }: any) => blinding)

    treeBalance.utxos = treeBalance.utxos.filter(({ blinding }: any) => !blindings.includes(blinding))

    treeBalance.utxos = [...treeBalance.utxos, ...utxosOut]

    userData.value = [treeBalance]

    isLoading.value = false
  }

  return {
    state,
    userData,
    isLoading,
    computeState,
    loadAppState,
    updateUserData,
    computeUserData
  }
}
