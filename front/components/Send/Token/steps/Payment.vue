<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'
import { useTransferStore } from '~/stores/transfer'

const transferStore = useTransferStore()

const walletStore = useWalletStore()

const {
  error,
  amount,
  balance,
  progress,
  isLoading,
  addressTo,
  isDisabled,
  selectedToken,
  isValidAddress,
  isInternalTransfer,
  showConnectWalletButton
} = storeToRefs(transferStore)

const {
  account
} = storeToRefs(walletStore)

const { provider } = useExtensions()

const checkFunds = async () => {
  if (!selectedToken.value) {
    return
  }

  const prefix =
    selectedToken.value.name === 'Kadena'
      ? 'coin'
      : 'test.opact-coin'

  await nextTick()

  if (!provider.value) {
    return
  }

  // data.loading = true

  const {
    result: { status, data: coinData }
  } = await provider.value.coinDetails(prefix)

  console.log('result', coinData)
  console.log('status', status)

  // data.loading = false

  // if (status === 'failure') {
  //   data.balance = 0

  //   return
  // }

  // data.balance = coinData.balance
}

onBeforeMount(() => {
  checkFunds()
})
</script>

<template>
  <UICardBody>
    <UIInputMoney
      :balance="balance"
      :token="selectedToken"
      v-model="amount"
    />

    <ProviderUser
      v-if="
        provider &&
        !isInternalTransfer &&
        selectedToken?.name !== 'Kadena'
      "
      :provider="provider"
    />

    <SelectToken
      :token="selectedToken"
      @selected="selectedToken = $event"
    />

    <UIInputAddress
      :token="selectedToken"
      :modelValue="addressTo"
      @update:modelValue="addressTo = $event"
      @isValidAddress="isValidAddress = $event"
    />

    <TxWrapper
      :token="selectedToken"
      :amount="amount"
      :receiver="addressTo"
      :sender="account.address"
      :disabled="isDisabled"
    />

    <Warning
      type="error"
      v-if="error"
      :label="error + '*'"
    />

    <SelectWallet v-if="showConnectWalletButton" />

    <UIButtonInline
      v-else
      :loading="isLoading"
      :disabled="isDisabled"
      @click.prevent="transferStore.sendTransferToken(account)"
      :label="isLoading ? progress : 'Send Token'"
    />
  </UICardBody>
</template>
