import Pact from 'pact-lang-api'

export const kadenaRPC = process.env.NODE_ENV !== 'development'
  ? 'https://kb96ugwxhi.execute-api.us-east-2.amazonaws.com'
  : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:9001'

export const getPactCodeForFaucet = (accountName: string) => {
  return `(coin.create-account ${JSON.stringify(accountName)} (read-keyset "${accountName}")) (coin.coinbase ${JSON.stringify(accountName)} (read-keyset "${accountName}") 100.0)`
}

export const getCapsForDeposit = (accountName: string, amount: number | string) => {
  return [
    Pact.lang.mkCap(
      'Coin Transfer',
      'Capability to transfer designated amount of coin from sender to receiver',
      'coin.TRANSFER',
      [accountName, 'opact-contract', Number(amount.toFixed(1))]
    )
  ]
}

export const computePactCode = ({
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
      "encryptedReceipts": ["${extData.encryptedReceipts.join('" "')}"],
      "encryptedCommitments": ["${extData.encryptedCommitments.join('" "')}"]
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

export const checkFunds = async (accountName: string) => {
  const createdAt = Math.round(new Date().getTime() / 1000) - 10

  const {
    result: {
      status,
      data,
    }
  } = await Pact.fetch.local({
    pactCode: `(coin.details ${JSON.stringify(accountName)})`,
    meta: Pact.lang.mkMeta('', '0', 0, 0, createdAt, 0)
  }, kadenaRPC)

  if (status === 'failure') {
    throw new Error("Failure", data);
  }

  return data
}

export const sendPactTransaction = async (
  receiver,
  {
    args,
    proof,
    extData,
    tokenSpec
  },
  callbackProgress
) => {
  const kp = Pact.crypto.genKeyPair()

  const pactCode = computePactCode({ args, proof, extData, tokenSpec })

  const createdAt = Math.round(new Date().getTime() / 1000) - 10

  callbackProgress('Sending your proof to relayer...')

  const cap1 = Pact.lang.mkCap(
    'Coin Transfer',
    'Capability to transfer designated amount of coin from sender to receiver',
    'coin.TRANSFER',
    ['opact-contract', receiver, Number((extData.extAmount * (-1)).toFixed(1))]
  )

  const cap2 = Pact.lang.mkCap(
    'Coin Transfer for Gas',
    'Capability to transfer gas fee from sender to gas payer',
    'coin.TRANSFER',
    ['opact-contract', 'opact-gas-payer', 1.0]
  )

  const tx = await Pact.fetch.send({
    networkId: 'testnet04',
    pactCode,
    keyPairs: [
      {
        publicKey: kp.publicKey,
        secretKey: kp.secretKey,
        clist: [
          cap1.cap,
          cap2.cap,
          {
            name: 'opact-gas-payer.GAS_PAYER',
            args: [1.0]
          }
        ]
      }
    ],
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

    meta: Pact.lang.mkMeta('', '0', 0, 0, createdAt, 0)
  }, kadenaRPC)

  callbackProgress('Awaiting TX results...')

  const {
    result
  } = await Pact.fetch.listen(
    { listen: tx.requestKeys[0] },
    kadenaRPC
  )

  if (result.status === 'failure') {
    throw new Error(result.error.message)
  }

  return result
}
