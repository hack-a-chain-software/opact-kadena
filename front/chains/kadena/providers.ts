import eckoWallet from './adapters/eckowallet'
import walletConnect from './adapters/wallet-connect'

export const providers = {
  [walletConnect.id]: walletConnect,
  [eckoWallet.id]: eckoWallet
} as any

export const getProvider = (key: string) => providers[key]
