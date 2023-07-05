import { xwallet } from './adapters/xwallet'

export const providers = {
  [xwallet.key]: xwallet
} as any

export const getProvider = (key: string) => providers[key]
