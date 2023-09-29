import axios from 'axios'
import { defineStore } from 'pinia'
import {
  groupUtxoByToken,
  // computeLocalTestnet,
  decrypt,
  getUtxoFromDecrypted,
  getHDWalletFromMnemonic,
} from 'opact-sdk'
import { useAuthStorage } from '~/hooks/auth-storage'

const RPC = process.env.NODE_ENV !== 'development' ? 'https://bpsd19dro1.execute-api.us-east-2.amazonaws.com/getdata' : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:5000/getdata'

export const computeLocalTestnet = async (data: any[], wallet?: any) => {
  return data
    .sort((a: any, b: any) => a.txid - b.txid)
    .map(({ events }: any) => events)
    .reduce((acc: any, curr: any) => acc.concat(curr), [])
    .reduce((curr: any, event: any) => {
      if (event.name === 'new-nullifier') {
        curr.nullifiers = [...curr.nullifiers, ...event.params.reduce((acc: any, param: any) => {
          if (Array.isArray(param)) {
            return [...acc, ...param.map((parm: any) => parm.int)]
          }

          return [param.int]
        }, [])]
      }

      if (event.name === 'new-commitment') {
        const commitment = {
          value: event.params[0].int,
          order: event.params[1].int
        }

        curr.commitments = [...curr.commitments, commitment]
      }

      if (event.name === 'new-encrypted-output') {
        try {
          const [
            encrypted
          ] = event.params

          const value = getUtxoFromDecrypted(decrypt(
            encrypted,
            wallet.pvtkey,
          ))

          curr.decryptedData = [...curr.decryptedData, value]
        } catch (e) {
          // console.warn(e)
        }
      }

      return curr
    }, {
      nullifiers: [],
      commitments: [],
      decryptedData: []
    }) as []
}
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
    async loadState () {
      this.isLoading = true

      const { data } = await axios.get(`${RPC}?salt=268`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })

      const state = await computeLocalTestnet(data, this.node) as any

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
      const node: any = await getHDWalletFromMnemonic(mnemonic)

      this.node = node

      this.persistAuth(node)
    },

    async reconnect () {
      if (!this.cache) {
        return
      }

      return await this.found(this.cache.phrase)
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
