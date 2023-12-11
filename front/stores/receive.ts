import { defineStore } from 'pinia'
import {
  kadenaTokens,
  formatInteger,
  getDepositSoluctionBatch,
  getReceiptsOfTransaction,
  getEncryptedUtxosOfTransaction,
  getKdaMessage,
  getKdaTransactionParams,
  getPublicArgs,
  MerkleTreeService,
  computeInputs
} from 'opact-sdk'
import { groth16 } from 'snarkjs'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'
import { useAppStore } from '~/stores/app'

export const useReceiveStore = defineStore({
  id: 'receive-store',

  state: (): any => {
    return {
      error: '',

      type: 'token',
      progress: 'Generating ZK Proof...',

      amount: 0,

      isLoading: false,
      receiveType: 'internal',

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

    reset (amount = '', selectedToken = kadenaTokens[0]) {
      this.amount = amount
      this.receiveType = 'internal'
      this.selectedToken = selectedToken
    },

    async sendDeposit (wallet: any) {
      this.isLoading = true

      const integerAmount = formatInteger(
        Number(this.amount),
        12
      )

      const { provider } = useExtensions()

      const receipts = getReceiptsOfTransaction({
        type: 'deposit',
        amount: integerAmount,
        selectedToken: this.selectedToken,
        receiverAddress: wallet.address,
        senderAddress:
          provider.value.account.account.publicKey
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
        sender: provider.value.account.account.publicKey
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

      await provider.value.transaction(
        txArgs,
        (message: string) => { this.progress = message }
      )

      this.isLoading = false

      const router = useRouter()

      const app = useAppStore()

      app.initApp(wallet)

      router.push('/home')

      this.reset()
    }
  }
})
