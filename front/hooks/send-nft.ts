import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppState } from '~/hooks/state'
import { useWalletStore } from '~/stores/wallet'
import { sendPactTransaction } from '~/utils/kadena'
import {
  computeWihtdrawParamsForNFT,
  computeTransferParamsForNFT
} from '~/utils/sdk'

export const useSendNFT = () => {
  const data = reactive({
    amount: 1,

    error: '',
    addressTo: '',
    progress: 'Generating ZK Proof...',

    show: false,
    loading: false,
    showCollapsible: false,
    showWalletConnector: false,
    isValidAddress: false,

    token: null
  })

  const { userData, updateUserData } = useAppState()

  const { provider } = useExtensions()

  const router = useRouter()

  const wallet = useWalletStore()

  const { node } = storeToRefs(wallet)

  const isInternalTransfer = computed(() => {
    if (data.addressTo.includes('OZK')) {
      return true
    }

    return false
  })

  const showConnectWalletButton = computed(() => {
    if (!provider.value && !isInternalTransfer.value) {
      return true
    }

    return false
  })

  const isDisabled = computed(() => {
    return !data.isValidAddress || !data.token
  })

  const sendTransfer = async () => {
    if (!data.token) {
      return
    }

    try {
      data.loading = true
      data.error = ''

      let params = null

      if (data.addressTo.includes('OZK')) {
        params = await computeTransferParamsForNFT({
          amount: Number(data.amount),
          receiver: data.addressTo
            .replace('OZK', '')
            .trim(),
          wallet: node.value,
          treeBalance:
            userData.value.nfts[
              data.token.namespace.refName.name
            ],
          receiptsParams: {
            id: data.token.id,
            type: 'transfer',
            sender: node.value.pubkey,
            amount: Number(data.amount),
            address: data.token.namespace.refName.name,
            receiver: BigInt(
              `0x${data.addressTo
                .replace('OZK', '')
                .trim()}`
            )
          },
          selectedToken: data.token.namespace
        })
      } else {
        params = await computeWihtdrawParamsForNFT({
          amount: Number(data.amount),
          receiver: data.addressTo,
          wallet: node.value,
          treeBalance:
            userData.value.nfts[
              data.token.namespace.refName.name
            ],
          receiptsParams: {
            type: 'withdraw',
            id: data.token.id,
            receiver: data.addressTo,
            sender: node.value.pubkey,
            amount: Number(data.amount),
            address: data.token.namespace.refName.name
          },
          selectedToken: data.token.namespace
        })
      }

      if (data.addressTo.includes('OZK')) {
        await sendPactTransaction(
          data.addressTo,
          params,
          (message: string) => (data.progress = message)
        )
      } else {
        await provider.value.transaction(
          params,
          (message: string) => (data.progress = message),
          true,
          data.addressTo
        )
      }

      updateUserData(
        {
          ...params,
          token: data.token,
          tokenType: 'nfts'
        },
        -1
      )
      router.push('/home')
    } catch (e) {
      console.warn(e)
      data.error = e.message
    } finally {
      data.loading = false
      data.progress = 'Generating ZK Proof...'
    }
  }

  return {
    data,
    node,
    router,
    provider,
    isDisabled,
    sendTransfer,
    isInternalTransfer,
    showConnectWalletButton
  }
}
