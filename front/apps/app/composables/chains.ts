import { chains } from '../chains'

export const getChains = (): any[] => [...chains]

export const getChainByKey = (chainKey: any) =>
  getChains().find(chain => chain.key === chainKey)
