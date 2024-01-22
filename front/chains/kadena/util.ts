import Client from '@walletconnect/sign-client'
import { WalletConnectModal } from '@walletconnect/modal'

export const getWalletConnectClient = async () => {
  const config = useRuntimeConfig()

  return await Client.init({
    relayUrl: config.public.WC_RELAYER as string,
    projectId: config.public.WC_PROJECT_ID as string
  })
}

export const getWalletConnectModal = () => {
  const config = useRuntimeConfig()

  return new WalletConnectModal({
    themeMode: 'dark',
    enableAuthMode: true,
    enableExplorer: false,
    projectId: config.public.WC_PROJECT_ID as string
  })
}
