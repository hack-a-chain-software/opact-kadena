import axios from 'axios'
import Pact from 'pact-lang-api'
import { defineStore } from 'pinia'
import {
  poseidon,
  computeProof,
  getSolutionBatch,
  groupUtxoByToken,
  base64urlToBigInt,
  computeTreeValues,
  computeLocalTestnet,
  getSoluctionDepositBatch,
  computeTransactionParams
} from 'opact-sdk'

const RPC = process.env.NODE_ENV !== 'development' ? 'https://bpsd19dro1.execute-api.us-east-2.amazonaws.com/getdata' : 'https://cors-anywhere.herokuapp.com/http://ec2-34-235-122-42.compute-1.amazonaws.com'

export const useWalletStore = defineStore({
  id: 'opact-wallet',
  state: (): any => {
    const { cache } = useAuthStorage()

    return {
      cache,
      userData: null,

      balance: 0,

      mnemonic: '',

      node: null,
      chain: null,
      state: null,
      provider: null,
      depositing: false,
      depositMessage: 'Generating ZK Proof...',

      isLoading: true
    }
  },

  getters: {
    connected: (state: any): boolean => {
      const { node } = state

      if (!node) {
        return false
      }

      return true
    },
    truncatedAddress: (state: any): string =>
      shortenAddress(state.node.address)
  },
  actions: {
    async loadState (decrypt: any, getUtxoFromDecrypted: any) {
      this.isLoading = true
      const { data } = await axios.get(`${RPC}?salt=75`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })

      const state = await computeLocalTestnet(data, this.node, decrypt, getUtxoFromDecrypted)

      const userData = groupUtxoByToken(state.decryptedData, state.nullifiers)

      console.log('userdata', userData)

      this.state = state
      this.isLoading = false
      this.userData = userData

      return state
    },

    async found () {
      const {
        getHDWalletFromMnemonic
      } = await getSdk() || {}

      const node: any = await getHDWalletFromMnemonic(this.mnemonic)

      this.node = node

      this.persistAuth(node)
    },

    async recovery (phrase: string) {
      const {
        getHDWalletFromMnemonic
      } = await getSdk() || {}

      const node: any = await getHDWalletFromMnemonic(phrase)

      this.node = node

      this.persistAuth(node)

      return node
    },

    async reconnect () {
      return await this.recovery(this.cache.phrase)
    },

    persistAuth (node: any) {
      const { store } = useAuthStorage()

      this.node = node
      this.cache = { phrase: node.mnemonic }

      store({
        phrase: node.mnemonic
      })
    },

    async newMnemonic () {
      const {
        generateMnemonic
      } = await getSdk() || {}

      const mnemonic = generateMnemonic()

      this.mnemonic = mnemonic
    },

    async withdraw (
      amount: number,
      receiver: string,
      selectedToken = {
        id: '',
        refName: {
          name: 'coin',
          namespace: ''
        },
        refSpec: {
          name: 'fungible-v2',
          namespace: ''
        }
      }
    ) {
      const tokenHash = Pact.crypto.hash(JSON.stringify(selectedToken))

      const token = poseidon([base64urlToBigInt(tokenHash)])

      const batch = await getSolutionBatch({
        amount,
        wallet: this.node,
        treeBalance: {
          ...this.userData[1],
          token
        },
        excludedUTXOIDPositions: []
      })

      const {
        roots,
        newIns
      } = await computeTreeValues(batch, this.state.commitments)

      batch.utxosIn = [...newIns]

      const {
        args,
        extData,
        tokenSpec
      } = computeTransactionParams({
        batch,
        receiver,
        fee: 1.0,
        relayer: 1,
        selectedToken,
        wallet: this.node,
        amount: amount * (-1),
        root: roots.tree.toString(),
        sender: this.node.pubkey.toString()
      })

      const proof = await computeProof({
        batch,
        token,
        roots,
        wallet: this.node,
        message: poseidon([base64urlToBigInt(args.extDataHash)])
      })

      return {
        args,
        proof,
        extData,
        tokenSpec
      }
    },

    async deposit (
      amount: number,
      receiver?: string,
      selectedToken = {
        id: '',
        refName: {
          name: 'coin',
          namespace: ''
        },
        refSpec: {
          name: 'fungible-v2',
          namespace: ''
        }
      }
    ) {
      this.depositing = true

      const tokenHash = Pact.crypto.hash(JSON.stringify(selectedToken))

      const token = poseidon([base64urlToBigInt(tokenHash)])

      const batch = await getSoluctionDepositBatch({
        token,
        amount,
        wallet: this.node
      })

      console.log(typeof amount !== 'bigint')

      const {
        roots,
        newIns
      } = await computeTreeValues(batch, this.state.commitments)

      batch.utxosIn = [...newIns]

      const {
        args,
        extData,
        tokenSpec
      } = await computeTransactionParams({
        batch,
        amount,
        receiver,
        fee: 1.0,
        relayer: 1,
        selectedToken,
        wallet: this.node,
        root: roots.tree.toString(),
        sender: this.node.pubkey.toString()
      })

      this.depositMessage = 'Generating ZK Proof...'

      const proof = await computeProof({
        batch,
        roots,
        token,
        wallet: this.node,
        message: poseidon([base64urlToBigInt(args.extDataHash)])
      })

      return {
        args,
        proof,
        extData,
        tokenSpec
      }
    },

    verifyMnemonic (word: string, index: number) {
      return (
        this.mnemonic.split(' ')[index] === word
      )
    },

    async copyToClipboard (value?: '') {
      try {
        await navigator.clipboard.writeText(
          value || this.mnemonic
        )
        // alert('Copied')
      } catch ($e) {
        alert('Cannot copy')
      }
    },

    logout () {
      const { clear } = useAuthStorage()
      const router = useRouter()

      clear(['phrase', 'providers'])

      this.node = null
      this.cache = null

      router.push({
        path: '/auth'
      })
    }
  }
})
