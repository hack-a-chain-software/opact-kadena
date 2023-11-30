import { reactive, computed } from 'vue'
// import { baseUrl } from '~/utils/constants'
import {
  kadenaBaseTokens,
  formatInteger,
  getDepositSoluctionBatch,
  getEncryptedReceiptsOfTransaction,
  getEncryptedUtxosOfTransaction,
  getKdaMessage,
  MerkleTreeService,
  getKdaTransactionParams,
  getKdaTransactionParams,
  getPublicArgs,
  MerkleTreeService,
  computeInputs
} from 'opact-sdk'
import { groth16 } from 'snarkjs'

export const useReceiveForm = (
  amount = 0,
  token = kadenaBaseTokens[0]
) => {
  const data = reactive<{ stepForm: string }>({
    token,
    amount,

    loading: false,

    stepForm: 'receive',
    receiveType: 'external'
  })

  const { provider } = useExtensions()

  const { account } = useOpactWallet()

  const isPrivate = computed(() => data.receiveType === 'internal')

  const updateTokenValue = (newValue: any) => {
    data.token = newValue

    return newValue
  }

  const updateAmountValue = (newValue: any) => {
    data.amount = newValue

    return newValue
  }

  const updateReceiveTypeValue = (newValue: any) => {
    data.receiveType = newValue

    return newValue
  }

  const link = computed(() => {
    if (!data.token) {
      return ''
    }

    if (isPrivate.value) {
      return 'privateaddres kekw'
    }

    return `${baseUrl}/invoice?token=${data?.token?.id}&amount=${data?.amount}&pubkey=$dwqkodpwqkdopwqkdopwqkopdwqkdwqkp`
  })

  const isDisabled = computed(() => {
    const {
      token,
      amount,
      receiveType
    } = data

    return !amount || !receiveType || !token || amount === '0.0'
  })

  const deposit = async () => {
    data.loading = true

    const wallet = account.value

    const integerAmount = formatInteger(Number(data.amount), 12)

    const batch = await getDepositSoluctionBatch({
      senderWallet: wallet,
      totalRequired: Number(data.amount),
      selectedToken: kadenaBaseTokens[0]
    })

    const {
      delta,
      utxosIn,
      utxosOut
    } = batch

    const encryptedReceipts = getEncryptedReceiptsOfTransaction({
      type: 'deposit',
      amount: integerAmount,
      selectedToken: data.token,
      receiverAddress: wallet.address,
      senderAddress: provider.value.account.account.publicKey
    })

    const encryptedUtxos = getEncryptedUtxosOfTransaction({
      batch,
      senderAddress: wallet.address
    })

    const extData = getKdaTransactionParams({
      batch,
      encryptedUtxos,
      encryptedReceipts,
      amount: integerAmount,
      selectedToken: data.token,
      sender: provider.value.account.account.publicKey
    })

    const message = getKdaMessage({
      extData
    })

    const service = new MerkleTreeService({
      chainId: 0,
      dbUrl: 'https://bpsd19dro1.execute-api.us-east-2.amazonaws.com/commitments',
      instanceName: 'commitments-tree'
    })

    await service.getTree()

    const {
      treeRoot,
      newIns: updatedUtxosInWithTreeValues
    } = await service.computeTreeValues(utxosIn)

    const {
      subtreeRoot,
      newIns: updatedUtxosInWithSubtreeValues
    } = await service.computeSubTreeValues(updatedUtxosInWithTreeValues)

    const { inputs } = await computeInputs({
      delta,
      wallet,
      message,
      utxosOut,
      selectedToken: data.token,
      utxosIn: updatedUtxosInWithSubtreeValues,
      roots: {
        tree: treeRoot,
        subtree: subtreeRoot
      }
    })

    const {
      proof,
      publicSignals
    } = await groth16.fullProve(
      inputs,
      '/transaction.wasm',
      '/transaction_0001.zkey'
    )

    const publicArgs = getPublicArgs(proof, publicSignals)

    const txArgs = {
      batch,
      extData,
      proof: publicArgs,
      tokenSpec: data.token.namespace
    }

    console.log('txArgs', txArgs)

    const txRes = await provider.value.transaction(
      txArgs,
      (message: string) => { console.log('message', message) }
    )

    data.loading = false

    console.log('txArgs', txRes)
  }

  const reset = () => {
    data.amount = ''
    data.receiveType = ''
    data.token = null
  }

  return {
    data,
    account,
    provider,

    // Computed
    link,
    isPrivate,
    isDisabled,

    reset,
    deposit,
    updateTokenValue,
    updateAmountValue,
    updateReceiveTypeValue
  }
}
