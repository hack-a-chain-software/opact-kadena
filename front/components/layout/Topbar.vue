<script setup lang="ts">
import { Menu, MenuItem, MenuButton, MenuItems } from '@headlessui/vue'

const route = useRoute()

const titles = {
  home: 'Home',
  history: 'History',

  'send-nft': 'Send NFT',
  'send-token': 'Send Token',

  'receive-nft': 'Receive NFT',
  'receive-token': 'Receive Token'
}
</script>

<template>
  <div
    class="
      absolute
      right-0
      h-[64px]
      px-8
      items-center
      w-[calc(100%-115px)]
      xl:w-[calc(100%-260px)]
      z-[10]
      hidden
      lg:flex
      justify-between
    "
    :class="
      route.name === 'home'
        ? 'bg-[rgba(6,_10,_15,_0.48)]'
        : 'bg-[rgba(6,_10,_15,_0.80)]'
    "
  >
    <div>
      <span
        class="text-font-1 text-md"
        v-text="titles[route.name]"
      />
    </div>

    <div
      class="flex items-center justify-center gap-4"
    >
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton>
            <span
              class="text-xxs text-font-1 hover:text-blue-400 flex items-center justify-center gap-1"
            >
              Provide us feedback or talk to support!

              <Icon
                name="arrow"
                class="w-4 h-4"
              />
            </span>
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="
              p-4
              right-0
              absolute
              mt-[20px]
              rounded-lg
              bg-gray-900
              space-y-2
              flex flex-col
              border border-gray-600
            "
          >
            <MenuItem v-slot="{ active }">
              <a
                target="_blank"
                class="text-font-1"
                :class='{ "!text-blue-400": active }'
                href="https://app.pipefy.com/public/form/ZG6fEnZq"
              >
                Support
              </a>
            </MenuItem>

            <MenuItem
              v-slot="{ active }"
            >
              <a
                target="_blank"
                class="text-font-1"
                :class='{ "!text-blue-400": active }'
                href="https://app.pipefy.com/public/form/5SYC1W0c"
              >
                Feedback
              </a>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>

      <HomeAccount/>
    </div>
  </div>

  <div
    class="
      absolute
      z-[0]
      w-full
      hidden
      lg:block
      min-w-[1920px]
      select-none
      pointer-events-none
    "
  >
    <img
      lazy
      src="/images/nav-bg.png"
      class="w-full w-full max-h-[319px]"
    />
  </div>
</template>
