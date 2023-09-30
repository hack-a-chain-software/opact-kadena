<script setup lang="ts">
import { reactive } from 'vue'

const router = useRouter()

const amounts = [1, 10, 100]

const data = reactive({
  amount: 0,
  show: false,
  token: {
    icon: '/kda.png',
    name: 'Kadena',
    symbol: 'KDA'
  },
  showGenerateLink: false
})
</script>

<template>
  <div
    class="
      flex flex-col
      justify-between
      pb-[32px]
      max-w-[450px]
      text-white
      min-h-[812px]
      lg:pb-0
      lg:min-h-full
      lg:max-w-full
    "
  >
    <div>
      <div
        class="
          lg:hidden
          w-full
          py-4
          flex
          justify-center
          relative
          items-center
        "
      >
        <button
          class="
            flex
            items-center
            space-x-[4px]
            h-6
            absolute
            top-4
            left-0
          "
          @click.prevent="router.push('/home')"
        >
          <Icon name="chevronLeft" class="h-6 w-6" />
        </button>

        <div>
          <h1 class="text-xs text-font-1 font-medium">
            Receive
          </h1>
        </div>
      </div>

      <div class="flex flex-col space-y-2 pt-[24px] lg:pt-0">
        <div>
          <h2 class="text-font-1 text-xxs font-medium">
            Enter or select amount
          </h2>
        </div>

        <div
          class="flex justify-between items-center space-x-1"
        >
          <input
            v-model="data.amount"
            class="
              h-[39px]
              bg-transparent
              text-xl
              font-semibold
              text-font-2
              outline-none
            "
          >

          <Icon
            name="pen"
            class="min-w-[24px] min-h-[24px] text-font-2 lg:invisible"
          />
        </div>
      </div>

      <div class="pt-6 space-x-2">
        <button
          v-for="amount in amounts"
          :key="amount"
          class="
            group
            active:border-blue-400
            border-[1.5px]
            border-gray-700
            p-3
            rounded-full
          "
          @click.prevent="data.amount = amount"
        >
          <span
            class="text-xxs group-active:text-blue-400 text-font-2 font-medium"
            v-text="amount"
          />
        </button>
      </div>

      <div class="pt-7">
        <div class="flex justify-between pb-2">
          <span class="text-xxs font-medium text-font-1">
            Select Token
          </span>
        </div>

        <button
          class="
            p-4
            flex
            w-full
            rounded-[8px]
            justify-between
            bg-gray-800
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
          disabled
          @click.prevent="data.show = true"
        >
          <div v-if="!data.token">
            <span class="text-font-2 text-xxs font-medium">
              Choose Token
            </span>
          </div>

          <div v-else class="space-x-2 flex items-center">
            <img :src="data.token.icon" class="w-6 h-6">

            <span v-text="data.token.name" />
          </div>

          <div>
            <Icon name="chevron" class="rotate-[-90deg]" />
          </div>
        </button>
      </div>
    </div>

    <div class="mt-full lg:mt-[40px]">
      <button
        :disabled="!data.token || !data.amount"
        class="
          w-full
          flex
          items-center
          justify-center
          h-[44px]
          py-3
          px-4
          rounded-[12px]
          relative
          disabled:cursor-not-allowed
        "
        :class="
          !data.token || !data.amount
            ? 'bg-gray-700'
            : 'bg-blue-gradient'
        "
        @click.prevent="data.showGenerateLink = true"
      >
        <span class="text-font-1">
          Generate payment link
        </span>
      </button>
    </div>

    <InvoiceGenerateLink
      :token="1"
      :amount="data.amount"
      :show="data.showGenerateLink"
      @close="data.showGenerateLink = false"
    />

    <SelectToken
      :show="data.show"
      @close="data.show = false"
      @select="data.token = token"
    />
  </div>
</template>
