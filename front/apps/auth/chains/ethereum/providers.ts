import xWallet from './provider/wallet-connect'

export const providers = {
  [xWallet.id]: xWallet
} as any

export const getProvider = (key: string) => providers[key]
