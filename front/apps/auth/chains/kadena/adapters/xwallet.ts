import { ref } from 'vue'
import Pact from "pact-lang-api";

const metadata = {
  name: 'eckoWALLET',
  key: 'provider:kda:adapter:xwallet',
  icon: 'ecko',
  disabled: false,
  networkId: 'testnet04',
  network: 'http://ec2-34-235-122-42.compute-1.amazonaws.com:9001'
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
    const networkId: any = null

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

  const coinDetails = async () => {
    try {
      const accountName = account.value.account.account;
      const network = 'http://ec2-3-84-139-198.compute-1.amazonaws.com:9001'

      let t_creationTime = Math.round(new Date().getTime() / 1000) - 10;
      let data = await Pact.fetch.local({
        pactCode: `(coin.details ${JSON.stringify(accountName)})`,
        meta: Pact.lang.mkMeta("", "0", 0, 0, t_creationTime, 0)
      }, network);

      return data

    } catch (e) {
      console.warn(e)
    }
  }

  const faceut = async () => {
    try {
      const publickey = account.value.account.publickey
      const accountName = account.value.account.account

      const pactCode = `(coin.create-account ${JSON.stringify(accountName)} (read-keyset "user1")) (coin.coinbase ${JSON.stringify(accountName)} (read-keyset "user1") 100.0)`

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
                name: "opact",
                language: "Pact",
                user1: {
                  keys: [
                    '5e7b81bf389c446fd206c6c6dbb93b1fad344ddb3e84152c8a896b35ca7b9742',
                  ]
                }
              },
              networkId: metadata.networkId,
              signingPubKey: publickey,
            }
          },
          networkId: metadata.networkId,
          method: "kda_requestSign",
      });

      console.log('cmd', JSON.parse(cmd.signedCmd.cmd))

      try{
        const res = await Pact.wallet.sendSigned(cmd.signedCmd, metadata.network);

        return res
      } catch(error){
        console.log('error', error);
      }
    } catch (error) {
        console.log(error);
    }
  }

  const computeSubAttr = (sub: any): any => {
    if (typeof sub === 'string') {
      return `${sub}`;
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
    const entries = Object.entries(proof);

    return entries.reduce((acc: string, curr: any, i: number) => {
      const value = computeSubAttr(proof[curr])

      acc+=`"${curr}":${value}${i === entries.length - 1 ? '' : ','}`

      return acc
    }, ``)
  }

  const computePactCode = ({
    args,
    proof,
    extData,
    tokenSpec,
  }: any) => {
    return `(test.opact.transact {
      "root": ${args.root},
      "outputCommitments": [${args.outputCommitments.join(' ')}],
      "publicAmount": ${args.publicAmount.toFixed(1)},
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
      "extAmount":${extData.extAmount}.0,
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
    })`;
  }

  const transaction = async ({
    args,
    proof,
    extData,
    tokenSpec,
  }: any) => {
    try {
      const publickey = account.value.account.publickey;
      const accountName = account.value.account.account;

      const pactCode = computePactCode({ args, proof, extData, tokenSpec })

      // console.log('pactCode', pactCode)

      const cmd = await kadena.request({
        method: "kda_requestSign",
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
              language: "Pact",
              name: "transact-deposit",
              'token-instance': {
                refSpec: [{
                  name: tokenSpec.refSpec.name
                }],
                refName: {
                  name: tokenSpec.refName.name
                }
              }
            },
            networkId: metadata.networkId,
            signingPubKey: publickey,
          }
        }
      });

      try{
        return await Pact.wallet.sendSigned(cmd.signedCmd, metadata.network);
      } catch(error){
        console.log('error', error);
      }
    } catch (error) {
        console.log(error);
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
    coinDetails,
  }
}

export default {
  ...metadata,
  provider: useProvider()
}
