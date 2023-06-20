<script setup lang="ts">
withDefaults(
  defineProps<{
    tag: string;
    title: string;
    text: string;
    cta: string;
  }>(),
  {
    cta: '',
    tag: '',
    text: '',
    title: '',
  }
)
</script>

<template>
  <div class="p-[2px] rounded-[12px] bg-card-gradient">
    <div
      class="
        rounded-[12px]
        relative
        bg-inverted-card-gradient
        overflow-hidden
        px-[16px]
        pt-[24px]
        pb-[22px]
        md:pb-[42px] md:px-[40px] md:pt-[48px]
        lg:pt-[52px] lg:pb-[56px] lg:px-[40px]
      "
    >
      <slot />
    </div>
  </div>
</template>
