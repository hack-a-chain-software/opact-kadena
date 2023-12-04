import { defineStore } from 'pinia'
import {
  getDecimals,
  computeInputs,
  formatInteger,
  getKdaMessage,
  getPublicArgs,
  kadenaBaseTokens,
  MerkleTreeService,
  getKdaTransactionParams,
  getTransferSolutionBatch,
  formatBigNumberWithDecimals,
  getEncryptedUtxosOfTransaction,
  getTransferSolutionBatchForNFT,
  getEncryptedReceiptsOfTransaction
} from 'opact-sdk'
import { groth16 } from 'snarkjs'
import { useAppState } from '~/hooks/state'

export const useTransferStore = defineStore({
  id: 'transfer-store',

  state: (): any => {
    // const { cache } = useAuthStorage()

    return {
      error: '',
      addressTo: '',

      type: 'token',
      progress: 'Generating ZK Proof...',

      amount: 0,

      isLoading: false,
      isValidAddress: false,

      selectedToken: kadenaBaseTokens[0]
    }
  },

  getters: {
    balance (state: any): string {
      const { selectedToken } = state

      if (!selectedToken) {
        return '0'
      }

      const decimals = getDecimals(12)

      const { userData } = useAppState()

      return formatBigNumberWithDecimals(
        userData?.value?.tokens[selectedToken.address]?.balance || 0,
        decimals
      )
    },

    isInternalTransfer ({ addressTo }: any): boolean {
      return addressTo.includes('OZK')
    },

    showConnectWalletButton ({ selectedToken }: any): any {
      return selectedToken?.address !== 'coin' && !this.isInternalTransfer
    },

    isDisabled ({
      type,
      amount,
      selectedToken,
      isValidAddress
    }: any): boolean {
      if (type === 'nfts') {
        return !isValidAddress || !selectedToken
      }

      return !isValidAddress ||
        amount > Number(this.balance) ||
        amount <= 0
    }
  },
  actions: {
    init (
      amount = 0,
      type = 'token',
      selectedToken = kadenaBaseTokens[0]
    ) {
      this.type = type
      this.amount = amount
      this.selectedToken = selectedToken
    },

    async sendTransferToken (wallet: any) {
      this.error = ''

      this.isLoading = true

      const { userData, loadAppState } = useAppState()

      const integerAmount = formatInteger(
        Number(this.amount) * -1,
        12
      )

      let treeBalance = null

      if (this.type === 'nfts') {
        treeBalance = userData.value.nfts[this.selectedToken.address]
      } else {
        treeBalance = userData.value.tokens[this.selectedToken.address]
      }

      const receiver = this.addressTo

      const amount = this.amount

      let batch = null

      if (this.type === 'nfts') {
        batch = await getTransferSolutionBatchForNFT({
          treeBalance,
          totalRequired: amount,
          senderWallet: wallet,
          receiverAddress: this.isInternalTransfer
            ? receiver
            : null,
          selectedToken: this.selectedToken
        })

        console.log('batch', batch)
      } else {
        batch = await getTransferSolutionBatch({
          treeBalance,
          senderWallet: wallet,
          totalRequired: amount,
          receiverAddress: this.isInternalTransfer
            ? receiver
            : null,
          selectedToken: this.selectedToken
        })
      }

      const {
        delta,
        utxosIn,
        utxosOut
      } = batch

      const encryptedReceipts = getEncryptedReceiptsOfTransaction({
        amount: integerAmount,
        receiverAddress: receiver,
        senderAddress: wallet.address,
        selectedToken: this.selectedToken,
        type: this.isInternalTransfer
          ? 'transfer'
          : 'withdraw'
      })

      const encryptedUtxos = getEncryptedUtxosOfTransaction({
        batch,
        senderAddress: wallet.address,
        receiverAddress: this.isInternalTransfer
          ? receiver
          : null
      })

      const extData = getKdaTransactionParams({
        batch,
        receiver,
        encryptedUtxos,
        encryptedReceipts,
        sender: wallet.address,
        selectedToken: this.selectedToken,
        amount: this.isInternalTransfer ? 0 : integerAmount
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
        selectedToken: this.selectedToken,
        utxosIn: updatedUtxosInWithSubtreeValues,
        roots: {
          tree: treeRoot,
          subtree: subtreeRoot
        }
      })

      const { proof, publicSignals } = await groth16.fullProve(
        inputs,
        '/transaction.wasm',
        '/transaction_0001.zkey'
      )

      const publicArgs = getPublicArgs(proof, publicSignals)

      const txArgs = {
        batch,
        extData,
        proof: publicArgs,
        tokenSpec: this.selectedToken.namespace
      }

      if (this.isInternalTransfer || this.selectedToken.address === 'coin') {
        await sendPactTransaction(
          receiver,
          txArgs,
          (message: string) => (this.progress = message)
        )
      } else {
        const { provider } = useExtensions()

        await provider.value.transaction(
          txArgs,
          (message: string) => (this.progress = message),
          true,
          receiver
        )
      }

      this.isLoading = false

      const router = useRouter()

      loadAppState(wallet.pvtkey)
      router.push('/home')
    }
  }
})
