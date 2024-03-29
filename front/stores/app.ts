import { defineStore } from 'pinia'
import { getConfig, useStateStorage } from 'opact-sdk'

export const useAppStore = defineStore({
  id: 'app-store',

  state: (): any => {
    return {
      isLoading: true,

      receipts: [],
      treeBalances: null
    }
  },

  actions: {
    getUserBalanceAndReceipts ({
      secret,
      currentId,
      storedUtxos
    }: any): Promise<any> {
      const config = getConfig()

      const name = config.key === 'kadena:testnet' ? 'testnet' : 'localnet'

      return new Promise((resolve) => {
        const worker = new Worker(`/worker/${name}.js`, {
          type: 'module'
        })

        worker.postMessage({
          input: {
            config,
            secret,
            currentId,
            storedUtxos
          }
        })

        worker.addEventListener(
          'message',
          (e) => {
            if (e.data.type === 'done') {
              resolve(e.data.payload)
              worker.terminate()
            }
          },
          false
        )
      })
    },

    async initApp (wallet: any) {
      this.isLoading = true

      const {
        get,
        store
      } = useStateStorage({
        key: wallet.address
      })

      const {
        indexOf,
        encryptedUtxos
      } = await get()

      const {
        lastId,
        receipts = [],
        treeBalances = {},
        encryptedUtxos: newEncryptedUtxos = []
      } = await this.getUserBalanceAndReceipts({
        storedUtxos: encryptedUtxos,
        currentId: indexOf,
        secret: wallet.pvtkey
      })

      // TODO: REFACT THIS
      const nfts: any = {}
      const tokens: any = {}

      if (treeBalances.coin) {
        tokens.coin = treeBalances.coin
      }

      this.receipts = receipts

      this.treeBalances = {
        nfts,
        tokens
      }

      await store({
        indexOf: lastId,
        encryptedUtxos: newEncryptedUtxos
      })

      this.isLoading = false
    }
  }
})
