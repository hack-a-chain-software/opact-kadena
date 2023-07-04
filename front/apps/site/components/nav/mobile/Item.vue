<script setup lang="ts">
import { Route, Subroute } from '~/config'

defineProps<{
  route: Route;
}>()
</script>

<template>
  <div>
    <div
      v-if="
        route.type === 'widget' &&
        route.widget === 'subroutes'
      "
      class="text-white overflow-hidden"
      @click.stop
    >
      <!-- <Accordion />  -->
      <Collapsible
        :title="route.label"
        :subroutes="(route as Subroute).subroutes"
      />
    </div>

    <div v-else>
      <a
        role="button"
        class="
          text-white
          font-tile
          text-lg
          font-medium
          leading-normal
          opacity-[0.8999999761581421]
        "
        href="#"
        v-text="route.label"
      />
    </div>
  </div>
</template>
