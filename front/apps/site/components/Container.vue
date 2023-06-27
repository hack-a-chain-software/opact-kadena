<script setup lang="ts">
withDefaults(
  defineProps<{
    tag?: string;
    title?: string;
    text?: string;
    cta?: string;
    size?: 'lg' | 'xl';
  }>(),
  {
    size: 'lg',
    cta: '',
    tag: '',
    text: '',
    title: ''
  }
)

const sizes = {
  xl: {
    tag: `
      text-sm font-[500]
      sm:text-[22px] sm:font-[900] sm:leading-[33px]
      lg:text-[22px] lg:font-[700] lg:leading-[33px]
    `,
    title: `
      text-[24px] font-[500] leading-[36px] tracking-[-0.05rem]
      sm:text-[32px] sm:leading-[40px]
      md:text-[42px] md:font-[600] md:leading-[63px] md:tracking-normal
      lg:text-[42px] lg:font-[600] lg:leading-[63px]
    `,
    text: `
      text-[16px] leading-[24px]
      sm:text-[20px] sm:font-[500] sm:leading-[30px]
      lg:text-[20px] lg:font-[500] lg:leading-[30px]
    `
  },
  lg: {
    tag: `
      text-sm font-[500]
      sm:text-[18px] sm:font-[900] sm:leading-[27px]
      lg:text-[18px] lg:font-[900] lg:leading-[27px]
    `,
    title: `
      text-2xl-poppins
      sm:text-[32px] sm:leading-[40px]
      md:text-[40px] md:font-[600] md:leading-[60px]
      lg:text-[32px] lg:font-[600] lg:leading-[48px]
    `,
    text: `
      sm:text-[20px] sm:font-[500] sm:leading-[30px]
      lg:text-[20px] lg:font-[500] lg:leading-[30px]
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
        rounded-[12px]
        overflow-hidden
        bg-inverted-card-gradient
        md:pb-[42px] md:px-[40px] md:pt-[48px]
        lg:pt-[52px] lg:pb-[56px] lg:px-[40px]
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
        class="text-white font-title"
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

      <div>
        <slot name="cta">
          <Button
            withIcon
            variant="secondary"
            :text="cta"
          />
        </slot>
      </div>
    </div>
  </div>
</template>
