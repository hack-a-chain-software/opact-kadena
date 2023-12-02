import { defineStore } from 'pinia'
import { kadenaBaseTokens, formatInteger, getTransferSolutionBatch, getEncryptedReceiptsOfTransaction, getEncryptedUtxosOfTransaction, getKdaTransactionParams, getKdaMessage, MerkleTreeService, computeInputs, getPublicArgs } from 'opact-sdk'
import { groth16 } from 'snarkjs'
import {
  formatBigNumberWithDecimals,
  getDecimals
} from 'opact-sdk'
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

      loading: false,
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
      return selectedToken?.address !== 'coin' &&
        !this.isInternalTransfer
    },

    isDisabled ({
      type,
      token,
      amount,
      isValidAddress
    }: any): boolean {
      if (type === 'nft') {
        return !isValidAddress || !token
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

      this.loading = true

      const { userData } = useAppState()

      const integerAmount = formatInteger(
        Number(this.amount),
        12
      )

      const treeBalance = userData.value.tokens[this.selectedToken.address]

      const receiver = this.addressTo

      const amount = this.amount

      const batch = await getTransferSolutionBatch({
        treeBalance,
        senderWallet: wallet,
        totalRequired: amount,
        receiverAddress: this.isInternalTransfer
          ? receiver
          : null,
        selectedToken: this.selectedToken
      })

      const {
        delta,
        utxosIn,
        utxosOut
      } = batch

      const encryptedReceipts = getEncryptedReceiptsOfTransaction({
        type: this.isInternalTransfer
          ? 'transfer'
          : 'withdraw',
        receiverAddress: receiver,
        senderAddress: wallet.address,
        selectedToken: this.selectedToken,
        amount: (integerAmount as any) * -1
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
        encryptedUtxos,
        encryptedReceipts,
        amount: integerAmount,
        sender: wallet.address,
        selectedToken: this.selectedToken,
        receiverAddress: this.isInternalTransfer
          ? receiver
          : null
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
        selectedToken: kadenaBaseTokens[0],
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

      console.log('txArgs', txArgs)

      console.log('inputs', inputs)
    }

    // async sendTransferNFT () {
    //   this.error = ''

    //   this.loading = true

    //   let params = null

    //   const { userData } = useAppState()

    //   const integerAmount = formatInteger(
    //     1,
    //     12
    //   )

    // }
  }
})
