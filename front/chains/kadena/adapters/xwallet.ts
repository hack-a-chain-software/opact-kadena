import { ref } from 'vue'
import Pact from 'pact-lang-api'
import { getPactCodeForFaucet, computePactCode } from '~/utils/kadena'

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

  // TODO: delete this
  const coinDetails = async () => {
    try {
      const accountName = account.value.account.publicKey

      const network = RPC

      const createdAt = Math.round(new Date().getTime() / 1000) - 10

      const data = await Pact.fetch.local({
        pactCode: `(coin.details ${JSON.stringify(accountName)})`,
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

  const faucet = async () => {
    const accountName = account.value.account.publicKey
    const publickey = account.value.account.publicKey

    const pactCode = getPactCodeForFaucet(accountName)

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
  ) => {
    const accountName = account.value.account.publicKey
    const publickey = account.value.account.publicKey

    const pactCode = computePactCode({ args, proof, extData, tokenSpec })

    const caps = getCapsForDeposit(accountName, extData.extAmount)

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
                name: tokenSpec.refName.name
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
    disconnect,
    transaction,
    coinDetails,
  }
}

export default {
  ...metadata,
  provider: useProvider()
}
