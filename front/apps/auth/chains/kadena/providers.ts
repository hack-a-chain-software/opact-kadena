import usexWalletAdapter from './adapters/xwallet'

export const adapters = {
  'provider:kda:adapter:xwallet': usexWalletAdapter()
} as any

export const getAdapters = (key: string) => adapters[key]
