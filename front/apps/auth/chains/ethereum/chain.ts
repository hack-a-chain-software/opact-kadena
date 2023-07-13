import { adapters, getAdapters } from './providers'

export const eth = {
  ttl: 600,

  name: 'Ethereum',

  key: 'chain:eth',

  adapters,
  getAdapters
}

export default eth
