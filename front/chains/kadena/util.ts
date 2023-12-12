import Client from '@walletconnect/sign-client'
import { WalletConnectModal } from '@walletconnect/modal'

export const projectId = '3974e0e0f91a102389b8cb3fc1a590a5'

export const getWalletConnectClient = async () => {
  return await Client.init({
    relayUrl: 'wss://relay.walletconnect.com',
    projectId: '3974e0e0f91a102389b8cb3fc1a590a5'
  })
}

export const getWalletConnectModal = () => {
  return new WalletConnectModal({
    projectId: '3974e0e0f91a102389b8cb3fc1a590a5',
    themeMode: 'dark'
  })
}
