<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string;
    title?: string;
    text?: string;
    cta?: string;
    to?: string;
    disabled?: boolean;
    center?: boolean;
    size?: 'lg' | 'xl';
  }>(),
  {
    center: false,
    disabled: false,
    size: 'lg',
    cta: '',
    to: '',
    tag: '',
    text: '',
    title: ''
  }
)

const sizes = {
  xl: {
    tag: `
      text-sm font-medium
      sm:text-[22px] sm:font-[900] sm:leading-[33px]
      lg:font-[700]
    `,
    title: `
      text-2xl font-medium leading-[36px] tracking-[-0.05rem]
      sm:text-[32px] sm:leading-[40px]
      md:text-[42px] md:font-semibold md:leading-[63px] md:tracking-normal
    `,
    text: `
      text-base leading-[24px]
      sm:text-xl sm:font-medium sm:leading-[30px]
    `
  },
  lg: {
    tag: `
      text-sm font-medium
      sm:text-lg sm:font-[900] sm:leading-[27px]
    `,
    title: `
      text-2xl-poppins
      sm:text-[32px] sm:leading-[40px]
      md:text-[40px] md:font-semibold md:leading-[60px]
      lg:text-[32px] lg:leading-[48px]
    `,
    text: `
      sm:text-xl sm:font-medium sm:leading-[30px]
    `
  }
}
</script>

<template>
  <div
    class="
      p-[2px]
      relative
      rounded-[12px]
      bg-card-gradient
      overflow-hidden
    "
  >
    <div
      class="
        relative
        px-[16px]
        pt-[24px]
        pb-[22px]
        h-full
        rounded-[12px]
        overflow-hidden
        group/container
        bg-inverted-card-gradient
        md:pb-[42px] md:px-10 md:pt-[48px]
        lg:pt-[52px] lg:pb-[56px] lg:px-10
      "
    >
      <slot name="before" />

      <h3
        :class="sizes[size].tag"
        class="
          bg-opact-gradient bg-clip-text
          text-transparent
          uppercase
          w-max
        "
      >
        <slot name="tag">
          {{ tag }}
        </slot>
      </h3>

      <h2
        :class="sizes[size].title"
        class="text-white font-title z-[4] relative"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </h2>

      <p :class="sizes[size].text" class="text-[#BDBDBD]">
        <slot name="text">
          {{ text }}
        </slot>
      </p>

      <div
        class="z-[4] relative w-full flex"
        :class="center && 'justify-center'"
      >
        <slot name="cta">
          <Button
            withIcon
            :href="to"
            :text="cta"
            target="_blank"
            variant="secondary"
            :disabled="disabled"
          />
        </slot>
      </div>

      <slot name="after" />
    </div>
  </div>
</template>
