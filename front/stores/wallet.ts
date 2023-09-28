import axios from 'axios'
import Pact from 'pact-lang-api'
import { useAuthStorage } from '~/hooks/auth-storage'
import { defineStore } from 'pinia'
import {
  poseidon,
  computeProof,
  getSolutionBatch,
  groupUtxoByToken,
  base64urlToBigInt,
  computeTreeValues,
  computeLocalTestnet,
  getHDWalletFromMnemonic,
  computeTransactionParams,
  getNullifier
} from 'opact-sdk'

const RPC = process.env.NODE_ENV !== 'development' ? 'https://bpsd19dro1.execute-api.us-east-2.amazonaws.com/getdata' : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:5000/getdata'

export const useWalletStore = defineStore({
  id: 'opact-wallet',
  state: (): any => {
    const { cache } = useAuthStorage()

    return {
      cache,

      balance: 0,

      node: null,
      state: null,
      userData: null,

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
    async loadState () {
      this.isLoading = true
      const { data } = await axios.get(`${RPC}?salt=75`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })

      const state = await computeLocalTestnet(data, this.node) as any

      let userData = null

      if (this.node) {
        userData = groupUtxoByToken(
          state.decryptedData,
          state.nullifiers,
          this.node.pvtkey
        )
      }

      this.state = state
      this.isLoading = false
      this.userData = userData

      return state
    },

    async found (mnemonic: '') {
      const node: any = await getHDWalletFromMnemonic(mnemonic)

      this.node = node

      this.persistAuth(node)
    },

    async reconnect () {
      if (!this.cache) {
        return
      }

      return await this.found(this.cache.phrase)
    },

    persistAuth (node: any) {
      const { store } = useAuthStorage()

      this.node = node
      this.cache = { phrase: node.mnemonic }

      store({
        phrase: node.mnemonic
      })
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
        pubkey: this.node.pubkey,
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

      console.log('this.node', this.node)

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
        amount: amount * (-1),
        pubkey: this.node.pubkey,
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

      console.log(args, extData, tokenSpec)

      return {
        args,
        proof,
        extData,
        tokenSpec
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
