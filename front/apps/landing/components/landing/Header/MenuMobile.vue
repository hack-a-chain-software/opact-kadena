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
  <Menu as="div" class="lg:hidden">
    <MenuButton
      v-slot="{ open }"
      as="div"
      class="flex items-center justify-center h-full"
    >
      <LandingAssetsClose v-if="open" />

      <LandingAssetsMenu v-else />
    </MenuButton>

    <MenuItems
      class="
        p-4
        px-0
        left-1/2
        -translate-x-1/2
        top-[100%]
        absolute
        w-full
        rounded-b-[12px]
        outline-none
        bg-[rgba(16,_20,_24,_0.88)]
        backdrop-blur-[4px]
        lg:bg-dark-blue/[0.42] lg:backdrop-blur-[6px]
      "
    >
      <div
        class="
          px-4
          mx-auto
          w-screen
          max-w-[420px]
          sm:max-w-[640px] sm:px-8
          md:max-w-[768px]
          divide-y divide-white/[0.32]
        "
      >
        <div
          class="
            mb-4
            max-h-[104px]
            flex flex-wrap
            sm:space-x-[12px]
          "
        >
          <MenuItem
            v-for="{ title, to } in navigation"
            :key="`mobile-menu-item-${to}`"
            as="div"
            class="
              max-w-[130px]
              sm:max-w-max
              h-[24px]
              w-full
              mb-4
              sm:mb-0
            "
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
          <div class="flex flex-col">
            <h3
              class="
                text-xs-poppins
                sm:text-base-xs
                font-title
                mb-3
              "
            >
              Community
            </h3>

            <div class="flex space-x-4 mb-6">
              <LandingAssetsTwitter />
              <LandingAssetsDiscord />
              <LandingAssetsGithub />
            </div>

            <LandingButton
              :with-icon="true"
              variant="primary"
              class="sm:h-[36px]"
            >
              <span> Louch App </span>

              <LandingAssetsArrow />
            </LandingButton>
          </div>
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
</template>
