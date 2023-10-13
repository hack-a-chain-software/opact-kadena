<script lang="ts" setup>
const emits = defineEmits(['changeStep'])
import { shortenAddress } from '~/utils/string'

const route = useRoute()

const params = computed<any>(() => {
  const {
    amount = '',
    pubkey = ''
  } = route.query || {}

  return {
    amount,
    pubkey
  }
})
</script>

<template>
  <div>
    <div>
      <span class="text-md text-font-1">
        Payment Request
      </span>
    </div>

    <div class="pt-2 flex flex-col space-y-3">
      <span class="text-xs text-font-2 break-words">
        The user <span class="text-font-1">"OZK{{ shortenAddress(params.pubkey) }}"</span> requested a payment.
      </span>

      <span
        class="text-xs text-font-2"
      >
        Connect your wallet to proceed.
      </span>
    </div>

    <AppButton
      label="Connect Wallet"
      class="mt-full lg:mt-4"
      @click.prevent="emits('changeStep', 'provider')"
    />
  </div>
</template>
