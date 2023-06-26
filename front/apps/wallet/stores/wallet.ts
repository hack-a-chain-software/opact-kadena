import { defineStore } from 'pinia'

export const useWalletStore = defineStore({
  id: 'opact-wallet',
  state: (): any => ({
    balance: 0,

    chain: null,
    provider: null,

    address: '',
    publicKey: ''
  }),

  getters: {
    connected: (state: any): boolean =>
      !!state.address && !!state.publicKey
  },

  actions: {
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
      this.provider.disconnect()
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
