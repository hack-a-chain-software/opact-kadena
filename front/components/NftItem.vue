<script lang="ts" setup>
import { reactive } from 'vue'

const data = reactive({
  token: null
})
</script>

<template>
  <div
    class="
      lg:max-w-[204px]
      pb-4
      px-2
      pt-2
      rounded-[8px]
      bg-gray-800
    "
  >
    <div
      class="
        w-full
        aspect-square
        max-h-max
        overflow-hidden
        flex
        items-center
        justify-center
        max-h-[180px]
        rounded-[8px]
      "
    >
      <img
        v-if="data.token"
        :src="data.token?.uri"
        class="rounded-[8px] mx-auto"
      />
    </div>

    <div class="pt-3" v-if="data.token">
      <span class="text-font-1 text-xxs">
        {{ data?.token?.name || '' }}
      </span>
    </div>
  </div>
</template>
