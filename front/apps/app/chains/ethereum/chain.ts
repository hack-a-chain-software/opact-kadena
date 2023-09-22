import { providers, getProvider } from './providers'

export const eth = {
  id: 'chain:ethereum',
  name: 'Ethereum',

  providers,
  getProvider
}

export default eth
