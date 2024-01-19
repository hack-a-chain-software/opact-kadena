<script lang="ts" setup>
import { computed } from 'vue'
import {
  getDecimals,
  kadenaTokens as tokens,
  formatBigNumberWithDecimals
} from 'opact-sdk'

const props = withDefaults(
  defineProps<{
    address: any;
    balance: any;
    token: any;
    kdxInDolar: number;
    kadenaInDolar: number;
  }>(),
  {
    kdxInDolar: 0,
    kadenaInDolar: 0
  }
)

const formattedAmount = computed(() => {
  const decimals = getDecimals(12)

  return formatBigNumberWithDecimals(
    props.balance,
    decimals
  )
})

const metadata = computed(() => {
  return (
    tokens.find(
      ({ namespace }: any) =>
        namespace.refName.name === props.address
    ) || {}
  )
})

const balance = computed(() => {
  const decimals = getDecimals(12)

  return (
    (formatBigNumberWithDecimals(
      props.balance || 0,
      decimals
    ) as any) *
    (props.address === 'coin'
      ? props.kadenaInDolar
      : props.kdxInDolar)
  ).toFixed(2)
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
      <img :src="metadata.icon.replace('https://opact.io/', '')" />
    </div>

    <div class="space-y-1">
      <p
        class="
          text-xs
          font-regular
          opacity-[0.9]
          text-font-1
        "
        v-text="metadata.symbol"
      />

      <p
        class="
          text-font-2 text-xxs
          font-medium
          opacity-[0.9]
        "
      >
        $ {{ balance }}
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
