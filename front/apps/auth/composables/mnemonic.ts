import { Buffer } from 'buffer'

globalThis.Buffer = Buffer

let ethers: any

export const foundWallet = async () => {
  if (!ethers) {
    ethers = await import('ethers')
  }

  const node = ethers.HDNodeWallet.createRandom()

  return {
    node
  }
}

export const recoveryWallet = async ({ phrase }: any) => {
  if (!ethers) {
    ethers = await import('ethers')
  }

  const node = ethers.HDNodeWallet.fromPhrase(phrase)

  return {
    node
  }
}
