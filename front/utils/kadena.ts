import Pact from 'pact-lang-api'

export const kadenaRPC =
  process.env.NODE_ENV !== 'development'
    ? 'https://kb96ugwxhi.execute-api.us-east-2.amazonaws.com'
    : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:9001'

export const getPactCodeForFaucet = (
  accountName: string,
  preffix = 'coin',
  withFund = true
) => {
  return `${
    withFund &&
    `(${preffix}.create-account ${JSON.stringify(
      accountName
    )} (read-keyset "${accountName}"))`
  } (${preffix}.coinbase ${JSON.stringify(
    accountName
  )} (read-keyset "${accountName}") 100.0)`
}

export const getCapsForWithdraw = (
  accountName: string,
  amount: any,
  preffix = 'coin',
  receiver: any,
  tokenSpec: any
) => {
  if (preffix.includes('poly-fungible-v2-reference')) {
    return [
      Pact.lang.mkCap(
        'Mint Token',
        'Capability to mint token',
        `${preffix}.TRANSFER`,
        [
          tokenSpec?.id || '',
          'opact-contract',
          receiver,
          Number((amount * -1).toFixed(1))
        ]
      ),
      Pact.lang.mkCap(
        'Coin Transfer for Gas',
        'Capability to transfer gas fee from signer to gas payer',
        'coin.TRANSFER',
        [
          accountName,
          'opact-gas-payer',
          Number((1).toFixed(1))
        ]
      )
    ]
  }

  return [
    Pact.lang.mkCap(
      'Coin Transfer',
      'Capability to transfer designated amount of coin from sender to receiver',
      `${preffix}.TRANSFER`,
      [
        'opact-contract',
        receiver,
        Number((amount * -1).toFixed(1))
      ]
    ),
    Pact.lang.mkCap(
      'Coin Transfer for Gas',
      'Capability to transfer gas fee from signer to gas payer',
      'coin.TRANSFER',
      [
        accountName,
        'opact-gas-payer',
        Number((1).toFixed(1))
      ]
    )
  ]
}

export const getCapsForDeposit = (
  accountName: string,
  amount: number | string,
  preffix = 'coin',
  tokenSpec = {}
) => {
  if (preffix.includes('poly-fungible-v2-reference')) {
    return [
      Pact.lang.mkCap(
        'Mint Token',
        'Capability to mint token',
        `${preffix}.TRANSFER`,
        [
          tokenSpec?.id || '',
          accountName,
          'opact-contract',
          Number(Number(amount).toFixed(1))
        ]
      )
    ]
  }

  return [
    Pact.lang.mkCap(
      'Coin Transfer',
      'Capability to transfer designated amount of coin from sender to receiver',
      `${preffix}.TRANSFER`,
      [
        accountName,
        'opact-contract',
        Number(Number(amount).toFixed(1))
      ]
    )
  ]
}

export const computePactCode = ({
  proof,
  extData
}: any) => {
  return `(test.opact.transact {
      "public_values":[${proof.public_values.join(' ')}],
      "a":{"x": ${proof.a.x}, "y": ${proof.a.y} },
      "b":{"x":[${proof.b.x.join(
        ' '
      )}],"y":[${proof.b.y.join(' ')}]},
      "c":{"x":${proof.c.x},"y":${proof.c.y}}
    } {
      "sender":"${extData.sender}",
      "recipient":"${extData.recipient}",
      "tokenType": "${extData.tokenType}",
      "tokenAmount":${extData.tokenAmount},
      "tokenId": "${extData.tokenId}",
      "outputCommitments": [${extData.outputCommitments.join(
        ' '
      )}],
      "encryptedReceipts": ["${extData.encryptedReceipts.join(
        '" "'
      )}"],
      "encryptedCommitments": ["${extData.encryptedCommitments.join(
        '" "'
      )}"]
    })`
}

export const getTokenDetails = async (
  accountName: string,
  prefix: string
) => {
  const createdAt =
    Math.round(new Date().getTime() / 1000) - 10

  const {
    result: { status, data }
  } = await Pact.fetch.local(
    {
      pactCode: `(${prefix}.details ${JSON.stringify(
        accountName
      )})`,
      meta: Pact.lang.mkMeta('', '0', 0, 0, createdAt, 0)
    },
    kadenaRPC
  )

  if (status === 'failure') {
    throw new Error('Failure', data)
  }

  return data
}

export const sendPactTransaction = async (
  receiver: any,
  { proof, extData, tokenSpec }: any,
  callbackProgress: any
) => {
  const kp = Pact.crypto.genKeyPair()

  const pactCode = computePactCode({ proof, extData })

  const createdAt =
    Math.round(new Date().getTime() / 1000) - 10

  callbackProgress('Sending your proof to relayer...')

  const preffix =
    tokenSpec.refName.name === 'coin'
      ? 'coin'
      : `test.${tokenSpec.refName.name}`

  const cap1 = Pact.lang.mkCap(
    'Coin Transfer',
    'Capability to transfer designated amount of coin from sender to receiver',
    `${preffix}.TRANSFER`,
    [
      'opact-contract',
      receiver,
      Number((extData.tokenAmount * -1).toFixed(1))
    ]
  )

  const cap2 = Pact.lang.mkCap(
    'Coin Transfer for Gas',
    'Capability to transfer gas fee from sender to gas payer',
    `${preffix}.TRANSFER`,
    ['opact-contract', 'opact-gas-payer', 1.0]
  )

  const tx = await Pact.fetch.send(
    {
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
        'recipient-guard': {
          keys: [receiver]
        },
        'token-instance': {
          refSpec: [
            {
              name: tokenSpec.refSpec.name
            }
          ],
          refName: {
            name: tokenSpec.refName.name,
            namespace:
              tokenSpec.refName.namespace || undefined
          }
        }
      },

      meta: Pact.lang.mkMeta('', '0', 0, 0, createdAt, 0)
    },
    kadenaRPC
  )

  callbackProgress('Awaiting TX results...')

  const { result } = await Pact.fetch.listen(
    { listen: tx.requestKeys[0] },
    kadenaRPC
  )

  if (result.status === 'failure') {
    throw new Error(result.error.message)
  }

  return result
}
