<script setup lang="ts">
import Eth from './Assets/Eth.vue'
import Near from './Assets/Near.vue'
import Kadena from './Assets/Kadena.vue'

defineProps<{
  chain: 'eth' | 'near' | 'kadena';
}>()

const chains = {
  eth: {
    label: 'Ethereum',
    icon: Eth
  },
  near: {
    label: 'Near',
    icon: Near
  },
  kadena: {
    label: 'Kadena',
    icon: Kadena
  }
}
</script>

<template>
  <div
    class="
      group
      hover:w-auto
      cursor-pointer
      hover:px-[12px]
      w-[40px]
      h-[40px]
      overflow-hidden
      rounded-full
      flex
      items-center
      justify-center
      border border-[#F4F4F5]
      sm:w-[48px] sm:h-[48px]
      lg:w-[48px] lg:h-[48px]
    "
  >
    <component :is="chains[chain].icon" />

    <span
      class="
        hidden
        group-hover:inline
        text-[16px]
        font-[500]
        leading-[24px]
        text-white
        pl-[8px]
      "
    >
      {{ chains[chain].label }}
    </span>
  </div>
</template>
