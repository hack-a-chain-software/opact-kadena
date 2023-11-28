<script setup lang="ts">
import { Subroute } from '~/config'

defineProps<{
  route: Subroute;
  current: any;
}>()
</script>

<template>
  <div
    :style="`width: ${route.width}px; height: ${route.height}px`"
    class="flex justify-between px-[30px] py-4"
  >
    <div
      v-for="({ label, to }, i) in route.subroutes"
      :key="
        'menu-dropdown-current-' +
        current +
        to +
        i +
        route.key
      "
    >
      <NuxtLink
        :to="to"
        class="
          font-title
          text-white
          hover:opacity-80
          text-base
          font-normal
          leading-normal
        "
        v-text="label"
      />
    </div>
  </div>
</template>
