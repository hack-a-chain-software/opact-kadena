import near from '../near/chain'
import kadena from '../kadena/chain'

export const chains = () => [kadena, near]

export const getChainByKey = (chainKey: any) =>
  chains().find(chain => chain.key === chainKey)
