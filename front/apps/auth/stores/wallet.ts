import { defineStore } from 'pinia'
// import { useExtensionStore } from './extension'

export const useWalletStore = defineStore({
  id: 'opact-wallet',
  state: (): any => {
    const { cache } = useAuthStorage()

    return {
      cache,

      mnemonic: '',

      balance: 0,

      chain: null,
      node: null,
      provider: null
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
    async found () {
      const { node } = await foundWallet()

      this.persistAuth(node)
    },

    async recovery (phrase: string) {
      const { node } = await recoveryWallet({ phrase })

      this.node = node

      this.persistAuth(node)
    },

    async reconnect () {
      console.log(this.cache, 'your cache')

      const { node } = await recoveryWallet(this.cache)

      this.node = node

      if (!this.cache.adapters) {
        //
      }

      // const extension = useExtensionStore()

      // this.cache.adapters.forEach((payload: any) => {
      //   extension.login(
      //     payload.chainKey,
      //     payload.providerKey
      //   )
      // })
    },

    persistAuth (node: any) {
      const { store } = useAuthStorage()

      this.node = node
      this.cache = node.mnemonic

      store({
        phrase: node.mnemonic.phrase
      })
    },

    async newMnemonic () {
      const { node }: any = await foundWallet()

      this.node = node
      this.mnemonic = node.mnemonic.phrase
    },

    verifyMnemonic (word: string, index: number) {
      return (
        this.node.mnemonic.phrase.split(' ')[index] === word
      )
    },

    async copyToClipboard () {
      try {
        await navigator.clipboard.writeText(this.mnemonic)
        // alert('Copied')
      } catch ($e) {
        alert('Cannot copy')
      }
    },

    async encrypt () {
      console.log(this.node)

      const foo = await this.node.encrypt('password123', {
        scrypt: {
          // The number must be a power of 2 (default: 131072)
          N: 64
        }
      })

      console.log(foo)
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
