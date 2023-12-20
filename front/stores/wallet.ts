import { defineStore } from 'pinia'
import {
  shortenAddress,
  useStateStorage,
  getWalletFromMnemonic
} from 'opact-sdk'
import { useAuthStorage } from '~/hooks/auth-storage'

export const useWalletStore = defineStore({
  id: 'wallet-store',

  state: (): any => {
    const { cache } = useAuthStorage()

    return {
      cache,
      account: null
    }
  },

  getters: {
    connected: (state: any): boolean => {
      const { account } = state

      return !!account
    },
    truncatedAddress: (state: any): string =>
      shortenAddress(state.node.address)
  },

  actions: {
    connect (mnemonic: string) {
      if (!mnemonic) {
        throw new Error('Needs mnemonic to connect')
      }

      const newAccount = getWalletFromMnemonic(mnemonic)

      this.account = newAccount

      this.persistAuth(newAccount, mnemonic)

      return {
        pvtkey: newAccount.pvtkey.toString()
      }
    },

    reconnect () {
      if (!this.cache) {
        return
      }

      return this.connect(this.cache.phrase)
    },

    persistAuth (account: any, mnemonic: any) {
      const { store } = useAuthStorage()

      const newCache = {
        phrase: mnemonic,
        pvtkey: account.pvtkey.toString()
      }

      this.cache = {
        ...newCache
      }

      store(newCache)
    },

    async logout () {
      const { clear } = useAuthStorage()

      const { clear: clearState } = useStateStorage({
        key: this.account.address
      })

      const router = useRouter()

      await clear()
      await clearState()

      this.cache = null
      this.account = null

      router.push({
        path: '/auth'
      })
    }
  }
})
