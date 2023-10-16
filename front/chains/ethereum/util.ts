import {
  arbitrum,
  mainnet,
  polygon
} from '@wagmi/core/chains'

import { configureChains, createConfig } from '@wagmi/core'

import type { Chain } from '@wagmi/core/chains'

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider
} from '@web3modal/ethereum'

import { Web3Modal } from '@web3modal/html'

export const projectId = '8354195026b85d657e3692c119242c19'

export const chains: Chain[] = [arbitrum, mainnet, polygon]

export const { publicClient } = configureChains(chains, [
  w3mProvider({ projectId })
])

export const wagmiClient = createConfig({
  connectors: w3mConnectors({
    projectId,
    chains
  }),
  publicClient
})

export const ethereumClient = () =>
  new EthereumClient(wagmiClient, chains)

export const getWeb3Modal = (): Web3Modal =>
  new Web3Modal({ projectId }, ethereumClient())
