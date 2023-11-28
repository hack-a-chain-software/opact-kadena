import { reactive, watch } from 'vue'
import { tokens } from '~/utils/constants'
import { useAppState } from '~/hooks/state'
import { computeDepositParams } from '~/utils/sdk'

export const useDepositToken = (
  amount = 0,
  token = tokens[0],
  tokenType = 'tokens'
) => {
  const data = reactive({
    token,
    amount,
    tokenType,

    balance: 0,

    error: '',
    progress: 'Generating ZK Proof...',

    show: false,
    loading: false,
    showCollapsible: false
  })

  const { loadAppState } = useAppState()

  const { provider } = useExtensions()

  const router = useRouter()

  const { account } = useOpactWallet()

  const sendDeposit = async () => {
    data.error = ''
    data.loading = true

    try {
      const transactionArgs = await computeDepositParams({
        receiver: '',
        wallet: account.value,
        amount: Number(data.amount),
        selectedToken: data.token.namespace,
        sender: provider.value.account.account.publicKey,
        receiptsParams: {
          type: 'deposit',
          id: data.token.id,
          amount: Number(data.amount),
          receiver: account.value.pubkey,
          address: data.token.namespace.refName.name,
          sender: provider.value.account.account.publicKey
        }
      })

      await provider.value.transaction(
        transactionArgs,
        (message: string) => (data.progress = message)
      )

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

  const checkFunds = async () => {
    await nextTick()

    if (!data.token || !provider.value) {
      return
    }

    const prefix =
      data.token.name === 'Kadena'
        ? 'coin'
        : 'test.opact-coin'

    try {
      const details = await getTokenDetails(
        provider.value?.account?.account?.publicKey,
        prefix
      )

      data.balance = details.balance
    } catch (e) {
      console.warn(e)
    }
  }

  watch(
    () => [data.token],
    () => {
      checkFunds()
    }
  )

  const showConnectWalletButton = computed(() => {
    if (!provider.value) {
      return true
    }

    return false
  })

  const isDisabled = computed(() => {
    return (
      Number(data.balance) <= 0 ||
      Number(data.amount) >= Number(data.balance) ||
      Number(data.amount) <= 0
    )
  })

  const isDisabledNFT = computed(() => {
    return !data.token || !provider.value
  })

  return {
    data,
    node: account,
    router,
    provider,
    checkFunds,
    isDisabled,
    sendDeposit,
    isDisabledNFT,
    showConnectWalletButton
  }
}
