<script lang="ts" setup>
import { reactive } from 'vue'

const data = reactive({
  key: 0
})
</script>

<template>
  <div class="min-h-[100vh] min-h-screen overflow-hidden">
    <div
      class="
        min-h-[72px]
        px-[90px]
        items-center
        bg-[#060A0F]
        z-[12]
        hidden
        absolute
        w-full
        border-b border-b-gray-600
        lg:flex
      "
    >
      <button @click.prevent="data.key++">
        <Icon
          name="logo"
          class="text-white w-[163px] h-[32px]"
        />
      </button>
    </div>

    <div
      class="
        absolute
        z-[-10]
        w-full
        hidden
        h-[520px]
        lg:block
      "
    >
      <img src="/images/nav-bg.png" class="w-full h-[520px]" />
    </div>

    <div
      class="
        px-4
        lg:px-0
        overflow-x-clip
        relative
        z-[2]
        h-full
      "
    >
      <slot :key="data.key" />
    </div>
  </div>
</template>

<style>
body {
  background-color: #060a0f;
}
</style>
