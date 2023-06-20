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
      hover:w-[200px]
      px-[12px]
      max-w-max
      cursor-pointer
      w-[40px]
      h-[40px]
      overflow-hidden
      rounded-full
      flex
      items-center
      border border-[#F4F4F5]
      sm:w-[48px] sm:h-[48px]
      lg:min-w-[48px] lg:h-[48px]
      opact-blockchain
    "
  >
    <component
      :is="chains[chain].icon"
      class="shrink-0 w-[24px]"
    />

    <span
      class="
        opact-blockchain__text
        w-0
        flex
        max-w-max
        group-hover:w-[78px]
        text-[16px]
        font-[500]
        leading-[24px]
        text-white
        overflow-hidden
      "
    >
      {{ chains[chain].label }}
    </span>
  </div>
</template>

<style scoped>
.opact-blockchain__text {
  transition: width 1s ease-out;
}
.opact-blockchain {
  transition-delay: 1s;
}
.opact-blockchain:hover {
  transition-delay: 0s;
}
</style>
