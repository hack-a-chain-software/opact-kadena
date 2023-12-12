import { ref } from 'vue'
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

const metadata = {
  name: 'Ecko Wallet',
  key: 'provider:kda:adapter:xwallet',
  icon: '/ecko.png',
  disabled: false
}

export const useProvider = () => {
  const id = 'provider:ecko-wallet'

  const callback = ref<any>()

  const account = ref<any>('')

  const init = () => {
    //
  }

  const mintToken = async (id = 0) => {
    const { networkId, chainId } = getConfig()

    const accountName = 'k:' + account.value.account.publicKey
    const publickey = account.value.account.publicKey

    const cmd = await kadena.request({
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

    return await sendSigned(cmd)
  }

  const createToken = async (id = 0, manifest: any) => {
    const { networkId, chainId } = getConfig()

    const accountName = 'k:' + account.value.account.publicKey
    const publickey = account.value.account.publicKey

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

    return await sendSigned(cmd)
  }

  const connect = async (loginCallback = () => {}) => {
    const { networkId } = getConfig()

    const accountResult = await kadena.request({
      networkId,
      method: 'kda_connect'
    })

    account.value = accountResult
    callback.value = loginCallback
    loginCallback()
  }

  const faucet = async (tokenSpec: any) => {
    const { networkId, chainId } = getConfig()

    const accountName = 'k:' + account.value.account.publicKey
    const publickey = account.value.account.publicKey

    const preffix =
      tokenSpec.refName.name === 'coin'
        ? 'coin'
        : `test.${tokenSpec.refName.name}`

    let withFund = false

    try {
      const {
        result: { status }
      } = await getTokenDetails(accountName, preffix)

      if (status === 'failure') {
        withFund = true
      }
    } catch (e) {
      //
    }

    const pactCode = getFaucetCode(
      accountName,
      preffix,
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
  }

  const transaction = async (
    { proof, extData, tokenSpec }: any,
    callbackProgress: any,
    isWithdrawTransfer = false,
    receiver = ''
  ) => {
    const { networkId, chainId } = getConfig()

    const accountName = 'k:' + account.value.account.publicKey
    const publickey = account.value.account.publicKey

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

  const disconnect = async function () {
    await kadena.request({
      method: 'kda_disconnect',
      networkId: 'testnet04'
    })

    account.value = ''
  }

  return {
    id,
    account,
    metadata,

    init,
    faucet,
    connect,
    mintToken,
    disconnect,
    createToken,
    transaction
  }
}

export default {
  ...metadata,
  provider: useProvider()
}
