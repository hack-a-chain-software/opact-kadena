import { ref } from 'vue'
import Pact from 'pact-lang-api'

const RPC = process.env.NODE_ENV !== 'development' ? 'https://kb96ugwxhi.execute-api.us-east-2.amazonaws.com' : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:9001'

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

  const connect = async (loginCallback = () => {}) => {
    const accountResult = await kadena.request({
      method: 'kda_connect',
      networkId: 'testnet04'
    })

    account.value = accountResult
    callback.value = loginCallback
    loginCallback()
  }

  const signMessage = async ({ message }: any) => {
    const networkId: any = 'testnet04'

    const req = {
      method: 'kda_requestSign',
      networkId,
      data: {
        networkId,
        signingCmd: {
          ttl: 600,
          pactCode: '(foo)',
          sender: 'foooo',
          networkId,
          chainId: '1',
          envData: {},
          gasLimit: 15000,
          gasPrice: 1e-5,
          caps: []
        }
      }
    }

    return await kadena.request(req)
  }

  const coinDetails = async ({ pubkey }: any) => {
    try {
      const accountName = pubkey.toString()

      const network = RPC

      const t_creationTime = Math.round(new Date().getTime() / 1000) - 10
      const data = await Pact.fetch.local({
        pactCode: `(coin.details ${JSON.stringify(accountName)})`,
        meta: Pact.lang.mkMeta('', '0', 0, 0, t_creationTime, 0)
      }, network)

      return data
    } catch (e) {
      console.warn(e)
    }
  }

  const faceut = async (wallet: any) => {
    try {
      const accountName = wallet.pubkey.toString()
      const publickey = account.value.account.publicKey

      console.log('')

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

  const computeSubAttr = (sub: any): any => {
    if (typeof sub === 'string') {
      return `${sub}`
    }

    if (!Array.isArray(sub) && typeof sub === 'object') {
      return `{${computeSubAttr(sub)}}`
    }

    const arrayOfPrimitive = sub.every((item: any) => typeof item === 'string')

    if (Array.isArray(sub) && arrayOfPrimitive) {
      return `[${sub.join(' ')}]`
    }

    if (Array.isArray(sub) && !arrayOfPrimitive) {
      return `[${computeProofCode(sub)}]`
    }
  }

  const computeProofCode = (proof: any) => {
    const entries = Object.entries(proof)

    return entries.reduce((acc: string, curr: any, i: number) => {
      const value = computeSubAttr(proof[curr])

      acc += `"${curr}":${value}${i === entries.length - 1 ? '' : ','}`

      return acc
    }, '')
  }

  const computePactCode = ({
    args,
    proof,
    extData,
    tokenSpec
  }: any) => {
    return `(test.opact.transact {
      "root": ${args.root},
      "outputCommitments": [${args.outputCommitments.join(' ')}],
      "publicAmount": ${args.publicAmount.toString()}.0,
      "extDataHash": "${args.extDataHash}",
      "tokenHash": "${args.tokenHash}"
    } {
      "public_values":[${proof.public_values.join(' ')}],
      "a":{"x": ${proof.a.x}, "y": ${proof.a.y} },
      "b":{"x":[${proof.b.x.join(' ')}],"y":[${proof.b.y.join(' ')}]},
      "c":{"x":${proof.c.x},"y":${proof.c.y}}
    } {
      "sender":"${extData.sender}",
      "recipient":"${extData.recipient}",
      "extAmount":${extData.extAmount.toFixed(1)},
      "relayer":${extData.relayer},
      "fee":${extData.fee.toFixed(1)},
      "encryptedOutput1":"${extData.encryptedOutput1}",
      "encryptedOutput2":"${extData.encryptedOutput2}",
      "encryptedValue":"${extData.encryptedValue}"
    } {
      "id": "${tokenSpec.id}",
      "refName":{
        "name":"${tokenSpec.refName.name}",
        "namespace":""
      },
      "refSpec":{
        "name":"${tokenSpec.refSpec.name}",
        "namespace":""
      }
    })`
  }

  const transaction = async ({
    args,
    proof,
    extData,
    tokenSpec,
    node
  }: any) => {
    try {
      const accountName = node.pubkey.toString()
      const publickey = account.value.account.publicKey

      const pactCode = computePactCode({ args, proof, extData, tokenSpec })

      const cap1 = Pact.lang.mkCap(
        'Coin Transfer',
        'Capability to transfer designated amount of coin from sender to receiver',
        'coin.TRANSFER',
        [accountName, 'opact-contract', Number(extData.extAmount.toFixed(1))]
      )

      const cap2 = Pact.lang.mkCap(
        'Coin Transfer for Gas',
        'Capability to transfer gas fee from sender to gas payer',
        'coin.TRANSFER',
        [accountName, 'opact-gas-payer', Number(extData.fee.toFixed(1))]
      )

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
              cap1,
              cap2
            ],
            networkId: metadata.networkId,
            signingPubKey: publickey
          }
        }
      })

      try {
        return await Pact.wallet.sendSigned(cmd.signedCmd, metadata.network)
      } catch (error) {
        console.log('error', error)
      }
    } catch (error) {
      console.log(error)
    }
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
    signMessage,
    transaction,
    coinDetails
  }
}

export default {
  ...metadata,
  provider: useProvider()
}
