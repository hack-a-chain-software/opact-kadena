<script lang="ts" setup>
import { computed, reactive } from 'vue'
import {
  shortenAddress,
  getDecimals,
  formatBigNumberWithDecimals,
  kadenaTokens as tokens
} from 'opact-sdk'
import { format } from 'date-fns'

const icons = {
  withdraw: 'receiptSend',
  deposit: 'receiptReceive'
}

const props = withDefaults(
  defineProps<{
    id?: any;
    type: string;
    date?: number;
    sender?: string;
    amount?: string;
    address: string;
    receiver?: string;
  }>(),
  {
    //
  }
)

const state = reactive({
  datum: null
})

const icon = computed(() => {
  return icons[props.type]
})

const formattedDate = computed(() => {
  return format(new Date(props.date), 'MMM dd, yyyy')
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

const formattedAmount = computed(() => {
  const decimals = getDecimals(12)

  return formatBigNumberWithDecimals(
    props.amount,
    decimals
  )
})

const metadata = computed(() => {
  if (props.address !== 'poly-fungible-v2-reference') {
    return tokens.find(
      token =>
        token.namespace.refName.name === props.address
    )
  }

  return tokens[1]
})
</script>

<template>
  <div
    class="
      md:px-4
      md:py-3
      md:hover:bg-gray-800
      rounded-[8px]
      items-center
      justify-between
      grid grid-cols-[2fr,auto] md:grid-cols-[2fr,1fr,1fr,1.3fr]
      gap-6
    "
  >
    <div class="flex space-x-2 items-center">
      <div
        class="
          w-[38px]
          h-[38px]
          rounded-full
          bg-gray-600
          flex
          items-center
          justify-center
          mr-3
        "
      >
        <Icon :name="icon" class="text-white w-6 h-6" />
      </div>

      <div
        class="flex flex-col"
      >
        <span
          v-text="type"
          class="capitalize text-font-1 text-xs md:text-sm"
        />

        <div
          class="
            md:hidden
            flex
            items-center
            justify-end
            space-x-2
            text-end
          "
        >
          <Icon name="kadena" key="another-kadena" class="text-white w-[10px] h-[10px]" />

          <span
            class="text-xxs text-font-2"
            v-text="shortenAddress(type === 'withdraw' ? receiver as string : sender as string)"
          />
        </div>
      </div>
    </div>

    <div
      class="
        hidden
        md:flex
        items-center
        justify-end
        space-x-2
        text-end
      "
    >
      <Icon name="kadena" class="text-white w-3 h-3" />

      <span
        class="text-xs text-font-1"
        v-text="shortenAddress(type === 'withdraw' ? receiver as string : sender as string)"
      />
    </div>

    <div class="hidden md:block text-end">
      <span
        v-text="formattedDate"
        class="font-xs text-font-1"
      />
    </div>

    <div
      class="text-center"
      v-if="address !== 'poly-fungible-v2-reference'"
    >
      <span
        class="text-xs"
        :class="
          isNegative ? 'text-red-500' : 'text-green-500'
        "
      >
        {{ formattedAmount }}
        {{ metadata?.symbol }}
      </span>
    </div>

    <div
      v-else-if="state.datum"
      :title="state.datum?.title"
      class="flex pl-4 justify-end space-x-2 items-center"
    >
      <div>
        <img
          loading="lazy"
          :src="state.datum?.assetUrl"
          class="w-[45px] h-[45px] rounded-[8px]"
        />
      </div>

      <div class="w-[120px]">
        <span
          v-text="state.datum?.title"
          class="text-xxs text-font-1 line-clamp-2"
        />
      </div>
    </div>
  </div>
</template>
