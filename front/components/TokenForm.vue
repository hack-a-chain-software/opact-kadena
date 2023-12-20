<script setup lang="ts">
import { reactive } from 'vue'

// const { step } = useForm()

const data = reactive({
  token: {
    symbol: '',
    address: '',
    decimals: ''
  }
})
</script>

<template>
  <div class="max-w-[450px] text-white">
    <div
      class="
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
        @click.prevent="step = 'amount'"
      >
        <Icon name="chevronLeft" class="h-6 w-6" />
      </button>

      <div>
        <h1 class="text-xs text-font-1 font-medium">
          Import token
        </h1>
      </div>
    </div>

    <div class="pt-6 space-y-6">
      <div>
        <label class="space-y-2">
          <span class="text-xxs font-medium text-font-1">
            Token Address
          </span>

          <input
            v-model="data.token.address"
            placeholder="Ax..."
            class="
              p-4
              w-full
              text-xs
              rounded-[8px]
              text-font-1
              bg-transparent
              outline-none
              placeholder:text-font-2
              border-2 border-gray-700
            "
          />
        </label>
      </div>

      <div>
        <label class="space-y-2">
          <span class="text-xxs font-medium text-font-1">
            Token Symbol
          </span>

          <input
            v-model="data.token.symbol"
            placeholder="XWY"
            class="
              p-4
              w-full
              text-xs
              rounded-[8px]
              text-font-1
              bg-transparent
              outline-none
              placeholder:text-font-2
              border-2 border-gray-700
            "
          />
        </label>
      </div>

      <div>
        <label class="space-y-2">
          <span class="text-xxs font-medium text-font-1">
            Token Decimal
          </span>

          <input
            v-model="data.token.decimals"
            placeholder="00"
            class="
              p-4
              w-full
              text-xs
              rounded-[8px]
              text-font-1
              bg-transparent
              outline-none
              placeholder:text-font-2
              border-2 border-gray-700
            "
          />
        </label>
      </div>
    </div>

    <div class="pt-[340px]">
      <button
        @click.prevent="step = 'amount'"
        :disabled="
          !data.token.address ||
          !data.token.symbol ||
          !data.token.decimals
        "
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
          !data.token.address ||
          !data.token.symbol ||
          !data.token.decimals
            ? 'bg-gray-700'
            : 'bg-blue-gradient'
        "
      >
        <span class="text-font-1"> Import </span>
      </button>
    </div>
  </div>
</template>
