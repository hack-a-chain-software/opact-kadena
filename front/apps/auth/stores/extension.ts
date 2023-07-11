import { defineStore } from 'pinia'

export const useExtensionStore = defineStore({
  id: 'opact-extension',
  state: (): any => ({
    chain: null,
    provider: null,
    account: null
  }),

  getters: {
    connected: (state: any): boolean => !!state.account,
    truncatedAddress: (state: any): string =>
      shortenAddress(state.node.address)
  },

  actions: {
    async login (chainKey: any, providerKey: any) {
      console.log(chainKey, providerKey)
      const chain = getChainByKey(chainKey)

      if (!chain) {
        return
      }

      const provider = chain.getProvider(providerKey)

      const { store } = useAuthStorage()

      try {
        const { account } = await provider.connect(chain)

        this.chain = chain
        this.account = account
        this.provider = provider

        store({
          providers: [{ chainKey, providerKey }]
        })
      } catch (e) {
        console.log(e)
      }
    },

    async logout () {
      await this.provider.disconnect(this.chain)

      this.chain = null
      this.account = null
      this.provider = null

      const { clear } = useAuthStorage()

      clear(['providers'])
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
