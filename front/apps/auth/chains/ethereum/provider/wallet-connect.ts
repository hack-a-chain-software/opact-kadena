import { ref } from 'vue'

import {
  getAccount,
  signMessage,
  disconnect
} from '@wagmi/core'

import type { Web3Modal } from '@web3modal/html'
import { getWeb3Modal } from '../util'

export const useProvider = () => {
  const callback = ref<any>()

  const account = ref<any>('')

  const web3modal = ref<Web3Modal>()

  const init = () => {
    if (!web3modal.value) {
      const modal = getWeb3Modal()

      modal.subscribeEvents((event) => {
        if (event.name === 'ACCOUNT_CONNECTED') {
          account.value = getAccount()

          callback.value()
        }

        if (event.name === 'ACCOUNT_DISCONNECTED') {
          account.value = undefined
        }
      })

      web3modal.value = modal
    }

    return web3modal.value
  }

  const connect = async (loginCallback = () => {}) => {
    const modal = await init()

    await modal.openModal()

    callback.value = loginCallback
  }

  const sendTransaction = () => {}

  return {
    account,
    connect,
    signMessage,
    sendTransaction,
    disconnect
  }
}

export default {
  id: 'provider:wallet-connect',
  name: 'Wallet Connector',
  icon: 'walletConnect',
  disabled: false,

  provider: useProvider()
}
