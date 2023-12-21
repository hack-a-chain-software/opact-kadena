<script setup lang="ts">
import { computed } from 'vue'
import BlogMenu from './widgets/BlogMenu.vue'
import Subroutes from './widgets/Subroutes.vue'
import { Subroute, WidgetRoute } from '~/config'
const config = useAppConfig()
const current = useCurrentMenu()
const showMenu = useShowMenu()

const items = computed(
  () =>
    config.routes.filter(({ type }) => type !== 'link') as (
      | WidgetRoute
      | Subroute
    )[]
)

const widgets = computed(() => ({
  blog: BlogMenu,
  subroutes: Subroutes
})) as any

const left = computed(() => {
  return (
    items.value
      .slice(0, current.value.order - 1)
      .reduce((sum, curr) => {
        const width = curr.width || 0

        return sum + width
      }, 0) + 'px'
  )
})
</script>

<template>
  <div
    v-if="showMenu && current"
    v-motion-pop
    class="
      rounded-lg
      bg-[rgba(16,_20,_24,_0.88)]
      backdrop-blur-[4px]
      lg:bg-dark-blue/[0.42] lg:backdrop-blur-[6px]
      text-white
      flex
      overflow-hidden
      transition-all
      duration-[300ms]
    "
    :style="`width: ${current.width}px; height: ${current.height}px`"
    @mouseleave="handleMenuState()"
  >
    <div
      v-for="route in items"
      :key="'subroutes:key:' + route.key"
      :style="`transform: translateX(-${left})`"
      class="relative flex transition-all duration-[300ms]"
    >
      <component
        :is="widgets[route.widget]"
        :route="route"
        :current="current"
      />
    </div>
  </div>
</template>
