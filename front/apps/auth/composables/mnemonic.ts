import { HDNodeWallet } from 'ethers'

import 'buffer'

export const foundWallet = () => {
  const node = HDNodeWallet.createRandom()

  return {
    node
  }
}

export const recoveryWallet = ({ phrase }: any) => {
  const node = HDNodeWallet.fromPhrase(phrase)

  return {
    node
  }
}
