
<script lang="ts" setup>
import { computed } from 'vue'
import { shortenAddress } from '~/utils/string'
import { getDecimals, formatBigNumberWithDecimals } from 'opact-sdk'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

const icons = {
  withdraw: 'receiptSend',
  deposit: 'receiptReceive',
  transfer: '',
}

const props = withDefaults(
  defineProps<{
    balance: any;
    token: any;
  }>(),
  {
    //
  }
)

const formattedAmount = computed(() => {
  const decimals = getDecimals(12)

  return formatBigNumberWithDecimals(props.balance, decimals)
})

</script>

<template>
  <div
    class="
      px-4
      py-2.5
      bg-gray-800
      rounded-[8px]
      h-[66px]
      flex
      items-center
    "
  >
    <div class="pr-4">
      <img src="/kda.png">
    </div>

    <div class="space-y-1">
      <p
        class="
          text-xs
          font-regular
          opacity-[0.9]
          text-font-1
        "
        v-text="token.symbol"
      />

      <p
        class="
          text-font-2 text-xxs
          font-medium
          opacity-[0.9]
        "
      >
        -
      </p>
    </div>

    <div class="ml-auto">
      <p
        class="
          text-sm
          font-medium
          text-font-1
          opacity-[0.9]
        "
        v-text="formattedAmount"
      />
    </div>
  </div>
</template>
