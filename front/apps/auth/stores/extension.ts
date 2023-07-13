import { defineStore } from 'pinia'

export const useExtensionStore = defineStore({
  id: 'opact-extension',
  state: (): any => ({
    account: null,
    provider: null
  }),

  getters: {
    connected: (state: any): boolean => !!state.account,
    truncatedAddress: (state: any): string =>
      shortenAddress(state.node.address)
  },

  actions: {
    async login (
      chainKey: any,
      adapterKey: any,
      callback = () => {}
    ) {
      const chain = getChainByKey(chainKey)

      if (!chain) {
        return
      }

      const provider = chain.getAdapters(adapterKey)

      const { store } = useAuthStorage()

      try {
        await provider.connect(callback)

        this.provider = provider

        store({
          providers: [{ chainKey, adapterKey }]
        })
      } catch (e) {
        console.log(e)
      }
    },

    async logout () {
      await this.provider.disconnect()

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
