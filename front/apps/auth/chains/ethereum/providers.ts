import { useWalletConnectAdapter } from './adapaters/wallet-connect'

export const adapters = {
  'provider:eth:adapter:wallet-connect':
    useWalletConnectAdapter()
} as any

export const getAdapters = (key: string) => adapters[key]
