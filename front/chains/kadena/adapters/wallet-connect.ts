import { defineStore } from 'pinia'
import Client from '@walletconnect/sign-client'
import { getSdkError } from '@walletconnect/utils'
import { PairingTypes, SessionTypes } from '@walletconnect/types'
import { getWalletConnectClient, getWalletConnectModal } from '../util'

const metadata = {
  id: 'provider:eko:wallet-connect',
  name: 'Wallet Connector',
  icon: 'walletConnect',
  disabled: false
}

export const provider = defineStore({
  id: 'provider:kadena:wallet-connect',

  state: (): {
    isInitializing: boolean,
    walletConnectModal: any,
    client: Client | undefined,
    accounts: string[] | undefined,
    pairings: PairingTypes.Struct[],
    session: SessionTypes.Struct | undefined,
  } => ({
    pairings: [],

    client: undefined,
    session: undefined,
    accounts: undefined,
    walletConnectModal: undefined,

    isInitializing: false
  }),

  actions: {
    async init () {
      this.isInitializing = true

      try {
        const _client = await getWalletConnectClient()

        console.log('CREATED CLIENT: ', _client)
        this.client = _client
        await this.subscribeToEvents()
        await this.checkPersistedState()
      } catch (err) {
        console.warn(err)
      } finally {
        this.isInitializing = false
      }
    },

    reset () {
      this.session = undefined
    },

    async connect (pairing: any) {
      if (typeof this.client === 'undefined') {
        throw new TypeError('WalletConnect is not initialized')
      }

      const walletConnectModal = getWalletConnectModal()

      try {
        const { uri, approval } = await this.client.connect({
          pairingTopic: pairing?.topic,

          requiredNamespaces: {
            kadena: {
              methods: [
                'kadena_getAccounts_v1',
                'kadena_sign_v1',
                'kadena_quicksign_v1'
              ],
              chains: [
                'kadena:mainnet01',
                'kadena:testnet04',
                'kadena:development'
              ],
              events: []
            }
          }
        })

        // Open QRCode modal if a URI was returned (i.e. we're not connecting an existing pairing).
        if (uri) {
          walletConnectModal.openModal({ uri })
        }

        const session = await approval()
        console.log('Established session:', session)
        await this.onSessionConnected(session)
        // Update known pairings after session is connected.
        this.pairings = this.client.pairing.getAll({ active: true })
      } catch (e) {
        console.error(e)
        // ignore rejection
      } finally {
        // close modal in case it was open
        walletConnectModal.closeModal()
      }
    },

    async disconnect () {
      if (typeof this.client === 'undefined') {
        throw new TypeError('WalletConnect is not initialized')
      }
      if (typeof this.session === 'undefined') {
        throw new TypeError('Session is not connected')
      }

      try {
        await this.client.disconnect({
          topic: this.session.topic,
          reason: getSdkError('USER_DISCONNECTED')
        })
      } catch (error) {
        console.error('SignClient.disconnect failed:', error)
      } finally {
        // Reset app state after disconnect.
        this.reset()
      }
    },

    onSessionConnected (_session: SessionTypes.Struct) {
      this.session = _session
      this.accounts = _session?.namespaces?.kadena?.accounts
    },

    subscribeToEvents () {
      if (typeof this.client === 'undefined') {
        throw new TypeError('WalletConnect is not initialized')
      }

      this.client.on('session_ping', (args: any) => {
        console.log('EVENT', 'session_ping', args)
      })

      this.client.on('session_event', (args: any) => {
        console.log('EVENT', 'session_event', args)
      })

      this.client.on('session_update', ({ topic, params }: any) => {
        console.log('EVENT', 'session_update', { topic, params })
        const { namespaces } = params
        const _session = this.client.session.get(topic)
        const updatedSession = { ..._session, namespaces }
        this.onSessionConnected(updatedSession)
      })

      this.client.on('session_delete', () => {
        console.log('EVENT', 'session_delete')
        this.reset()
      })
    },

    async checkPersistedState () {
      if (typeof this.client === 'undefined') {
        throw new TypeError('WalletConnect is not initialized')
      }

      this.pairings = this.client.pairing.getAll({ active: true })

      console.log(
        'RESTORED PAIRINGS: ',
        this.client.pairing.getAll({ active: true })
      )

      if (typeof this.session !== 'undefined') {
        return
      }

      // populates (the last) existing session to state
      if (this.client.session.length) {
        const lastKeyIndex = this.client.session.keys.length - 1

        const _session = this.client.session.get(
          this.client.session.keys[lastKeyIndex]
        )

        await this.onSessionConnected(_session)

        return _session
      }
    }
  }

})

// export const useProvider = () => {
//   const id = 'provider:wallet-connect'

//   const callback = ref<any>()

//   const account = ref<any>('')

//   const web3modal = ref<Web3Modal>()

//   const init = () => {
//     if (!web3modal.value) {
//       const modal = getWeb3Modal()

//       modal.subscribeEvents((event) => {
//         if (event.name === 'ACCOUNT_CONNECTED') {
//           account.value = getAccount()

//           callback.value()
//         }

//         if (event.name === 'ACCOUNT_DISCONNECTED') {
//           account.value = undefined
//         }
//       })

//       web3modal.value = modal
//     }

//     return web3modal.value
//   }

//   const connect = async (loginCallback = () => {}) => {
//     const modal = await init()

//     await modal.openModal()

//     callback.value = loginCallback
//   }

//   const sendTransaction = () => {}

//   return {
//     id,
//     account,
//     metadata,
//     connect,
//     signMessage,
//     sendTransaction,
//     disconnect
//   }
// }

export default {
  ...metadata,

  provider
}
