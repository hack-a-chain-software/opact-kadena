import { shallowRef } from 'vue'
import { Web3Modal } from '@web3modal/html'
import {
  arbitrum,
  mainnet,
  polygon
} from '@wagmi/core/chains'
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider
} from '@web3modal/ethereum'
import {
  configureChains,
  createConfig,
  getAccount,
  signMessage,
  disconnect
} from '@wagmi/core'

const PROJECT_ID = '8354195026b85d657e3692c119242c19'

const chains: Chain[] = [arbitrum, mainnet, polygon]

const { publicClient } = configureChains(chains, [
  w3mProvider({ projectId: PROJECT_ID })
])

export const wagmiClient = createConfig({
  connectors: w3mConnectors({
    projectId: PROJECT_ID,
    chains
  }),
  publicClient
})

export const ethereumClient = new EthereumClient(
  wagmiClient,
  chains
)

export const useWalletConnectAdapter = () => {
  let callback = () => {}

  const account = ref<string>()
  const provider = shallowRef<undefined>()

  const metadata = {
    name: 'Wallet Connector',
    key: 'provider:eth:adapter:wallet-connect',
    icon: 'walletConnect',
    disabled: false
  }

  if (!process.client) {
    return {
      metadata,
      provider,
      account
    }
  }

  const web3modal = ref<Web3Modal>(
    new Web3Modal({ projectId: PROJECT_ID }, ethereumClient)
  )

  web3modal.value.subscribeEvents((event) => {
    if (event.name === 'ACCOUNT_CONNECTED') {
      account.value = getAccount().address

      callback()
    }

    if (event.name === 'ACCOUNT_DISCONNECTED') {
      account.value = undefined
    }
  })

  const connect = async (loginCallback = () => {}) => {
    await web3modal.value.openModal()

    callback = loginCallback
  }

  const sendTransaction = () => {}

  return {
    provider,
    account,
    connect,
    signMessage,
    sendTransaction,
    disconnect,
    metadata
  }
}
