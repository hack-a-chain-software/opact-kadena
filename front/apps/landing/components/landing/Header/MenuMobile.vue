<script setup lang="ts">
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem
} from '@headlessui/vue'

interface NavigationItem {
  to: string;
  title: string;
}

defineProps<{
  navigation: NavigationItem[];
}>()

const moveTo = (id: string) => {
  const element = document.getElementById(id)

  if (!element) {
    return
  }

  const bodyRect = document.body.getBoundingClientRect()

  const elemRect = element.getBoundingClientRect()

  const offset = elemRect.top - bodyRect.top

  scrollTo({
    top: offset - 74,
    behavior: 'smooth'
  })
}
</script>

<template>
  <Menu
    as="div"
  >
    <MenuButton v-slot="{ open }">
      <LandingAssetsClose
        v-if="open"
      />

      <LandingAssetsMenu
        v-else
      />
    </MenuButton>

    <MenuItems
      class="
        p-4
        left-0
        absolute
        w-full
        divide-y
        divide-white/[0.32]
        rounded-b-[12px]
        bg-dark-blue
      "
    >
      <div
        class="
          mb-4
          max-h-[104px]
          flex flex-wrap
        "
      >
        <MenuItem
          v-for="{ title, to } in navigation"
          :key="`mobile-menu-item-${to}`"
          as="div"
          class="max-w-[130px] h-[24px] w-full mb-4"
        >
          <a
            role="button"
            class="text-base-xs font-title text-white"
            @click="moveTo(to)"
          >
            {{ title }}
          </a>
        </MenuItem>
      </div>

      <MenuItem
        as="div"
        class="text-white pt-4 flex items-start"
      >
        <div
          class="flex flex-col"
        >
          <h3
            class="text-xs-poppins font-title mb-3"
          >
            Community
          </h3>

          <div
            class="flex space-x-4 mb-6"
          >
            <LandingAssetsTwitter />
            <LandingAssetsDiscord />
            <LandingAssetsGithub />
          </div>

          <LandingButton
            :with-icon="true"
            variant="primary"
          >
            <span>
              Louch App
            </span>

            <LandingAssetsArrow />
          </LandingButton>
        </div>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>
