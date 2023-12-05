<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '~/stores/invoice'

const invoiceStore = useInvoiceStore()

const {
  amount,
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
  await invoiceStore.sendDepositToken()

  emit('changeStep', 'success')
}
</script>

<template>
  <UICardBody>
    <UICardHeader
      title="Payment Request"
    />

    <UIInputMoney
      label="Amount"
      :model-value="amount"
    />

    <SelectToken
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
