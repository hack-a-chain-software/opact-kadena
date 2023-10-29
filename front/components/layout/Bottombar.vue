<script setup lang="ts">
// import { reactive } from 'vue'

// const data = reactive({
//   showSettings: false
// })
</script>

<template>
  <div
    class="
      lg:hidden
      py-3
      z-[999999999]
      fixed
      bottom-0
      left-0
      right-0
      flex
      px-[61px]
      justify-between
      bg-dark-blue
      border-t-[0.5px] border-[#5F6267]
    "
  >
    <button class="space-y-[4px]">
      <div>
        <Icon name="wallet" class="text-blue-400 w-6 h-6" />
      </div>

      <div>
        <span class="text-blue-400 text-xxxs font-medium">
          Home
        </span>
      </div>
    </button>

    <button
      disabled
      class="space-y-1 opacity-[0.5] cursor-not-allowed"
    >
      <div>
        <Icon name="chart" class="text-font-1 w-6 h-6" />
      </div>

      <div>
        <span class="text-font-1 text-xxxs font-medium">
          History
        </span>
      </div>
    </button>

    <button
      disabled
      class="space-y-1 opacity-[0.5] cursor-not-allowed"
    >
      <div>
        <Icon name="Settings" class="text-font-1 w-6 h-6" />
      </div>

      <div>
        <span class="text-font-1 text-xxxs font-medium">
          Settings
        </span>
      </div>
    </button>
  </div>
</template>
