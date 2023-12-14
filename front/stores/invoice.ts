import { defineStore } from 'pinia'
import {
  kadenaTokens,
  formatInteger,
  getDepositSoluctionBatch,
  getEncryptedReceiptsOfTransaction,
  getEncryptedUtxosOfTransaction,
  getKdaMessage,
  getKdaTransactionParams,
  getPublicArgs,
  MerkleTreeService,
  computeInputs,
  getRandomWallet,
  separateHex
} from 'opact-sdk'
import { groth16 } from 'snarkjs'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'

export const useInvoiceStore = defineStore({
  id: 'receive-store',

  state: (): any => {
    // const { cache } = useAuthStorage()

    return {
      error: '',

      type: 'token',

      balance: 0,

      addressTo: '',

      progress: 'Generating ZK Proof...',

      amount: 0,

      isLoading: false,
      receiveType: 'external',

      selectedToken: kadenaTokens[0]
    }
  },

  getters: {
    isPrivate ({ receiveType }: any): boolean {
      return receiveType === 'internal'
    },

    isDisabled ({
      amount,
      receiveType,
      selectedToken
    }: any): boolean {
      return !amount || !receiveType || !selectedToken || amount === '0.0'
    },

    link ({
      type,
      amount,
      isPrivate,
      selectedToken
    }: any): string {
      const baseUrl =
        process.env.NODE_ENV === 'development'
          ? 'localhost:3000'
          : window?.location?.origin

      const wallet = useWalletStore()

      const { account } = storeToRefs(wallet)

      const route = isPrivate ? 'send' : 'invoice'

      if (type === 'nft') {
        return `${baseUrl}/${route}/nft?address=${account.value.address}`
      }

      const params = [`?address=${account.value.address}`]

      if (selectedToken) {
        params.push(`token=${selectedToken.id}`)
      }

      if (amount && amount !== '0.0') {
        params.push(`amount=${amount}`)
      }

      return `${baseUrl}/${route}/token${params.join('&')}`
    }
  },
  actions: {
    init (
      amount = 0,
      type = 'token',
      selectedToken = kadenaTokens[0]
    ) {
      this.type = type
      this.amount = amount
      this.selectedToken = selectedToken
    },

    reset () {
      this.amount = ''
      this.token = null
      this.receiveType = 'external'
    },

    async sendDepositToken () {
      const wallet = getRandomWallet()

      const {
        babyjubPubkey
      } = separateHex(this.addressTo)

      this.isLoading = true

      const integerAmount = formatInteger(
        Number(this.amount),
        12
      )

      const batch = await getDepositSoluctionBatch({
        senderWallet: wallet,
        receiverPubkey: babyjubPubkey,
        totalRequired: Number(this.amount),
        selectedToken: this.selectedToken
      })

      const { delta, utxosIn, utxosOut } = batch

      const { provider } = useExtensions()

      const senderAddress = `k:${provider.value.account.account.publicKey}`

      const encryptedReceipts =
        getEncryptedReceiptsOfTransaction({
          type: 'deposit',
          senderAddress,
          amount: integerAmount,
          selectedToken: this.selectedToken,
          receiverAddress: this.addressTo
        })

      const encryptedUtxos = getEncryptedUtxosOfTransaction({
        batch,
        senderAddress: wallet.address,
        receiverAddress: this.addressTo
      })

      const extData = getKdaTransactionParams({
        batch,
        encryptedUtxos,
        encryptedReceipts,
        amount: integerAmount,
        selectedToken: this.selectedToken,
        sender: senderAddress
      })

      const message = getKdaMessage({
        extData
      })

      const service = new MerkleTreeService({
        chainId: 0,
        dbUrl:
          'https://bpsd19dro1.execute-api.us-east-2.amazonaws.com/commitments',
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
      } = await service.computeSubTreeValues(
        updatedUtxosInWithTreeValues
      )

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

      const { proof, publicSignals } =
        await groth16.fullProve(
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

      await provider.value.sendOpactTransaction(
        txArgs,
        (message: string) => { this.progress = message }
      )

      this.isLoading = false
    }
  }
})
