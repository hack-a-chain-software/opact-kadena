
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
    pubkey: any;
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
    return props.receiver === props.pubkey ? 'receiptReceive' : 'receiptSend'
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

const isNegative = computed(() => {
  if (props.type === 'withdraw') {
    return true
  }

  if (props.type === 'deposit') {
    return false
  }

  return false
})


</script>

<template>
  <div>
    <!-- <div
      class="pb-2"
    >
      <span
        v-text="formattedDate"
        class="text-xxs text-font-2"
      />
    </div> -->
    <div>
      <div
        class="flex px-4 py-3 bg-gray-800 rounded-[8px] items-center"
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
            class="text-font-1 text-xs capitalize"
            v-text="props.type"
          />

          <div>
            <span
              v-text="shortenAddress(props.sender)"
              class="text-xxs text-font-2"
            />
          </div>
        </div>

        <div
          class="ml-auto"
        >
          <span
            class="text-xs text-green-500"
            :class="isNegative ? 'text-red-500' : 'text-green-500' "
          >
            {{ isNegative ? '-' : '+' }} {{ formattedAmount  }} KDA
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
