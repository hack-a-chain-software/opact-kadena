<script setup lang="ts">
const config = useAppConfig()
const showMenu = useShowMenu()
const currentMenu = useCurrentMenu()
</script>

<template>
  <div class="hidden lg:flex px-10">
    <div class="flex space-x-10 items-center">
      <template
        v-for="route in config.routes"
        :key="route.key"
      >
        <NuxtLink
          v-if="route.type === 'link'"
          class="
            font-title
            text-white
            hover:opacity-80
            text-base
            font-normal
            leading-normal
          "
          :to="route.to"
          @mouseenter="showMenu = false"
        >
          {{ route.label }}
        </NuxtLink>

        <div
          v-else
          :class="
            route.key === currentMenu?.key && 'opacity-80'
          "
        >
          <a
            class="
              font-title
              text-white
              hover:opacity-80
              text-base
              font-normal
              leading-normal
            "
            :href="route.to"
            role="button"
            @mouseenter="handleMenuState(route, true)"
          >
            {{ route.label }}
          </a>

          <Icon
            name="chevron"
            class="
              text-white
              h-[16px]
              w-0
              shrink-0
              z-[2]
              relative
              duration-[0.3s]
              translate-y-[-13%]
            "
            :class="
              route.key === currentMenu?.key &&
              '!ml-[8px] !w-[16px]'
            "
          />
        </div>
      </template>
    </div>
  </div>
</template>
