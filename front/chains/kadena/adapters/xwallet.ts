import { ref } from 'vue'
import Pact from 'pact-lang-api'
import { getPactCodeForFaucet, computePactCode, getCapsForDeposit, getCapsForWithdraw } from '~/utils/kadena'

const RPC = process.env.NODE_ENV !== 'development'
  ? 'https://kb96ugwxhi.execute-api.us-east-2.amazonaws.com'
  : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:9001'

const metadata = {
  name: 'eckoWALLET',
  key: 'provider:kda:adapter:xwallet',
  icon: 'ecko',
  disabled: false,
  networkId: 'testnet04',
  network: RPC
}

export const useProvider = () => {
  const id = 'provider:ecko-wallet'

  const callback = ref<any>()

  const account = ref<any>('')

  const init = () => {
    //
  }

  const mintToken = async (id = 0) => {
    const accountName = account.value.account.publicKey
    const publickey = account.value.account.publicKey

    const cmd = await kadena.request({
      data: {
        networkId: metadata.networkId,
        signingCmd: {
          pactCode: `(free.poly-fungible-v2-reference.mint "${id}" "${accountName}" (read-keyset 'guard) 1.0)`,
          ttl: 0,
          chainId: 0,
          gasLimit: 0,
          gasPrice: 0,
          envData: {
            guard: {
              keys: [
                publickey
              ]
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
          sender: accountName,
          networkId: metadata.networkId,
          signingPubKey: publickey
        }
      },
      networkId: metadata.networkId,
      method: 'kda_requestSign'
    })

    const tx = await Pact.wallet.sendSigned(cmd.signedCmd, metadata.network)

    const {
      result
    } = await Pact.fetch.listen(
      { listen: tx.requestKeys[0] },
      RPC
    )

    console.log('result', result)

    if (result.status === 'failure') {
      throw new Error(result.error.message)
    }

    return result
  }

  const createAccount = async () => {
    const accountName = account.value.account.publicKey
    const publickey = account.value.account.publicKey

    const cmd = await kadena.request({
      data: {
        networkId: metadata.networkId,
        signingCmd: {
          pactCode: `(free.poly-fungible-v2-reference.create-token "${id}" 0 (read-msg 'manifest) free.token-policy-v1-reference)`,
          ttl: 0,
          chainId: 0,
          gasLimit: 0,
          gasPrice: 0,
          envData: {
            manifest
          },
          sender: accountName,
          networkId: metadata.networkId,
          signingPubKey: publickey
        }
      },
      networkId: metadata.networkId,
      method: 'kda_requestSign'
    })

    const tx = await Pact.wallet.sendSigned(cmd.signedCmd, metadata.network)

    const {
      result
    } = await Pact.fetch.listen(
      { listen: tx.requestKeys[0] },
      RPC
    )

    console.log('result', result)

    if (result.status === 'failure') {
      throw new Error(result.error.message)
    }

    return result
  }

  const createToken = async (id = 0, manifest: any) => {
    const accountName = account.value.account.publicKey
    const publickey = account.value.account.publicKey

    const cmd = await kadena.request({
      data: {
        networkId: metadata.networkId,
        signingCmd: {
          pactCode: `(free.poly-fungible-v2-reference.create-token "${id}" 0 (read-msg 'manifest) free.token-policy-v1-reference)`,
          ttl: 0,
          chainId: 0,
          gasLimit: 0,
          gasPrice: 0,
          envData: {
            manifest,
            guard: {
              keys: [
                publickey
              ]
            }
          },
          sender: accountName,
          networkId: metadata.networkId,
          signingPubKey: publickey
        }
      },
      networkId: metadata.networkId,
      method: 'kda_requestSign'
    })

    const tx = await Pact.wallet.sendSigned(cmd.signedCmd, metadata.network)

    const {
      result
    } = await Pact.fetch.listen(
      { listen: tx.requestKeys[0] },
      RPC
    )

    console.log('result', result)

    if (result.status === 'failure') {
      throw new Error(result.error.message)
    }

    return result
  }

  // TODO: delete this
  const coinDetails = async (prefix = 'coin') => {
    try {
      const accountName = account.value.account.publicKey

      const network = RPC

      const createdAt = Math.round(new Date().getTime() / 1000) - 10

      const data = await Pact.fetch.local({
        pactCode: `(${prefix}.details ${JSON.stringify(accountName)})`,
        meta: Pact.lang.mkMeta('', '0', 0, 0, createdAt, 0)
      }, network)

      return data
    } catch (e) {
      console.warn(e)
    }
  }

  const connect = async (loginCallback = () => {}) => {
    const accountResult = await kadena.request({
      method: 'kda_connect',
      networkId: 'testnet04'
    })

    account.value = accountResult
    callback.value = loginCallback
    loginCallback()
  }

  const faucet = async (tokenSpec) => {
    const accountName = account.value.account.publicKey
    const publickey = account.value.account.publicKey

    const preffix = tokenSpec.refName.name === 'coin' ? 'coin' : `test.${tokenSpec.refName.name}`

    let withFund = false

    try {
      const {
        result: {
          status
        }
      } = await coinDetails(preffix)

      if (status === 'failure') {
        withFund = true
      }
    } catch (e) {
      //
    }

    const pactCode = getPactCodeForFaucet(accountName, preffix, withFund)

    const cmd = await kadena.request({
      data: {
        networkId: metadata.networkId,
        signingCmd: {
          ttl: 0,
          chainId: 0,
          gasLimit: 0,
          gasPrice: 0,
          sender: accountName,
          pactCode,
          envData: {
            name: 'opact',
            language: 'Pact',
            [accountName]: {
              keys: [
                publickey
              ]
            }
          },
          networkId: metadata.networkId,
          signingPubKey: publickey
        }
      },
      networkId: metadata.networkId,
      method: 'kda_requestSign'
    })

    const tx = await Pact.wallet.sendSigned(cmd.signedCmd, metadata.network)

    const {
      result
    } = await Pact.fetch.listen(
      { listen: tx.requestKeys[0] },
      RPC
    )

    if (result.status === 'failure') {
      throw new Error(result.error.message)
    }

    return result
  }

  const transaction = async (
    {
      args,
      proof,
      extData,
      tokenSpec
    }: any,
    callbackProgress: any,
    isWithdrawTransfer = false,
    receiver = ''
  ) => {
    const accountName = account.value.account.publicKey
    const publickey = account.value.account.publicKey

    const pactCode = computePactCode({ args, proof, extData, tokenSpec })

    let preffix = tokenSpec.refName.name === 'coin' ? 'coin' : `test.${tokenSpec.refName.name}`

    if (tokenSpec.refName.name === 'poly-fungible-v2') {
      preffix = 'free.poly-fungible-v2-reference'
    }

    let caps

    if (isWithdrawTransfer) {
      caps = getCapsForWithdraw(accountName, extData.extAmount, preffix, receiver)
    } else {
      caps = getCapsForDeposit(accountName, extData.extAmount, preffix)
    }

    callbackProgress('Await sign...')

    const cmd = await kadena.request({
      method: 'kda_requestSign',
      data: {
        networkId: metadata.networkId,
        signingCmd: {
          ttl: 0,
          chainId: 0,
          gasLimit: 0,
          gasPrice: 0,
          sender: accountName,
          pactCode,
          envData: {
            language: 'Pact',
            name: 'transact-deposit',
            'token-instance': {
              refSpec: [{
                name: tokenSpec.refSpec.name
              }],
              refName: {
                name: tokenSpec.refName.name,
                namespace: tokenSpec.refName.namespace || undefined
              }
            }
          },
          caps,
          networkId: metadata.networkId,
          signingPubKey: publickey
        }
      }
    })

    callbackProgress('Awaiting TX results...')

    const tx = await Pact.wallet.sendSigned(cmd.signedCmd, metadata.network)

    const {
      result
    } = await Pact.fetch.listen(
      { listen: tx.requestKeys[0] },
      RPC
    )

    if (result.status === 'failure') {
      throw new Error(result.error.message)
    }

    return result
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
    transaction,
    coinDetails,
    createAccount
  }
}

export default {
  ...metadata,
  provider: useProvider()
}
