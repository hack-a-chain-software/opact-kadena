import { providers, getProvider } from './providers'

export const kadena = {
  ttl: 600,

  name: 'Kadena',

  key: 'kda',

  address: '',
  provider: '',
  publicKey: '',

  networkId: 'testnet04',
  network: 'https://api.testnet.chainweb.com',

  id: 'chain:kadena',

  providers,
  getProvider
}

export default kadena
