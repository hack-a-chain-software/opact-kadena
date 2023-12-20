<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'

withDefaults(
  defineProps<{
    icon?: string
    label?: string
  }>(),
  {
    icon: 'user',
    label: 'Account'
  }
)
</script>

<template>
  <Menu as="div" class="relative inline-block text-left" v-slot="{ open }">
    <div>
      <MenuButton
        class="
          w-[144px]
          bg-gray-900
          rounded-lg
          border
          py-2
          pr-3
          h-11
          pl-4
          items-center justify-center
          flex gap-2
        "
        :class="open ? 'border-blue-400' : 'border-gray-600'"
      >
        <div
          class="p-1 rounded-[4px] bg-gray-800 h-7 w-7 flex items-center justify-center"
        >
          <Icon
            :name="icon"
            class="w-5 h-5"
          />
        </div>

        <span
          v-text="label"
          class="text-font-1 text-xxs leading-[19.6px]"
        />

        <div
          class="flex items-center justify-center"
        >
          <Icon :name="open ? 'close' : 'chevron'" :class="open ? 'text-blue-400' : 'text-font-1'" />
        </div>
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
          border border-gray-600
        "
      >
        <slot />
      </MenuItems>
    </transition>
  </Menu>
</template>
