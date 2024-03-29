<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { getTokenDetails } from 'opact-sdk'
import { useReceiveStore } from '~/stores/receive'

const invoiceStore = useReceiveStore()

const {
  amount,
  balance,
  progress,
  isLoading,
  addressTo,
  selectedToken
} = storeToRefs(invoiceStore)

const emit = defineEmits([
  'changeStep'
])

const { provider } = useExtensions()

const send = async () => {
  await invoiceStore.sendInvoice()

  emit('changeStep', 'success')
}

const checkFunds = async (token: any) => {
  await nextTick()

  if (!token || !provider.value) {
    return
  }

  try {
    const details = await getTokenDetails(
      provider.value.account?.address,
      token
    )

    balance.value = details.balance
  } catch (e) {
    console.warn(e)
  }
}

watch(
  () => [selectedToken.value],
  () => {
    checkFunds(selectedToken.value)
  },
  {
    immediate: true
  }
)
</script>

<template>
  <UICardBody>
    <UICardHeader
      title="Payment Request"
    />

    <UIInputMoney
      label="Amount"
      :balance="balance"
      v-model="amount"
    />

    <UISelectToken
      :token="selectedToken"
      @selected="selectedToken = $event"
    />

    <UIInputAddress
      readonly
      :token="selectedToken"
      :modelValue="addressTo"
      @update:modelValue="addressTo = $event"
      @isValidAddress="isValidAddress = $event"
    />

    <TxWrapper
      :amount="amount"
      :token="selectedToken"
      :receiver="addressTo"
      :sender="
        provider?.account?.address ||
        provider?.account?.account?.account
      "
    />

    <UIButtonInline
      :loading="isLoading"
      :label="isLoading ? progress : 'Deposit Now'"
      @click.prevent="send()"
    />
  </UICardBody>
</template>
