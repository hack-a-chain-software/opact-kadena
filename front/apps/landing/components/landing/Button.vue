<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'

export interface Variant {
  parent: string;
  children: string;
}

export interface Variants {
  primary: Variant;
  secondary: Variant;
  tertiary: Variant;
}

const variants: Variants = {
  primary: {
    parent:
      'bg-opact-gradient p-[2px] inline-flex items-center justify-center h-[36px] sm:h-[48px]',
    children:
      'bg-dark-blue w-full h-full flex items-center justify-center'
  },
  secondary: {
    parent:
      'bg-white p-[2px] inline-flex items-center justify-center h-[36px] sm:h-[41px] sm:font-[500] sm:text-[16px] sm:leading-[20px]',
    children:
      'bg-white text-dark-blue w-full h-full flex items-center justify-center'
  },
  tertiary: {
    parent:
      'bg-card-gradient p-[2px] inline-flex items-center justify-center h-[36px] sm:h-[48px]',
    children:
      'bg-inverted-card-gradient w-full h-full flex items-center justify-center'
  }
}

const props = defineProps({
  type: {
    type: String,
    default: undefined
  },
  withIcon: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String as PropType<
      'primary' | 'secondary' | 'tertiary'
    >,
    default: 'primary',
    validator: (v: string) =>
      ['primary', 'secondary', 'tertiary'].includes(v)
  },
  to: {
    type: [String, Object],
    default: undefined
  },
  href: {
    type: String,
    default: undefined
  }
})

const tag = computed(() =>
  props.to ? 'nuxt-link' : props.href ? 'a' : 'button'
)
</script>

<template>
  <div
    :class="variants[variant].parent"
    class="
      text-white rounded-[100px]
    "
  >
    <component
      :is="tag"
      :to="to"
      :href="href"
      :type="type"
      :class="variants[variant].children"
      class="
        pl-[22px] pr-[14px] rounded-[100px]

        sm:pl-[24px]

        sm:text-[18px]
        sm:font-[500]
        sm:leading-[27px]
      "
    >
      <div
        class="
          flex items-center

          font-title
        "
        :class="withIcon ? 'space-x-[8px]' : 'pr-[8px] sm:pr-[12px]'"
      >
        <slot />
      </div>
    </component>
  </div>
</template>
