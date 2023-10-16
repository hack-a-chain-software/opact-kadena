import { defineStore } from 'pinia'
import { getHDWalletFromMnemonic } from 'opact-sdk'
import { shortenAddress } from '~/utils/string'
import { useAuthStorage } from '~/hooks/auth-storage'

export const useWalletStore = defineStore({
  id: 'opact-wallet',
  state: (): any => {
    const { cache } = useAuthStorage()

    return {
      cache,
      node: null
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
    found (mnemonic: '') {
      const node: any = getHDWalletFromMnemonic(mnemonic)

      this.node = node

      this.persistAuth(node)

      return {
        pvtkey: node.pvtkey.toString()
      }
    },

    reconnect () {
      if (!this.cache) {
        return
      }

      console.log(this.cache)

      return this.found(this.cache.phrase)
    },

    persistAuth (node: any) {
      const { store } = useAuthStorage()

      this.node = node
      this.cache = {
        phrase: node.mnemonic,
        pvtkey: node.pvtkey.toString()
      }

      store({
        phrase: node.mnemonic,
        pvtkey: node.pvtkey.toString()
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
