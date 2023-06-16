<script setup lang="ts">
import Eth from './Assets/Eth.vue'
import Near from './Assets/Near.vue'
import Kadena from './Assets/Kadena.vue'

defineProps<{
  chain: 'eth' | 'near' | 'kadena';
}>()

const chains = {
  eth: {
    label: 'Eth',
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
      w-[40px]
      h-[40px]
      overflow-hidden
      rounded-full
      flex
      items-center
      justify-center
      border border-[#F4F4F5]

      sm:w-[48px]
      sm:h-[48px]
    "
  >
    <component :is="chains[chain].icon" />
  </div>
</template>
