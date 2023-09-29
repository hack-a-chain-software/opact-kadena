import { ref } from 'vue'
import Pact from 'pact-lang-api'
import { MerkleTreeService } from 'opact-sdk'
import { computePactCode } from '~/utils/kadena'

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

  const faceut = async () => {
    try {
      const accountName = account.value.account.publicKey
      const publickey = account.value.account.publicKey

      const pactCode = `(coin.create-account ${JSON.stringify(accountName)} (read-keyset "${accountName}")) (coin.coinbase ${JSON.stringify(accountName)} (read-keyset "${accountName}") 100.0)`

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

      try {
        const res = await Pact.wallet.sendSigned(cmd.signedCmd, metadata.network)

        return res
      } catch (error) {
        console.log('error', error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const transaction = async (
    {
      args,
      proof,
      extData,
      tokenSpec
    }: any
  ) => {
    const accountName = account.value.account.publicKey
    const publickey = account.value.account.publicKey

    const pactCode = computePactCode({ args, proof, extData, tokenSpec })

    const cap1 = Pact.lang.mkCap(
      'Coin Transfer',
      'Capability to transfer designated amount of coin from sender to receiver',
      'coin.TRANSFER',
      [accountName, 'opact-contract', Number(extData.extAmount.toFixed(1))]
    )

    // const cap2 = Pact.lang.mkCap(
    //   'Coin Transfer for Gas',
    //   'Capability to transfer gas fee from sender to gas payer',
    //   'coin.TRANSFER',
    //   [accountName, 'opact-gas-payer', Number(extData.fee.toFixed(1))]
    // )

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
          caps: [
            cap1
            // cap2
          ],
          networkId: metadata.networkId,
          signingPubKey: publickey
        }
      }
    })

    return await Pact.wallet.sendSigned(cmd.signedCmd, metadata.network)
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
    faceut,
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
