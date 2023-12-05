<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInvoiceStore } from '~/stores/invoice'

const invoiceStore = useInvoiceStore()

const {
  progress,
  isLoading,
  addressTo,
  isDisabled,
  selectedToken
} = storeToRefs(invoiceStore)

invoiceStore.init(1, 'nft', null)

const emit = defineEmits([
  'changeStep'
])

const send = async () => {
  await invoiceStore.sendDepositToken()

  emit('changeStep', 'success')
}

const { provider } = useExtensions()
</script>

<template>
  <UICardBody>
    <UICardHeader
      title="Confirm deposit information"
    />

    <SelectNFT
      :disabled="!provider"
      :token="selectedToken"
      @selected="selectedToken = $event"
      :account-name="provider?.account?.account?.publicKey"
    />

    <UIInputAddress
      readonly
      :token="selectedToken"
      :modelValue="addressTo"
      @update:modelValue="addressTo = $event"
      @isValidAddress="isValidAddress = $event"
    />

    <!-- <TxWrapperNFT
      :amount="amount"
      :token="selectedToken"
      :disabled="!selectedToken"
      :receiver="addressTo"
      :sender="
        provider?.account?.address ||
        provider?.account?.account?.account
      "
    /> -->

    <UIButtonInline
      :loading="isLoading"
      :disabled="isDisabled"
      :label="isLoading ? progress : 'Deposit Now'"
      @click.prevent="send()"
    />
  </UICardBody>
</template>
