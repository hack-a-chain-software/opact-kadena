<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { computed } from 'vue'
import type { PropType } from 'vue'

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
    children: `bg-dark-blue w-full h-full flex items-center justify-center
        lg:text-[13px]
        lg:leading-[20px]
        lg:font-[400]

        xl:text-[16px]
        xl:leading-[24px]
        xl:font-[400]
      `
  },
  secondary: {
    parent: `
      bg-white
      p-[2px]
      h-[36px] md:h-[40px] lg:h-[39px] xl:h-[39px]
      inline-flex items-center justify-center sm:font-[500] sm:text-[16px] sm:leading-[20px]
    `,
    children: `
      bg-white text-dark-blue w-full h-full flex items-center justify-center
      lg:text-[16px]
      lg:leading-[20px]
      lg:font-[500]
    `
  },
  tertiary: {
    parent:
      'bg-card-gradient p-[2px] inline-flex items-center justify-center h-[44px] lg:h-[49px] xl:h-[49px]',
    children: `bg-inverted-card-gradient w-full h-full flex items-center justify-center

        sm:text-[18px]
        sm:font-[500]
        sm:leading-[27px]

        lg:text-[18px]
        lg:font-[500]
        lg:leading-[27px]

        xl:text-[18px]
        xl:font-[500]
        xl:leading-[27px]
      `
  },
  'hero-primary': {
    parent: `
      bg-opact-gradient
      p-[2px]
      inline-flex items-center justify-center
      h-[44px] lg:h-[49px]
    `,
    children: `bg-dark-blue w-full h-full flex items-center justify-center
        lg:px-[22px]

        sm:text-[18px]
        sm:font-[500]
        sm:leading-[27px]

        lg:text-[18px]
        lg:font-[400]
        lg:leading-[27px]

        xl:text-[18px]
        xl:font-[500]
        xl:leading-[27px]
      `
  },
  'hero-secondary': {
    parent: `
      bg-white
      p-[2px]
      h-[36px] md:h-[51px] xl:mt-[1.6rem]
      inline-flex items-center justify-center sm:font-[500] sm:text-[16px] sm:leading-[20px]
    `,
    children: `bg-white text-dark-blue w-full h-full flex items-center justify-center
        xl:text-[18px]
        xl:leading-[20px]
        xl:font-[400]
      `
  },
  'hero-tertiary': {
    parent: `
        bg-card-gradient
        p-[2px]
        inline-flex items-center justify-center
        w-full h-[44px] lg:h-[38px] xl:h-[49px]
      `,
    children: `bg-white text-dark-blue w-full h-full flex items-center justify-center
      `
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
  text: {
    type: String,
    default: ''
  },
  variant: {
    type: String as PropType<
      | 'primary'
      | 'secondary'
      | 'tertiary'
      | 'hero-primary'
      | 'hero-secondary'
      | 'hero-tertiary'
    >,
    default: 'primary',
    validator: (v: string) =>
      [
        'primary',
        'secondary',
        'tertiary',
        'hero-primary',
        'hero-secondary',
        'hero-tertiary'
      ].includes(v)
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
    :class="
      twMerge(
        'text-white rounded-[100px] xl:w-max group opact-button relative max-w-max overflow-hidden cursor-pointer',
        variants[variant].parent
      )
    "
  >
    <component
      :is="tag"
      :to="to"
      :href="href"
      :type="type"
      :class="
        twMerge(
          `
        px-[22px]
        rounded-[100px]
        sm:px-[24px]
        sm:text-[18px]
        sm:font-[500]
        sm:leading-[27px]
        xl:w-max
        lg:px-[18px]
        xl:px-[24px]
        group-hover:text-white
      `,
          variants[variant].children
        )
      "
    >
      <div class="flex items-center justify-center font-title">
        <span class="relative z-[2]">
          {{ text }}
        </span>

        <Icon
          v-if="withIcon"
          name="arrow"
          class="
            h-[20px]
            w-[20px]
            group-hover:rotate-[45deg]
            duration-[0.3s]
            relative
            z-[2]
          "
          :class="
            variant === 'hero-primary'
              ? `
              lg:w-[28px]
              lg:scale-[1.2]
              ml-[10px] mr-[-8px] sm:mr-[-12px]
            `
              : `
              ml-[8px] mr-[-8px] sm:mr-[-12px] lg:ml-[8px] lg:mr-[-12px]
            `
          "
        />

        <Icon
          v-else
          name="arrow"
          class="
            w-0
            z-[2]
            h-full
            relative
            rotate-[45deg]
            duration-[0.3s]
            group-hover:w-[30px] group-hover:pl-[8px]
          "
        />
      </div>
    </component>
  </div>
</template>

<style scoped>
.opact-button:hover::after {
  right: 0%;
  transition: right 0.3s ease-out;
}
.opact-button::after {
  left: -40px;
  z-index: 0;
  content: '';
  height: 100%;
  position: absolute;
  bottom: 0;
  top: 0;
  min-width: 40px;
  right: 100%;
  border-radius: 100px;
  background: linear-gradient(
    264.6deg,
    #ad51ff 12.18%,
    #1a92ff 91.42%
  );
}
</style>
