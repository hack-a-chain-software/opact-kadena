import { defineStore } from 'pinia'
import {
  kadenaTokens,
  formatInteger,
  getConfig,
  getDepositSoluctionBatch,
  getReceiptsOfTransaction,
  getEncryptedUtxosOfTransaction,
  getKdaMessage,
  getKdaTransactionParams,
  getPublicArgs,
  MerkleTreeService,
  computeInputs,
  getRandomWallet,
  separateHex,
  getOpactTransaction
} from 'opact-sdk'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'
import { useAppStore } from '~/stores/app'

export const useReceiveStore = defineStore({
  id: 'receive-store',

  state: (): any => {
    return {
      error: '',

      addressTo: '',

      type: 'token',
      progress: 'Generating ZK Proof...',

      amount: 0,

      isLoading: false,
      receiveType: 'internal',

      selectedToken: kadenaTokens[0],

      balance: null
    }
  },

  getters: {
    isPrivate ({ receiveType }: any): boolean {
      return receiveType === 'internal'
    },

    haveFunds ({
      balance,
      amount
    }: any) {
      if (balance === null) {
        return false
      }

      return balance < amount
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

    reset (amount = '', selectedToken = kadenaTokens[0]) {
      this.amount = amount
      this.receiveType = 'internal'
      this.selectedToken = selectedToken
    },

    // TODO: remove this
    async sendInvoice () {
      const wallet = getRandomWallet()

      const {
        babyjubPubkey
      } = separateHex(this.addressTo)

      this.isLoading = true

      const integerAmount = formatInteger(
        Number(this.amount),
        12
      )

      const { provider } = useExtensions()

      const senderAddress = provider.value.account.address

      const receipts =
        getReceiptsOfTransaction({
          type: 'deposit',
          senderAddress,
          amount: integerAmount,
          selectedToken: this.selectedToken,
          receiverAddress: this.addressTo
        })

      const batch = await getDepositSoluctionBatch({
        receipts,
        senderWallet: wallet,
        receiverPubkey: babyjubPubkey,
        totalRequired: Number(this.amount),
        selectedToken: this.selectedToken
      })

      const { delta, utxosIn, utxosOut } = batch

      const encryptedUtxos = getEncryptedUtxosOfTransaction({
        batch,
        senderAddress: wallet.address,
        receiverAddress: this.addressTo
      })

      const extData = getKdaTransactionParams({
        batch,
        encryptedUtxos,
        encryptedReceipts: [],
        amount: integerAmount,
        selectedToken: this.selectedToken,
        sender: senderAddress
      })

      const message = getKdaMessage({
        extData
      })

      const config = getConfig()

      const service = new MerkleTreeService({
        chainId: 0,
        dbUrl: config.indexerUrl,
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

      const snarkjs = await import('snarkjs')

      if (!snarkjs.groth16) {
        throw new Error('groth not installed')
      }

      const { proof, publicSignals } =
        await snarkjs.groth16.fullProve(
          inputs,
          '/transaction.wasm',
          '/transaction_0001.zkey'
        )

      const publicArgs = getPublicArgs(proof, publicSignals)

      const transaction = await getOpactTransaction({
        extData,
        proof: publicArgs,
        senderAccount: senderAddress,
        signer: provider.value.account.pubkey,
        tokenSpec: this.selectedToken.namespace
      })

      await provider.value.send(
        transaction,
        (message: string) => { this.progress = message }
      )

      this.isLoading = false
    },

    async sendDeposit (wallet: any) {
      this.isLoading = true

      const integerAmount = formatInteger(
        Number(this.amount),
        12
      )

      const { provider } = useExtensions()

      const senderAddress = provider.value.account.address

      const receipts = getReceiptsOfTransaction({
        type: 'deposit',
        senderAddress,
        amount: integerAmount,
        selectedToken: this.selectedToken,
        receiverAddress: wallet.address
      })

      const batch = await getDepositSoluctionBatch({
        receipts,
        senderWallet: wallet,
        totalRequired: Number(this.amount),
        selectedToken: this.selectedToken
      })

      const { delta, utxosIn, utxosOut } = batch

      const encryptedUtxos = getEncryptedUtxosOfTransaction({
        batch,
        senderAddress: wallet.address
      })

      const extData = getKdaTransactionParams({
        batch,
        encryptedUtxos,
        encryptedReceipts: [],
        amount: integerAmount,
        selectedToken: this.selectedToken,
        sender: senderAddress
      })

      const message = getKdaMessage({
        extData
      })

      const config = getConfig()

      const service = new MerkleTreeService({
        chainId: 0,
        dbUrl: config.indexerUrl,
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

      const snarkjs = await import('snarkjs')

      if (!snarkjs.groth16) {
        throw new Error('groth not installed')
      }

      const { proof, publicSignals } =
        await snarkjs.groth16.fullProve(
          inputs,
          '/transaction.wasm',
          '/transaction_0001.zkey'
        )

      const publicArgs = getPublicArgs(proof, publicSignals)

      const transaction = await getOpactTransaction({
        extData,
        proof: publicArgs,
        senderAccount: senderAddress,
        signer: provider.value.account.pubkey,
        tokenSpec: this.selectedToken.namespace
      })

      await provider.value.send(
        transaction,
        (message: string) => { this.progress = message }
      )

      this.isLoading = false

      const router = useRouter()

      const app = useAppStore()

      app.initApp(wallet)

      router.push('/')

      this.reset()
    }
  }
})
