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
  'hero-primary': Variant;
  'hero-tertiary': Variant;
  'hero-secondary': Variant;
}

const variants: Variants = {
  primary: {
    parent:
      'bg-opact-gradient p-[2px] inline-flex items-center justify-center lg:h-[28px] xl:h-[36px]',
    children:
      `bg-dark-blue w-full h-full flex items-center justify-center
        xl:text-[16px]
        xl:leading-[24px]
        xl:font-[400]
      `
  },
  secondary: {
    parent: `
      bg-white
      p-[2px]
      lg:h-[32px] xl:h-[39px]
      inline-flex items-center justify-center sm:font-[500] sm:text-[16px] sm:leading-[20px]
    `,
    children:
      `bg-white text-dark-blue w-full h-full flex items-center justify-center
        xl:text-[16px]
        xl:leading-[20px]
        xl:font-[500]
      `
  },
  tertiary: {
    parent:
      'bg-card-gradient p-[2px] inline-flex items-center justify-center h-[36px] sm:h-[48px]',
    children:
      'bg-inverted-card-gradient w-full h-full flex items-center justify-center'
  },
  'hero-primary': {
    parent: `
      bg-opact-gradient
      p-[2px]
      inline-flex items-center justify-center
      h-[44px] lg:h-[38px] xl:h-[49px]
    `,
    children:
      'bg-dark-blue w-full h-full flex items-center justify-center'
  },
  'hero-secondary': {
    parent: `
      bg-white
      p-[2px]
      md:h-[51px] xl:mt-[1.6rem]
      inline-flex items-center justify-center sm:font-[500] sm:text-[16px] sm:leading-[20px]
    `,
    children:
      `bg-white text-dark-blue w-full h-full flex items-center justify-center
        xl:text-[18px]
        xl:leading-[20px]
        xl:font-[400]
      `
  },
  'hero-tertiary': {
    parent:
      `
        bg-card-gradient
        p-[2px]
        inline-flex items-center justify-center
        w-full h-[44px] lg:h-[38px] xl:h-[49px]
      `,
    children:
      'bg-white text-dark-blue w-full h-full flex items-center justify-center'
  },
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
  text: {
    type: String,
    default: '',
  },
  variant: {
    type: String as PropType<
      'primary' | 'secondary' | 'tertiary' | 'hero-primary' | 'hero-secondary' | 'hero-tertiary'
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
    class="text-white rounded-[100px] xl:w-max"
  >
    <component
      :is="tag"
      :to="to"
      :href="href"
      :type="type"
      :class="variants[variant].children"
      class="
        px-[22px]
        rounded-[100px]
        sm:px-[24px]
        sm:text-[18px]
        sm:font-[500]
        sm:leading-[27px]

        xl:w-max
      "
    >
      <div
        class="flex items-center font-title"
      >
        <span>
          {{ text }}
        </span>

        <LandingAssetsArrow
          v-if="withIcon"
          src="/arrow.svg"
          :class="variant === 'hero-primary'
            ? `
              xl:w-[28px]
              xl:scale-[1.2]
              ml-[10px] mr-[-8px] sm:mr-[-12px]
            `
            : `
              ml-[8px] mr-[-8px] sm:mr-[-12px]
            `"
        />
      </div>
    </component>
  </div>
</template>
