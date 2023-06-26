export const createSigningCommand = ({
  ttl,
  account,
  networkId,
  publicKey,
  caps = [],
  gasLimit = 15000,
  gasPrice = 1e-5
}: any) => ({
  ttl,
  pactCode: `(free.kda-coinflip.deposit-to-bank "${account}" 1)`,
  sender: account,
  networkId,
  chainId: '8',
  gasLimit,
  gasPrice,
  signingPubKey: publicKey,
  caps
})

export const xwallet = {
  name: 'X Wallet',

  key: 'provider:kadena-xwallet',

  connect: async function (chain: any) {
    const accountResult = await kadena.request({
      method: 'kda_connect',
      networkId: chain.networkId
    })

    console.log(accountResult, 'accountResult')

    return accountResult
  },

  disconnect: async function (chain: any) {
    return await kadena.request({
      method: 'kda_disconnect',
      networkId: chain.networkId
    })
  },

  sign: async function (wallet: any) {
    console.log(wallet)
    console.log(
      wallet.chain.ttl,
      wallet.address,
      wallet.chain.networkId,
      wallet.publicKey
    )
    const networkId: any = wallet.chain.networkId

    const req = {
      method: 'kda_requestSign',
      networkId,
      data: {
        networkId,
        signingCmd: {
          ttl: wallet.chain.ttl,
          pactCode: '(foo)',
          sender: wallet.address,
          networkId: wallet.chain.networkId,
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
}

export default xwallet
