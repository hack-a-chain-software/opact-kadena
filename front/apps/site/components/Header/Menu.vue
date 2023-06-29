<script setup lang="ts">
const config = useAppConfig()
const showMenuDropdown = useMenuDropdown()
const currentDropdown = useCurrentDropdown()
const currentMenuElement = useCurrentMenuElement()

const toggleDropdown = (height: number, width: number, order: number, flag: boolean, key?: string) => {
  currentDropdown.value = key || ''
  showMenuDropdown.value = flag
  currentMenuElement.value = {
    width,
    height,
    order
  }
}
</script>

<template>
  <div class="hidden lg:flex px-[40px]">
    <div class="flex space-x-[40px] items-center">
      <template
        v-for="{
          label,
          to,
          subroutes,
          component,
          key,
          height,
          width,
          order,
        } in config.routes"
        :key="key"
      >
        <NuxtLink
          v-if="!subroutes && !component"
          class="
            font-title
            text-white
            hover:opacity-80
            text-[16px]
            font-[400]
            leading-[150%]
          "
          :to="to"
          @mouseenter="showMenuDropdown = false"
        >
          {{ label }}
        </NuxtLink>

        <div
          v-else
          :class="key === currentDropdown && 'opacity-80'"
        >
          <a
            class="
              font-title
              text-white
              hover:opacity-80
              text-[16px]
              font-[400]
              leading-[150%]
            "
            role="button"
            @mouseenter="toggleDropdown(height || 0, width || 0, order || 0, true, key)"
          >
            {{ label }}
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
              key === currentDropdown &&
              '!ml-[8px] !w-[16px]'
            "
          />
        </div>
      </template>
    </div>
  </div>
</template>
