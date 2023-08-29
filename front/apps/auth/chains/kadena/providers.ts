import eckoWallet from './adapters/xwallet'

export const providers = {
  [eckoWallet.provider.id]: eckoWallet
} as any

export const getProvider = (key: string) => providers[key]
