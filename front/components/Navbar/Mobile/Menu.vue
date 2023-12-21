<script setup lang="ts">
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem
} from '@headlessui/vue'

const config = useAppConfig()

const redirect = (path = 'https://tickets.opact.io') => {
  window.open(path, '_blank')
}

// const moveTo = (id: string) => {
//   const element = document.getElementById(id)

//   if (!element) {
//     return
//   }

//   const bodyRect = document.body.getBoundingClientRect()

//   const elemRect = element.getBoundingClientRect()

//   const offset = elemRect.top - bodyRect.top

//   scrollTo({
//     top: offset - 74,
//     behavior: 'smooth'
//   })
// }
</script>

<template>
  <Menu as="div" class="lg:hidden">
    <MenuButton
      v-slot="{ open }"
      as="div"
      class="flex items-center justify-center h-full"
    >
      <Icon v-if="open" name="close" class="w-6 h-6" />

      <Icon v-else name="menu" class="w-6 h-6" />
    </MenuButton>

    <MenuItems
      class="
        left-1/2
        -translate-x-1/2
        top-[100%]
        absolute
        w-full
        pt-[6px]
        rounded-b-[12px]
        outline-none
        bg-[rgba(16,_20,_24,_0.88)]
        backdrop-blur-[4px]
        lg:bg-dark-blue/[0.42] lg:backdrop-blur-[6px]
        px-[16px]
        sm:px-[32px]
        pb-6
      "
    >
      <div
        class="
          mx-auto
          w-screen
          divide-y divide-white/[0.32]
        "
      >
        <div class="mb-4 space-y-6 flex flex-wrap flex-col">
          <MenuItem
            v-for="route in config.routes"
            :key="`mobile-menu-item-${route.to}`"
            as="div"
            class="
              max-w-[130px]
              sm:max-w-max
              w-full
              mb-4
              sm:mb-0
            "
          >
            <NavbarMobileItem :route="route" />
          </MenuItem>
        </div>

        <MenuItem
          as="div"
          class="text-white pt-4 flex items-start"
        >
          <div class="flex flex-col">
            <h3
              class="
                text-[12px]
                font-title
                leading-normal
                mb-3
              "
            >
              Community
            </h3>

            <div class="flex space-x-4 mb-6">
              <Icon name="twitter" class="w-6 h-6" />

              <Icon name="discord" class="w-6 h-6" />

              <Icon name="github" class="w-6 h-6" />
            </div>

            <UIButton
              with-icon
              variant="nav"
              text="Launch App"
              @click="redirect"
              class="!h-[36px]"
            />
          </div>
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
</template>
