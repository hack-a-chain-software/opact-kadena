<script lang="ts" setup>
import { reactive, onBeforeMount, computed } from 'vue'
import {
  getDecimals,
  formatBigNumberWithDecimals
} from 'opact-sdk'
import { useAppState } from '~/hooks/state'

const { userData } = useAppState()

const router = useRouter()

const data = reactive({
  tab: 'tokens',
  kdxInDolar: 0,
  visible: true,
  kadenaInDolar: 0,
  showReceiveModal: false
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
      userData.value?.tokens.coin?.balance || 0,
      decimals
    ) as any) *
      data.kadenaInDolar +
    (formatBigNumberWithDecimals(
      userData.value?.tokens['opact-coin']?.balance || 0,
      decimals
    ) as any) *
      data.kdxInDolar
  ).toFixed(2)
})
</script>

<template>
  <div class="h-full lg:row-span-full">
    <div
      class="
        lg:h-auto
        lg:p-6
        lg:bg-gray-900
        lg:w-full
        lg:border-2
        lg:border-gray-600
        lg:rounded-[12px]
      "
    >
      <div class="flex justify-between">
        <div>
          <div class="pb-[2px]">
            <span class="text-font-2 text-xxs font-medium">
              Balance
            </span>
          </div>

          <div class="flex items-center space-x-4">
            <div v-if="data.visible">
              <span class="text-lg font-medium text-font-1">
                {{ balance }} USD
              </span>
            </div>

            <div v-else>
              <span class="text-lg font-medium text-font-1">
                ***** USD
              </span>
            </div>

            <button
              class="text-white hover:text-blue-400"
              @click.prevent="data.visible = !data.visible"
            >
              <Icon name="visible" class="w-6 h-6" />
            </button>
          </div>
        </div>

        <div class="mt-auto lg:hidden">
          <button
            disabled
            class="
              text-blue-300
              flex
              items-center
              justify-center
              space-x-2
              opacity-[0.5]
              cursor-not-allowed
            "
          >
            <span class="font-xs font-regular">
              History
            </span>

            <div>
              <Icon
                name="chevron"
                class="w-5 h-5 rotate-[-90deg]"
              />
            </div>
          </button>
        </div>
      </div>

      <div
        class="lg:hidden pt-[24px] gap-2 grid grid-cols-3"
      >
        <button
          class="bg-gray-800 rounded-[8px] py-3 px-4"
          @click.prevent="router.push('/send/token')"
        >
          <div class="pb-2">
            <Icon name="send" class="w-6 h-6" />
          </div>

          <div>
            <span class="text-xxs font-medium text-font-1">
              Send
            </span>
          </div>
        </button>

        <button
          class="bg-gray-800 rounded-[8px] py-3 px-4"
          @click.prevent="data.showReceiveModal = true"
        >
          <div class="pb-2">
            <Icon name="receive" class="w-6 h-6" />
          </div>

          <div>
            <span class="text-xxs font-medium text-font-1">
              Receive
            </span>
          </div>
        </button>

        <button
          class="bg-gray-800 rounded-[8px] py-3 px-4"
          @click.prevent="router.push('/deposit')"
        >
          <div class="pb-2">
            <Icon name="add" class="w-6 h-6 text-font-1" />
          </div>

          <div>
            <span class="text-xxs font-medium text-font-1">
              Deposit
            </span>
          </div>
        </button>
      </div>

      <div class="pt-[24px] lg:pt-8 flex space-x-[24px]">
        <button
          :class="
            data.tab === 'tokens' &&
            'border-b-[1px] border-blue-400 !opacity-100'
          "
          class="px-2 pb-2 opacity-[0.5]"
          @click.prevent="data.tab = 'tokens'"
        >
          <span class="text-sm font-medium text-font-1">
            Tokens
          </span>
        </button>

        <button
          :class="
            data.tab === 'nfts' &&
            'border-b-[1px] border-blue-400 !opacity-100'
          "
          class="px-2 pb-2 opacity-[0.5]"
          @click.prevent="data.tab = 'nfts'"
        >
          <span class="text-sm font-medium text-font-1">
            NFTs
          </span>
        </button>
      </div>

      <div
        v-if="data.tab === 'tokens'"
        class="pt-[16px] space-y-3"
      >
        <div
          v-if="Object.keys(userData.tokens).length > 0"
          class="space-y-3"
        >
          <TokensItem
            :address="key"
            :token="tree.token"
            :balance="tree.balance"
            v-for="(tree, key) of userData.tokens"
            :key="`${
              tree.token.id
            }-${tree.balance.toString()}`"
          />
        </div>

        <div
          v-else
          class="
            flex
            justify-center
            py-[32px]
            flex-col
            items-center
            space-y-4
          "
        >
          <div>
            <img
              src="/empty-tokens.png"
              class="w-[218px]"
            />
          </div>

          <span class="text-font-2 text-[18px] font-[600]">
            You don't have Tokens yet.
          </span>
        </div>
      </div>

      <div v-else class="pb-[90px] lg:pb-0">
        <div
          v-if="Object.keys(userData.nfts).length > 0"
          class="
            grid grid-cols-2
            gap-3
            pt-3
            lg:grid-cols-3
            xl:grid-cols-3
          "
        >
          <NftItem
            :id="utxo.id"
            :key="utxo.hash"
            v-for="utxo of userData.nfts[
              'poly-fungible-v2-reference'
            ].utxos"
          />
        </div>

        <div
          v-else
          class="
            flex
            justify-center
            py-[32px]
            flex-col
            items-center
            space-y-4
          "
        >
          <div>
            <img
              src="/empty-tokens.png"
              class="w-[218px]"
            />
          </div>

          <span class="text-font-2 text-[18px] font-[600]">
            You don't have Tokens yet.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
