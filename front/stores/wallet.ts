import axios from 'axios'
import { defineStore } from 'pinia'
import {
  groupUtxoByToken,
  computeLocalTestnet,
  getHDWalletFromMnemonic,
} from 'opact-sdk'
import { useAuthStorage } from '~/hooks/auth-storage'
import { shortenAddress } from '~/utils/string'

const RPC = process.env.NODE_ENV !== 'development'
  ? 'https://bpsd19dro1.execute-api.us-east-2.amazonaws.com/getdata'
  : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:5000/getdata'

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
    async getUserData (state: any) {
      this.isLoading = true

      let userData = {}

      if (this.node) {
        userData = groupUtxoByToken(
          state.decryptedData,
          state.nullifiers,
          this.node.pvtkey
        )
      }

      this.userData = userData
      this.isLoading = false
      this.state = state

      return state
    },

    async loadState () {
      this.isLoading = true

      const state = await computeLocalTestnet(this.node.pvtkey) as any

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
      const node: any = getHDWalletFromMnemonic(mnemonic)

      this.node = node

      this.persistAuth(node)

      return node
    },

    reconnect () {
      if (!this.cache) {
        return
      }

      return this.found(this.cache.phrase)
    },

    persistAuth (node: any) {
      const { store } = useAuthStorage()

      this.node = node
      this.cache = { phrase: node.mnemonic }

      store({
        phrase: node.mnemonic
      })
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
