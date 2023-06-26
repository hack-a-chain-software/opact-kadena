import { Buffer } from 'buffer'
import {
  generateMnemonic,
  mnemonicToSeedSync
} from 'bip39'
import { hdkey } from 'ethereumjs-wallet'

export const newMnemonic = () => {
  console.log('fooooooo')
  console.log(Buffer.from('foo', 'hex'))

  // const mnemonic: any = 'testando-opact'
  const mnemonic: any = generateMnemonic()

  const seed = mnemonicToSeedSync(mnemonic).toString('hex')

  const hdwallet: any = hdkey.fromMasterSeed(
    Buffer.from(seed, 'hex')
  )

  const walletHdpath = "m/44'/60'/0'/0/"

  const wallet = hdwallet
    .derivePath(walletHdpath + '0')
    .getWallet()

  const address =
    '0x' + wallet.getAddress().toString('hex')

  const privateKey = wallet.getPrivateKey().toString('hex')

  console.log('Mnemonic:', mnemonic)
  console.log('Seed:', seed)
  console.log('Opact Address:', address)
  console.log('Private Key:', privateKey)
  console.log('test')
  console.log(
    seed ===
      '9d4669ec54817a10d04d5b0e1e62d57ec881fbf9d59feeccbaa9a550ac8b2402917db0cc1737014cd3f01545e8f3dff82c333746db4cad2d516e64ad94a1f201'
  )
  console.log(
    address === '0xbf093017da831fa8417f4a9fcef2739a6fe43f86'
  )
  console.log(
    privateKey ===
      'a10780dd41324441b77f5c541f859f27be997af67ac5a71d325ec21db443ad9b'
  )
  console.log(
    mnemonic ===
      'camp home praise uphold fold shuffle will toward panda hour tonight wine'
  )

  return {
    address,
    mnemonic,
    hdwallet,
    privateKey,
    walletHdpath
  }
}
