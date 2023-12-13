import { defineStore } from 'pinia'
import Client from '@walletconnect/sign-client'
import { getSdkError } from '@walletconnect/utils'
import { PactNumber } from '@kadena/pactjs'
// import { toHex } from 'ethereum-cryptography/utils'
// import { getRandomBytesSync } from 'ethereum-cryptography/random'
import { PairingTypes, SessionTypes } from '@walletconnect/types'
import { getConfig, getTokenDetails, getFaucetCode, sendSigned, getCapsForWithdraw, getCapsForDeposit } from 'opact-sdk'
import {
  Pact,
  createWalletConnectQuicksign
} from '@kadena/client'
import { getWalletConnectClient, walletConnectModal } from '../util'

const metadata = {
  id: 'provider:kadena:wallet-connect',
  name: 'Wallet Connect',
  icon: '/svg/wallet-connect.svg',
  disabled: false
}

export const provider = defineStore({
  id: 'provider:kadena:wallet-connect',

  state: (): {
    isInitializing: boolean,
    walletConnectModal: any,
    client: Client | undefined,
    account: any,
    initialized: boolean,
    accounts: string[] | undefined,
    pairings: PairingTypes.Struct[],
    session: SessionTypes.Struct | undefined,
  } => ({
    pairings: [],

    account: null,
    client: undefined,
    session: undefined,
    accounts: undefined,
    initialized: false,
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
      this.accounts = _session?.namespaces?.kadena?.accounts

      if (this.accounts.length === 0) {
        return
      }

      const { networkId } = getConfig()

      const [
        chain,
        network,
        pubkey
      ] = _session?.namespaces?.kadena?.accounts
        .find((account: string) => account.includes(networkId))?.split(':') || ''

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

    async init () {
      this.isInitializing = true

      try {
        const _client = await getWalletConnectClient()

        this.client = _client
        await this.subscribeToEvents()
        // await this.checkPersistedState()
      } catch (err) {
        console.warn(err)
      } finally {
        this.isInitializing = false
      }
    },

    async connect (callback = () => {}) {
      if (typeof this.client === 'undefined') {
        throw new TypeError('WalletConnect is not initialized')
      }

      // const walletConnectModal = getWalletConnectModal()

      try {
        const { uri, approval } = await this.client.connect({
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

        if (uri) {
          walletConnectModal.openModal({ uri })
        }

        const session = await approval()

        await this.onSessionConnected(session)
        // Update known pairings after session is connected.
        this.pairings = this.client.pairing.getAll({ active: true })

        walletConnectModal.closeModal()

        callback()
      } catch (e) {
        console.error(e)

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

    // async checkPersistedState () {
    // if (typeof this.client === 'undefined') {
    //   throw new TypeError('WalletConnect is not initialized')
    // }

    // this.pairings = this.client.pairing.getAll({ active: true })

    // if (typeof this.session !== 'undefined') {
    //   return
    // }

    // console.log('this.pairings', this.pairings)

    // // populates (the last) existing session to state
    // if (this.client.session.length) {
    //   console.log('this.client.session.keys', this.client.session.keys)
    //   const _session = this.client.session.get(this.client.session.keys.at(-1) as string)

    //   await this.onSessionConnected(_session)

    //   return _session
    // }
    // },

    async sendTokenFaucetTransaction (selectedToken: any) {
      if (!this.client) {
        throw new Error('No client')
      }

      if (!this.session) {
        throw new Error('No session')
      }

      if (!this.account) {
        throw new Error('No selected account to send from')
      }

      const { networkId, chainId } = getConfig()

      const signWithWalletConnect = createWalletConnectQuicksign(
        this.client as any,
        this.session,
        this.account.walletConnectChainId
      )

      const token = selectedToken

      let withFund = false

      try {
        const {
          result: { status }
        } = await getTokenDetails(this.account.address, token)

        if (status === 'failure') {
          withFund = true
        }
      } catch (e) {
        //
      }

      const pactCode = getFaucetCode(
        this.account.address,
        selectedToken,
        withFund
      )

      const pactCommand = Pact.builder
        .execution(pactCode)
        .setMeta({
          chainId,
          senderAccount: this.account.address
        })
        .addKeyset(this.account.address, 'keys-all', this.account.pubkey)
        .addSigner(this.account.pubkey)
        .setNetworkId(networkId)

      const transaction = pactCommand.createTransaction()

      console.log('transaction', transaction)

      const signedCmd = await signWithWalletConnect(transaction)

      return await sendSigned({ signedCmd })
    },

    // async sendNFTFaucetTransaciton () {
    //   if (!this.client) {
    //     throw new Error('No client')
    //   }

    //   if (!this.session) {
    //     throw new Error('No session')
    //   }

    //   if (!this.account) {
    //     throw new Error('No selected account to send from')
    //   }

    //   const id = BigInt(`0x${toHex(getRandomBytesSync(32))}`)

    //   const datum = await createDatum()

    //   const manifest = await createManifest([datum])

    //   const { networkId, chainId } = getConfig()

    //   const signWithWalletConnect = createWalletConnectQuicksign(
    //     this.client as any,
    //     this.session,
    //     this.account.walletConnectChainId
    //   )

    //   const pactCode = `(free.poly-fungible-v2-reference.create-token "${id}" 0 (read-msg 'manifest) free.token-policy-v1-reference)`

    //   const pactCommand = Pact.builder
    //     .execution(pactCode)
    //     .setMeta({
    //       chainId,
    //       senderAccount: this.account.address
    //     })
    //     .addData('manifest', manifest)
    //     .addData('guard', {
    //       keys: [this.account.pubkey]
    //     })
    //     .setNetworkId(networkId)

    //   const transaction = pactCommand.createTransaction()

    //   const signedCmd = await signWithWalletConnect(transaction)

    //   await sendSigned({ signedCmd })

    //   const mintTokenCode = `(free.poly-fungible-v2-reference.mint "${id}" "${this.account.address}" (read-keyset 'guard) 1.0)`

    //   const mintPactCommand = Pact.builder
    //     .execution(mintTokenCode)
    //     .setMeta({
    //       chainId,
    //       senderAccount: this.account.address
    //     })
    //     .addSigner(this.account.pubkey, (withCapability: any) => [
    //       withCapability(
    //         'free.poly-fungible-v2-reference.MINT',
    //         id + '',
    //         this.account.address,
    //         1.0
    //       )
    //     ])
    //     .addData('manifest', manifest)
    //     .addData('guard', {
    //       keys: [this.account.pubkey]
    //     })
    //     .setNetworkId(networkId)

    //   const mintTransaction = mintPactCommand.createTransaction()

    //   const mintSignedCmd = await signWithWalletConnect(mintTransaction)

    //   return await sendSigned({ signedCmd: mintSignedCmd })
    // },

    async sendOpactTransaction (
      { proof, extData, tokenSpec }: any,
      callbackProgress: any,
      isWithdrawTransfer = false,
      receiver = ''
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

      const { networkId, chainId } = getConfig()

      const signWithWalletConnect = createWalletConnectQuicksign(
        this.client as any,
        this.session,
        this.account.walletConnectChainId
      )

      let caps: any

      if (isWithdrawTransfer) {
        caps = getCapsForWithdraw(
          this.account.address,
          extData.tokenAmount,
          receiver,
          tokenSpec
        )
      } else {
        caps = getCapsForDeposit(
          this.account.address,
          extData.tokenAmount,
          tokenSpec
        )
      }

      const pactCode = "(test.opact2.transact (read-msg 'proof) (read-msg 'extData))"

      callbackProgress('Await sign...')

      const pactCommand = Pact.builder
        .execution(pactCode)
        .setMeta({
          chainId,
          senderAccount: this.account.address
        })
        .addSigner(this.account.pubkey, () => [
          ...caps.map(({ cap }: any) => cap)
        ])
        .addData('language', 'Pact')
        .addData('name', 'transact-deposit')
        .addData('recipient-guard', {
          keys: [receiver || this.account.pubkey]
        })
        .addData('extData', {
          ...extData,
          tokenId: extData.tokenId + '',
          encryptedReceipts: [''],
          tokenAmount: new PactNumber(extData.tokenAmount).toPactInteger(),
          outputCommitments: extData.outputCommitments.map((item: any) => new PactNumber(item).toPactInteger())
        })
        .addData('proof', {
          public_values: proof.public_values.map((item: any) => new PactNumber(item).toPactInteger()),
          a: {
            x: new PactNumber(proof.a.x).toPactInteger(),
            y: new PactNumber(proof.a.y).toPactInteger()
          },
          b: {
            x: proof.b.x.map((item: any) => new PactNumber(item).toPactInteger()),
            y: proof.b.y.map((item: any) => new PactNumber(item).toPactInteger())
          },
          c: {
            x: new PactNumber(proof.c.x).toPactInteger(),
            y: new PactNumber(proof.c.y).toPactInteger()
          }
        })
        .addData('token-instance', {
          refSpec: [
            {
              name: tokenSpec.refSpec.name,
              namespace:
                tokenSpec.refSpec.namespace ||
                undefined
            }
          ],
          refName: {
            name: tokenSpec.refName.name,
            namespace:
              tokenSpec.refName.namespace || undefined
          }
        })
        .setNetworkId(networkId)

      const transaction = pactCommand.createTransaction()

      const signedCmd = await signWithWalletConnect(transaction)

      callbackProgress('Awaiting TX results...')

      console.log('signedCmd', signedCmd)

      const res = await sendSigned({ signedCmd })

      console.log('signedCmd', res)

      return res
    }
  }
})

export default {
  ...metadata,

  provider
}
