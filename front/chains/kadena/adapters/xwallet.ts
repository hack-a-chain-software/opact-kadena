import Pact from 'pact-lang-api'
import {
  getCapsForDeposit,
  getCapsForWithdraw,
  getConfig,
  getTransactionCode,
  getTokenDetails,
  getFaucetCode,
  sendSigned
} from 'opact-sdk'
import { defineStore } from 'pinia'

const metadata = {
  name: 'Ecko Wallet',
  id: 'provider:kadena:x-wallet',
  icon: '/ecko.png',
  disabled: false
}

export const provider = defineStore({
  id: 'provider:kadena:x-wallet',

  state: (): any => ({
    account: null,
    callback: undefined,
    icon: '/ecko.png'
  }),

  getters: {
    isConnected ({ account }) {
      return !!account
    }
  },

  actions: {
    init () {
      //
    },

    reset () {
      this.account = null
    },

    async disconnect () {
      const { networkId } = getConfig()

      await kadena.request({
        networkId,
        method: 'kda_disconnect'
      })

      this.account = null
    },

    async connect (callback = () => {}) {
      const { networkId } = getConfig()

      const {
        account
      } = await kadena.request({
        networkId,
        method: 'kda_connect'
      })

      this.account = {
        network: networkId,
        address: account.account,
        pubkey: account.publicKey,
        walletConnectChainId: `kadena:${networkId}`
      }

      console.log('this.account', this.account)

      this.callback = callback

      callback()
    },

    async sendTokenFaucetTransaction (token: any) {
      const { networkId, chainId } = getConfig()

      const publickey = this.account.pubkey
      const accountName = this.account.address

      let withFund = false

      try {
        const {
          result: { status }
        } = await getTokenDetails(accountName, token)

        if (status === 'failure') {
          withFund = true
        }
      } catch (e) {
      //
      }

      const pactCode = getFaucetCode(
        accountName,
        token,
        withFund
      )

      const cmd = await kadena.request({
        data: {
          networkId,
          signingCmd: {
            ttl: 0,
            chainId,
            gasLimit: 0,
            gasPrice: 0,
            sender: accountName,
            pactCode,
            envData: {
              name: 'opact',
              language: 'Pact',
              [accountName]: {
                keys: [publickey]
              }
            },
            networkId,
            signingPubKey: publickey
          }
        },
        networkId,
        method: 'kda_requestSign'
      })

      return await sendSigned(cmd)
    },

    async sendNFTFaucetTransaciton (id: any, manifest: any) {
      const { networkId, chainId } = getConfig()

      const accountName = this.account.address
      const publickey = this.account.pubkey

      const cmd = await kadena.request({
        data: {
          networkId,
          signingCmd: {
            pactCode: `(free.poly-fungible-v2-reference.create-token "${id}" 0 (read-msg 'manifest) free.token-policy-v1-reference)`,
            ttl: 0,
            chainId,
            gasLimit: 0,
            gasPrice: 0,
            envData: {
              manifest,
              guard: {
                keys: [publickey]
              }
            },
            sender: accountName,
            networkId,
            signingPubKey: publickey
          }
        },
        networkId,
        method: 'kda_requestSign'
      })

      await sendSigned(cmd)

      const mintTokenCmd = await kadena.request({
        data: {
          networkId,
          signingCmd: {
            pactCode: `(free.poly-fungible-v2-reference.mint "${id}" "${accountName}" (read-keyset 'guard) 1.0)`,
            ttl: 0,
            chainId,
            gasLimit: 0,
            gasPrice: 0,
            envData: {
              guard: {
                keys: [publickey]
              }
            },
            caps: [
              Pact.lang.mkCap(
                'Mint Token',
                'Capability to mint token',
                'free.poly-fungible-v2-reference.MINT',
                [id + '', accountName + '', 1.0]
              )
            ],
            networkId,
            sender: accountName,
            signingPubKey: publickey
          }
        },
        networkId,
        method: 'kda_requestSign'
      })

      await sendSigned(mintTokenCmd)
    },

    async sendOpactTransaction (
      { proof, extData, tokenSpec }: any,
      callbackProgress: any,
      isWithdrawTransfer = false,
      receiver = ''
    ) {
      const { networkId, chainId } = getConfig()

      const publickey = this.account.pubkey
      const accountName = this.account.address

      let caps

      if (isWithdrawTransfer) {
        caps = getCapsForWithdraw(
          accountName,
          extData.tokenAmount,
          receiver,
          tokenSpec
        )
      } else {
        caps = getCapsForDeposit(
          accountName,
          extData.tokenAmount,
          tokenSpec
        )
      }

      const pactCode = getTransactionCode({ proof, extData })

      callbackProgress('Await sign...')

      const cmd = await kadena.request({
        method: 'kda_requestSign',
        data: {
          networkId,
          signingCmd: {
            ttl: 0,
            chainId,
            gasLimit: 0,
            gasPrice: 0,
            sender: accountName,
            pactCode,
            envData: {
              language: 'Pact',
              name: 'transact-deposit',
              'recipient-guard': {
                keys: [receiver || publickey]
              },
              'token-instance': {
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
              }
            },
            caps,
            networkId,
            signingPubKey: publickey
          }
        }
      })

      callbackProgress('Awaiting TX results...')

      return await sendSigned(cmd)
    }
  }
})

export default {
  ...metadata,
  provider
}
