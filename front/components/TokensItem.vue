<script lang="ts" setup>
import { computed, reactive, onBeforeMount } from 'vue'
import {
  getDecimals,
  formatBigNumberWithDecimals
} from 'opact-sdk'
import { tokens } from '~/utils/constants'

const props = withDefaults(
  defineProps<{
    address: any;
    balance: any;
    token: any;
  }>(),
  {
    //
  }
)

const data = reactive({
  kdxInDolar: 0,
  kadenaInDolar: 0
})

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

onBeforeMount(async () => {
  let res = await fetch(
    'https://api.coingecko.com/api/v3/coins/kadena?x_cg_api_key=CG-HMVPj5jXZxnbPZetLezC3hZw'
  )

  let json = await res.json()

  data.kadenaInDolar = json.market_data.current_price.usd

  res = await fetch(
    'https://api.coingecko.com/api/v3/coins/kaddex?x_cg_api_key=CG-HMVPj5jXZxnbPZetLezC3hZw'
  )

  json = await res.json()

  data.kdxInDolar = json.market_data.current_price.usd
})

const balance = computed(() => {
  const decimals = getDecimals(12)

  return (
    (formatBigNumberWithDecimals(
      props.balance || 0,
      decimals
    ) as any) *
    (props.address === 'coin'
      ? data.kadenaInDolar
      : data.kdxInDolar)
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
      <img :src="metadata.icon" />
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
