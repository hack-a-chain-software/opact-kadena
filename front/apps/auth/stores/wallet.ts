import { defineStore } from 'pinia'

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
      const { node } = await recoveryWallet(this.cache)

      this.node = node
    },

    persistAuth (node: any) {
      const { store } = useAuthStorage()

      this.node = node
      this.cache = node.mnemonic

      store(node)
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

    async login (chainKey: any, providerKey: any) {
      // newMnemonic()
      const chain = getChainByKey(chainKey)

      if (!chain) {
        return
      }

      const provider = chain.getProvider(providerKey)

      try {
        const { account } = await provider.connect(chain)

        this.address = account.account
        this.publicKey = account.publicKey
      } catch (e) {
        console.log(e)

        return
      }

      this.chain = chain
      this.provider = provider
    },

    logout () {
      const { clear } = useAuthStorage()
      const router = useRouter()

      clear()

      this.node = null
      this.cache = null

      router.push({
        path: '/auth'
      })
    },

    signPayload (message: string) {
      return this.provider.sign(
        {
          chain: this.chain,
          provider: this.provider,
          address: this.address,
          publicKey: this.publicKey
        },
        message
      )
    }
  }
})
