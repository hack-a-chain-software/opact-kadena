import { defineStore } from 'pinia'
import { getWalletFromMnemonic } from 'opact-sdk'
import { shortenAddress } from '~/utils/string'
import { useAuthStorage } from '~/hooks/auth-storage'
import { useStateStorage } from '~/hooks/state-starage'

export const useWalletStore = defineStore({
  id: 'opact-wallet',

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

      this.persistAuth(mnemonic)

      this.account = newAccount

      return newAccount
    },

    reconnect () {
      if (!this.cache) {
        return
      }

      return this.connect(this.cache.phrase)
    },

    persistAuth (mnemonic: any) {
      const { store } = useAuthStorage()

      const newCache = {
        phrase: mnemonic
      }

      store(newCache)
    },

    logout () {
      const { clear } = useAuthStorage()
      const { clear: clearState } = useStateStorage()

      const router = useRouter()

      clear()
      clearState()

      this.cache = null
      this.account = null

      router.push({
        path: '/auth'
      })
    }
  }
})
