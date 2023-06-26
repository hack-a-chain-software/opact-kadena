import kadena from '../kadena/chain'

export const chains = () => [kadena]

export const getChainByKey = (chainKey: any) =>
  chains().find(chain => chain.key === chainKey)
