<script setup lang="ts">
import { Route } from '~/config'

defineProps<{
  route: Route;
}>()
</script>

<template>
  <div>
    <NuxtLink
      role="button"
      class="
        text-white
        font-tile
        text-lg
        font-medium
        leading-normal
        opacity-[0.8999999761581421]
      "
      :to="route.to"
      v-text="route.label"
    />
  </div>
</template>
