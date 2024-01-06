<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReceiveStore } from '~/stores/receive'

const invoiceStore = useReceiveStore()

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
  await invoiceStore.sendInvoice()

  emit('changeStep', 'success')
}

const { provider } = useExtensions()
</script>

<template>
  <UICardBody>
    <UICardHeader
      title="Confirm deposit information"
    />

    <UISelectNFT
      :disabled="!provider"
      :token="selectedToken"
      @selected="selectedToken = $event"
      :account-name="provider?.account?.address"
    />

    <UIInputAddress
      readonly
      :token="selectedToken"
      :modelValue="addressTo"
      @update:modelValue="addressTo = $event"
      @isValidAddress="isValidAddress = $event"
    />

    <TxWrapperNFT
      :token="selectedToken"
      :disabled="!selectedToken"
      :receiver="addressTo"
      :sender="provider?.account?.address"
    />

    <UIButtonInline
      :loading="isLoading"
      :disabled="isDisabled"
      :label="isLoading ? progress : 'Deposit Now'"
      @click.prevent="send()"
    />
  </UICardBody>
</template>
