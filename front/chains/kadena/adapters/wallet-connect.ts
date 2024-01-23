import { defineStore } from 'pinia'
import { getSdkError } from '@walletconnect/utils'
import { SessionTypes } from '@walletconnect/types'
import {
  getConfig,
  sendSigned,
  sendFaucetTransaction
} from 'opact-sdk'
import {
  createWalletConnectQuicksign
} from '@kadena/client'
import {
  getWalletConnectClient,
  getWalletConnectModal
} from '../util'

const metadata = {
  id: 'provider:kadena:wallet-connect',
  name: 'Wallet Connect',
  icon: '/images/wallets/wallet-connect.png',
  disabled: false
}

export const provider = defineStore({
  id: 'provider:kadena:wallet-connect',

  state: (): any => ({
    icon: '/images/wallets/wallet-connect.png',

    pairings: [],

    account: null,
    client: undefined,
    session: undefined,
    accounts: undefined,
    walletConnectModal: undefined,

    isInitializing: false
  }),

  getters: {
    isConnected ({ account }) {
      return !!account
    }
  },

  actions: {
    reset () {
      this.account = null
      this.session = undefined
      this.accounts = undefined
    },

    onSessionConnected (_session: SessionTypes.Struct) {
      this.session = _session
      this.accounts =
        _session?.namespaces?.kadena?.accounts

      if (this.accounts.length === 0) {
        return
      }

      const { networkId } = getConfig()

      const [chain, network, pubkey] =
        _session?.namespaces?.kadena?.accounts
          .find((account: string) =>
            account.includes(networkId)
          )
          ?.split(':') || ''

      this.account = {
        chain,
        pubkey,
        network,
        walletConnectChainId: `kadena:${networkId}`,
        address: `k:${pubkey}`
      }
    },

    subscribeToEvents () {
      if (!this.client) {
        throw new TypeError(
          'WalletConnect is not initialized'
        )
      }

      this.client.on('session_ping', (args: any) => {
        console.log('EVENT', 'session_ping', args)
      })

      this.client.on('session_event', (args: any) => {
        console.log('EVENT', 'session_event', args)
      })

      this.client.on(
        'session_update',
        ({ topic, params }: any) => {
          console.log('EVENT', 'session_update', {
            topic,
            params
          })

          const { namespaces } = params

          const _session = this.client.session.get(topic)

          const updatedSession = {
            ..._session,
            namespaces
          }

          this.onSessionConnected(updatedSession)
        }
      )

      this.client.on('session_delete', () => {
        console.log('EVENT', 'session_delete')
        this.reset()
      })
    },

    async init () {
      if (this.client) {
        return
      }

      this.isInitializing = true

      try {
        const _client = await getWalletConnectClient()

        this.client = _client
        await this.subscribeToEvents()
      } catch (err) {
        console.warn(err)
      } finally {
        this.isInitializing = false
      }
    },

    async connect (callback = () => { }) {
      if (typeof this.client === 'undefined') {
        throw new TypeError(
          'WalletConnect is not initialized'
        )
      }

      const walletConnectModal = getWalletConnectModal()

      try {
        const { uri, approval } = await this.client.connect(
          {
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
          }
        )

        if (uri) {
          walletConnectModal.openModal({ uri })
        }

        const session = await approval()

        await this.onSessionConnected(session)
        // Update known pairings after session is connected.
        this.pairings = this.client.pairing.getAll({
          active: true
        })

        walletConnectModal.closeModal()

        callback()
      } catch (e) {
        console.error(e)

        walletConnectModal.closeModal()
      }
    },

    async disconnect () {
      if (typeof this.client === 'undefined') {
        throw new TypeError(
          'WalletConnect is not initialized'
        )
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
        console.error(
          'SignClient.disconnect failed:',
          error
        )
      } finally {
        // Reset app state after disconnect.
        this.reset()
      }
    },

    async sendFaucet () {
      return await sendFaucetTransaction(this.account.address)
    },

    async send (
      transaction: any,
      callbackProgress: any
    ) {
      if (!this.client) {
        throw new Error('No client')
      }

      if (!this.session) {
        throw new Error('No session')
      }

      if (!this.account) {
        throw new Error('No selected account to send from')
      }

      callbackProgress('Await sign')

      const signWithWalletConnect =
        createWalletConnectQuicksign(
          this.client as any,
          this.session,
          this.account.walletConnectChainId
        )

      const signedCmd = await signWithWalletConnect(
        transaction
      )

      callbackProgress('Awaiting the transaction outcome.')

      const res = await sendSigned(signedCmd)

      return res
    }
  }
})

export default {
  ...metadata,

  provider
}
