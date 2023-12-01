import { reactive, computed } from 'vue'
import {
  formatBigNumberWithDecimals,
  getDecimals
} from 'opact-sdk'
import { storeToRefs } from 'pinia'
import { tokens } from '~/utils/constants'
import { useAppState } from '~/hooks/state'
import { sendPactTransaction } from '~/utils/kadena'
import {
  computeWihtdrawParams,
  computeTransferParams
} from '~/utils/sdk'
import { useWalletStore } from '~/stores/wallet'

export const useSendToken = () => {
  const data = reactive({
    amount: 0,

    error: '',
    addressTo: '',
    progress: 'Generating ZK Proof...',

    show: false,
    loading: false,
    showCollapsible: false,

    isValidAddress: false,

    token: tokens[0]
  })

  const { userData, loadAppState } = useAppState()

  const { provider } = useExtensions()

  const router = useRouter()

  const wallet = useWalletStore()
  const { account } = storeToRefs(wallet)

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
          wallet: account.value,
          treeBalance:
            userData.value.tokens[
              data.token.namespace.refName.name
            ],
          receiptsParams: {
            id: 0,
            type: 'transfer',
            sender: account.value.pubkey,
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
          wallet: account.value,
          treeBalance:
            userData.value.tokens[
              data.token.namespace.refName.name
            ],
          receiptsParams: {
            id: 0,
            type: 'withdraw',
            receiver: data.addressTo,
            sender: account.value.pubkey,
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

      loadAppState(account.value.pvtkey)
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
    node: account,
    router,
    balance,
    provider,
    isDisabled,
    sendTransfer,
    isInternalTransfer,
    showConnectWalletButton
  }
}
