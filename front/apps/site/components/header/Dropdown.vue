<script setup lang="ts">
import { computed } from 'vue'
const config = useAppConfig()
const current = useCurrentDropdown()
const showMenuDropdown = useMenuDropdown()
const currentMenuElement = useCurrentMenuElement()

const route = computed(() => {
  return config.routes.find(
    ({ key }) => key === current.value
  )
})

const items = computed(() => {
  return config.routes.filter(({ subroutes, component }) => !!subroutes || !!component)
})

const left = computed(() => {
  return items.value.slice(0, currentMenuElement.value.order - 1).reduce(
    (sum, curr) => {
      const width = (curr.width || 0)

      return sum + width
    }, 0
  ) + 'px'
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
      overflow-hidden
      transition-all
      duration-[300ms]
    "
    :style="`width: ${currentMenuElement.width}px; height: ${currentMenuElement.height}px`"
    @mouseleave="toggleMenuDropdown()"
  >
    <div
      v-for="{ width, height, component, subroutes, key } in items"
      :key="'subroutes:key:' + key"
      class="relative flex transition-all duration-[300ms]"
      :style="`transform: translateX(-${left})`"
    >
      <div
        v-if="subroutes"
        :style="`width: ${width}px; height: ${height}px`"
        class="flex justify-between px-[30px] py-4"
      >
        <div
          v-for="({ label, to }, i) in subroutes"
          :key="'menu-dropdown-current-' + current + to + i + key"
        >
          <NuxtLink
            :to="to"
            class="
              font-title
              text-white
              hover:opacity-80
              text-[16px]
              font-[400]
              leading-[150%]
            "
            v-text="label"
          />
        </div>
      </div>

      <HeaderBlogMenu
        key="foo"
        v-if="component"
      />
    </div>
  </div>
</template>
