import {
  getCapsForDeposit,
  getCapsForWithdraw,
  getConfig,
  getPartialOpactCommand,
  sendSigned
} from 'opact-sdk'
import { pactCommandToSigningRequest, isInstalled, isConnected, isCorrectNetwork } from '~/utils';
import { defineStore } from 'pinia'

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    kadena?: {
    isKadena: boolean;
    request<T>(args: unknown): Promise<T>;
    };
  }
}

const metadata = {
  isInstalled,
  isConnected,
  isCorrectNetwork,
  disabled: false,
  name: 'Ecko Wallet',
  id: 'provider:kadena:x-wallet',
  icon: '/images/wallets/ecko.png',
}

export const provider = defineStore({
  id: 'provider:kadena:x-wallet',

  state: (): any => ({
    account: null,
    callback: undefined,
    icon: '/images/wallets/ecko.png'
  }),

  getters: {
    isConnected ({ account }) {
      return !!account
    }
  },

  actions: {
    init () {
      //
    },

    reset () {
      this.account = null
    },

    async disconnect () {
      if (!isInstalled()) {
        throw new Error('Not Installed')
      }

      if (! await isConnected()) {
        throw new Error('Incorrect network')
      }
      
      const { networkId } = getConfig()

      await window.kadena?.request({
        networkId,
        method: 'kda_disconnect'
      })

      this.account = null
    },

    async connect (callback = () => {}) {
      if (!isInstalled()) {
        throw new Error('Not Installed')
      }

      if (! await isCorrectNetwork()) {
        throw new Error('Incorrect network')
      }

      const { networkId } = getConfig()

      const { account } = await window.kadena?.request<any>({
        networkId,
        method: 'kda_connect'
      })

      this.account = {
        network: networkId,
        address: account.account,
        pubkey: account.publicKey,
        walletConnectChainId: `kadena:${networkId}`
      }

      this.callback = callback

      callback()
    },

    async send (
      { proof, extData, tokenSpec }: any,
      callbackProgress: any,
      isWithdrawTransfer = false,
      receiver = ''
    ) {
      if (!isInstalled()) {
        throw new Error('Not Installed')
      }

      if (! await isConnected()) {
        throw new Error('Not Connected')
      }

      const accountName = this.account.address

      let caps: any

      if (isWithdrawTransfer) {
        caps = getCapsForWithdraw(
          accountName,
          extData.tokenAmount,
          receiver,
          tokenSpec
        )
      } else {
        caps = getCapsForDeposit(
          accountName,
          extData.tokenAmount,
          tokenSpec
        )
      }

      const pactCommand = getPartialOpactCommand({
        proof,
        extData,
        tokenSpec,
        senderAccount: this.account.address
      })
        .addSigner(this.account.pubkey, () => [
          ...caps.map(({ cap }: any) => cap)
        ])
        .addData('recipient-guard', {
          keys: [receiver || this.account.pubkey]
        })

      const transaction = pactCommand.createTransaction()

      const parsedTransaction = JSON.parse(transaction.cmd)

      const signingRequest = pactCommandToSigningRequest(parsedTransaction)

      callbackProgress('Await sign...')

      const response = await window.kadena?.request({
        method: 'kda_requestSign',
        data: {
          networkId: parsedTransaction.networkId,
          signingCmd: signingRequest,
        },
      }) as any;

      if (response?.signedCmd === undefined) {
        throw new Error('Error signing transaction');
      }

      callbackProgress('Awaiting the transaction outcome.')

      return await sendSigned({ signedCmd: response.signedCmd })
    }
  }
})

export default {
  ...metadata,
  provider
}
