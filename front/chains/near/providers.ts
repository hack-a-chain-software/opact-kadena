import meteor from './adapters/meteor'
import myNearWallet from './adapters/my-near-wallet'

export const providers = {
  [meteor.key]: meteor,
  [myNearWallet.key]: myNearWallet
} as any

export const getProvider = (key: string) => providers[key]
