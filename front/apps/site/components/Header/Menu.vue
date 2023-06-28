<script setup lang="ts">
const config = useAppConfig()
const showMenuDropdown = useMenuDropdown()
const currentDropdown = useCurrentDropdown()

const toggleDropdown = (flag: boolean, key?: string) => {
  currentDropdown.value = key || ''
  showMenuDropdown.value = flag
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
          key,
        } in config.routes"
        :key="key"
      >
        <NuxtLink
          v-if="!subroutes"
          class="
            lg:font-[200] lg:text-[16px] lg:leading-[24px]
            font-title
            text-white
            hover:opacity-80
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
              lg:font-[200] lg:text-[16px] lg:leading-[24px]
              font-title
              text-white
            "
            role="button"
            @mouseenter="toggleDropdown(true, key)"
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
