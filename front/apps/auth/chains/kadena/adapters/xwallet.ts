import { shallowRef, ref } from 'vue'

export const usexWalletAdapter = () => {
  const account = ref<string>()
  const provider = shallowRef<undefined>()

  const metadata = {
    name: 'eckoWALLET',
    key: 'provider:kda:adapter:xwallet',
    icon: 'ecko',
    disabled: false
  }

  if (!process.client) {
    return {
      metadata,
      provider,
      account
    }
  }

  const connect = async (loginCallback = () => {}) => {
    const accountResult = await kadena.request({
      method: 'kda_connect',
      networkId: 'testnet04'
    })

    account.value = accountResult

    loginCallback()
  }

  const signMessage = async ({ message }: any) => {
    console.log(message)
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

  const disconnect = async function () {
    await kadena.request({
      method: 'kda_disconnect',
      networkId: 'testnet04'
    })

    account.value = ''
  }

  return {
    provider,
    account,
    connect,
    signMessage,
    disconnect,
    metadata
  }
}

export default usexWalletAdapter
