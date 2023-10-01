
import { log } from 'console';

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

const logo = {
  transfer: 'minilogo',
}

const props = withDefaults(
  defineProps<{
    type: string;
    date?: number;
    receiver?: string;
    sender?: string;
    amount?: string;
  }>(),
  {
    //
  }
)

const icon = computed(() => {
  if (props.type === 'transfer') {
    // return BigInt(`0x${props.receiver}`) !== props.pubkey ? 'receiptReceive' : 'receiptSend'
    return 'receiptReceive'
  }

  return icons[props.type]
})

const formattedDate = computed(() => {
  return format(new Date(props.date), 'MMM dd, yyyy')
})

const formattedAmount = computed(() => {
  const decimals = getDecimals(12)

  return formatBigNumberWithDecimals(props.amount, decimals)
})

</script>

<template>
  <div
    class="
      px-4 py-3 hover:bg-gray-800 rounded-[8px] items-center justify-between
      grid grid-cols-[2fr,1fr,1fr,1fr]
    "
  >
    <div
      class="flex space-x-2 items-center"
    >
      <div
        class="w-[38px] h-[38px] rounded-full bg-gray-600 flex items-center justify-center mr-3"
      >
        <Icon
          :name="icon"
          class="text-white w-6 h-6"
        />
      </div>

      <div>
        <span
          v-text="type"
          class="capitalize text-font-1 text-sm"
        />
      </div>
    </div>

    <div
      class="flex items-center justify-end space-x-2 text-end"
    >
      <Icon
        name="kadena"
        class="text-white w-3 h-3"
      />

      <span
        v-text="shortenAddress(props.sender)"
        class="text-xs text-font-1"
      />
    </div>

    <div
      class="text-end"
    >
      <span
        v-text="formattedDate"
        class="font-xs text-font-1"
      />
    </div>

    <div
      class="text-end"
    >
      <span
        class="text-xs text-green-500"
      >
        + {{ formattedAmount  }} KDA
      </span>
    </div>
  </div>
</template>