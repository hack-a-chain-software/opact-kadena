<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { shortenAddress } from 'opact-sdk'
import { useInvoiceStore } from '~/stores/invoice'

const invoiceStore = useInvoiceStore()

const {
  addressTo
} = storeToRefs(invoiceStore)

const emit = defineEmits(['changeStep'])
</script>

<template>
  <UICardBody>
    <UICardHeader title="Payment Request" />

    <div class="flex flex-col">
      <span class="text-xs text-font-2 break-words">
        The user
        <span
          class="text-font-1"
        >"{{ shortenAddress(addressTo,) }}"</span>
        requested a payment. Connect your wallet to proceed.
      </span>
    </div>

    <SelectWallet
      @connected="emit('changeStep', 'payment')"
    />
  </UICardBody>
</template>
