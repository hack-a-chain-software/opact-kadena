<script setup lang="ts">
import { reactive } from 'vue'

const data = reactive({
  showSettings: false
})
</script>

<template>
  <div
    class="
      lg:hidden
      h-[60px]
      px-6
      flex
      justify-between
      items-center
    "
  >
    <div
      class="
        absolute
        top-0
        left-0
        w-full
        flex
        items-end
        justify-center
        h-[138px]
        overflow-visible
        z-[0]
      "
    >
      <div
        class="
          w-[328px]
          h-[200px]
          bg-[#7549D1]
          relative
          bottom-[108px]
          rounded-[100%]
          blur-[100px]
        "
      />
    </div>

    <div class="relative z-[1]">
      <img src="/mini-logo.svg" class="w-[30px] h-[30px]" />
    </div>

    <div class="relative z-[1]">
      <button
        class="
          flex
          items-center
          justify-center
          rounded-[30px]
          h-[38px]
          w-[74px]
          bg-gray-900
          border border-gray-600
        "
      >
        <span class="text-xxxs font-medium text-font-1">
          Faucet
        </span>
      </button>
    </div>

    <div class="relative z-[1]">
      <button
        class="
          rounded-full
          bg-gray-900
          w-9
          h-9
          flex
          items-center
          border border-gray-600
          justify-center
        "
        @click.prevent="data.showSettings = true"
      >
        <Icon
          name="iconSettings"
          class="w-5 h-5 text-font-1"
        />
      </button>
    </div>

    <Settings
      :show="data.showSettings"
      @close="data.showSettings = false"
    />
  </div>
</template>
