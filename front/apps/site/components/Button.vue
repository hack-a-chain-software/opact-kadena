b
<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { computed } from 'vue'
import type { PropType } from 'vue'

export interface Variant {
  parent: string;
  children: string;
}

export interface Variants {
  nav: Variant;
  primary: Variant;
  secondary: Variant;
  tertiary: Variant;
  'hero-primary': Variant;
  'hero-tertiary': Variant;
  'hero-secondary': Variant;
}

const variants: Variants = {
  nav: {
    parent:
      'bg-opact-gradient p-[2px] inline-flex items-center justify-center lg:h-[28px] xl:h-[36px]',
    children: `bg-dark-blue w-full h-full flex items-center justify-center
        lg:text-[13px]
        lg:leading-[20px]
        lg:font-normal

        xl:text-base
        xl:leading-[24px]
        xl:font-normal
      `
  },
  primary: {
    parent:
      'bg-opact-gradient p-[2px] inline-flex items-center justify-center lg:h-[28px] xl:h-[36px]',
    children: `bg-dark-blue w-full h-full flex items-center justify-center
        lg:text-[13px]
        lg:leading-[20px]
        lg:font-normal

        xl:text-base
        xl:leading-[24px]
      `
  },
  secondary: {
    parent: `
      bg-white
      p-[2px]
      h-[36px] md:h-[40px] lg:h-[39px] xl:h-[39px]
      inline-flex items-center justify-center sm:font-medium sm:text-base sm:leading-[20px]
    `,
    children: `
      bg-white text-dark-blue w-full h-full flex items-center justify-center
      lg:text-base
      lg:leading-[20px]
      lg:font-medium
    `
  },
  tertiary: {
    parent:
      'bg-card-gradient p-[2px] inline-flex items-center justify-center h-[44px] md:h-[50px]',
    children: `bg-inverted-card-gradient w-full h-full flex items-center justify-center
        sm:text-lg
        sm:font-medium
        sm:leading-[27px]
      `
  },
  'hero-primary': {
    parent: `
      w-full md:w-auto
      bg-opact-gradient
      p-[2px]
      inline-flex items-center justify-center
      h-[44px] md:h-[50px]
    `,
    children: `bg-dark-blue w-full h-full flex items-center justify-center
        lg:px-[22px]

        sm:text-lg
        sm:font-medium
        sm:leading-[27px]
      `
  },
  'hero-secondary': {
    parent: `
      bg-white
      p-[2px]
      h-[36px] md:h-[51px] xl:mt-[1.6rem]
      inline-flex items-center justify-center sm:font-medium sm:text-base sm:leading-[20px]
    `,
    children: `bg-white text-dark-blue w-full h-full flex items-center justify-center
        xl:text-lg
        xl:leading-[20px]
        xl:font-normal
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
  disabled: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String as PropType<
      | 'nav'
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
        'nav',
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
        'text-white rounded-[100px] xl:w-max relative md:max-w-max overflow-hidden cursor-pointer',
        variants[variant].parent,
        !disabled && 'opact-button group/button'
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
        sm:text-lg
        sm:font-medium
        sm:leading-[27px]
        xl:w-max
        lg:px-[18px]
        xl:px-[24px]
        group-hover/button:text-white
      `,
          variants[variant].children,
          disabled && '!cursor-not-allowed'
        )
      "
    >
      <div
        class="flex items-center justify-center font-title"
      >
        <span class="relative z-[2]">
          {{ text }}
        </span>

        <template v-if="!disabled">
          <Icon
            v-if="withIcon"
            name="arrow"
            class="
              h-[20px]
              w-[20px]
              group-hover/button:rotate-[45deg]
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
              translate-y-[-13%]
              group-hover/button:w-[30px]
              group-hover/button:pl-[8px]
              group-hover/button:mr-[-8px]
              group-hover/button:sm:mr-[-12px]
              group-hover/button:lg:mr-[-12px]
            "
          />
        </template>
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
  overflow: hidden;
  border-radius: 100px;
  background: linear-gradient(
    264.6deg,
    #ad51ff 12.18%,
    #1a92ff 91.42%
  );
}
</style>
