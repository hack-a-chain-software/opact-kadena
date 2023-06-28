<script setup lang="ts">
import { computed } from 'vue'
import { toggleMenuDropdown } from '../../composables/state'
const config = useAppConfig()
const current = useCurrentDropdown()
const showMenuDropdown = useMenuDropdown()

const route = computed(() => {
  return config.routes.find(({ key }) => key === current.value)
})
</script>

<template>
  <div
    v-if="showMenuDropdown && current && route"
    v-motion-pop
    class="
      rounded-lg
      bg-[rgba(16,_20,_24,_0.88)]
      backdrop-blur-[4px]
      lg:bg-dark-blue/[0.42] lg:backdrop-blur-[6px]
      text-white
      flex
      space-x-[24px]
      px-[30px]
      py-4
      max-w-max
      overflow-hidden
    "
    @mouseleave="toggleMenuDropdown()"
  >
    <div
      v-for="{ label, to } in route.subroutes"
      :key="'menu-dropdown-current-' + current + to"
    >
      <NuxtLink
        :to="to"
        class="
          text-[16px]
          font-title
          font-[500]
          leading-[150%]
        "
        v-text="label"
      />
    </div>
  </div>
</template>
