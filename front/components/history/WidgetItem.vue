<script lang="ts" setup>
import {
  kadenaTokens as tokens,
  shortenAddress,
  formatBigNumberWithDecimals,
  getDecimals
} from 'opact-sdk'
import { computed, reactive } from 'vue'

const icons = {
  withdraw: 'receiptSend',
  deposit: 'receiptReceive',
  transfer: ''
}

const props = withDefaults(
  defineProps<{
    id: any;
    pubkey: any;
    address: any;
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

const state = reactive({
  datum: null
})

const icon = computed(() => {
  if (props.type === 'transfer') {
    return props.receiver === props.pubkey
      ? 'receiptReceive'
      : 'receiptSend'
  }

  return icons[props.type]
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
        class="
          flex
          px-4
          py-3
          bg-gray-800
          rounded-[8px]
          items-center
        "
      >
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

        <div>
          <span
            class="text-font-1 text-xs capitalize"
            v-text="props.type"
          />

          <div>
            <span
              v-text="shortenAddress(type === 'withdraw' ? receiver as string : sender as string)"
              class="text-xxs text-font-2"
            />
          </div>
        </div>

        <div
          class="ml-auto"
          v-if="address !== 'poly-fungible-v2-reference'"
        >
          <span
            class="text-xs text-green-500"
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
          class="
            flex
            pl-4
            justify-end
            space-x-2
            ml-auto
            items-center
          "
        >
          <div>
            <img
              loading="lazy"
              :src="state.datum?.assetUrl"
              class="w-[45px] h-[45px] rounded-[8px]"
            />
          </div>

          <div class="w-[80px] line-clamp-2 text-font-1">
            <span
              v-text="state.datum?.title"
              class="text-xxs text-font-1"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
