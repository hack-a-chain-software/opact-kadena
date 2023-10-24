import { storeToRefs } from 'pinia'
import { reactive, computed } from 'vue'
import {
  formatBigNumberWithDecimals,
  getDecimals
} from 'opact-sdk'
import { tokens } from '~/utils/constants'
import { useAppState } from '~/hooks/state'
import { useWalletStore } from '~/stores/wallet'
import { sendPactTransaction } from '~/utils/kadena'
import {
  computeWihtdrawParams,
  computeTransferParams
} from '~/utils/sdk'

export const useSendToken = () => {
  const data = reactive({
    amount: 0,

    error: '',
    addressTo: '',
    progress: 'Generating ZK Proof...',

    show: false,
    loading: false,
    showCollapsible: false,
    showWalletConnector: false,

    isValidAddress: false,

    token: tokens[0]
  })

  const { userData, loadAppState } = useAppState()

  const { provider } = useExtensions()

  const router = useRouter()

  const wallet = useWalletStore()

  const { node } = storeToRefs(wallet)

  const balance = computed(() => {
    if (!data.token) {
      return 0
    }

    const decimals = getDecimals(12)

    return data.token.name === 'Kadena'
      ? formatBigNumberWithDecimals(
        userData?.value?.tokens?.coin?.balance || 0,
        decimals
      )
      : formatBigNumberWithDecimals(
        userData?.value?.tokens['opact-coin']?.balance ||
            0,
        decimals
      )
  })

  const isInternalTransfer = computed(() => {
    if (data.addressTo.includes('OZK')) {
      return true
    }

    return false
  })

  const showConnectWalletButton = computed(() => {
    if (
      data.token.name !== 'Kadena' &&
      !provider.value &&
      !isInternalTransfer.value
    ) {
      return true
    }

    return false
  })

  const isDisabled = computed(() => {
    return (
      !data.isValidAddress ||
      Number(balance) <= 0 ||
      data.amount > Number(balance) ||
      data.amount <= 0
    )
  })

  const sendTransfer = async () => {
    try {
      data.loading = true
      data.error = ''

      let params = null

      if (data.addressTo.includes('OZK')) {
        params = await computeTransferParams({
          amount: Number(data.amount),
          receiver: data.addressTo
            .replace('OZK', '')
            .trim(),
          wallet: node.value,
          treeBalance:
            userData.value.tokens[
              data.token.namespace.refName.name
            ],
          receiptsParams: {
            id: 0,
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
        params = await computeWihtdrawParams({
          amount: Number(data.amount),
          receiver: data.addressTo,
          wallet: node.value,
          treeBalance:
            userData.value.tokens[
              data.token.namespace.refName.name
            ],
          receiptsParams: {
            id: 0,
            type: 'withdraw',
            receiver: data.addressTo,
            sender: node.value.pubkey,
            amount: Number(data.amount),
            address: data.token.namespace.refName.name
          },
          selectedToken: data.token.namespace
        })
      }

      if (
        data.token.name === 'Kadena' ||
        data.addressTo.includes('OZK')
      ) {
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

      loadAppState(node.value.pvtkey)
      // updateUserData(
      //   {
      //     ...params,
      //     token: data.token,
      //     tokenType: 'tokens'
      //   },
      //   -1
      // )
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
    balance,
    provider,
    isDisabled,
    sendTransfer,
    isInternalTransfer,
    showConnectWalletButton
  }
}
