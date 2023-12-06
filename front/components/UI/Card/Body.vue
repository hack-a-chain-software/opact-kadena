<script setup lang="ts">
withDefaults(
  defineProps<{
    gap?: string
    bg?: string
  }>(),
  {
    bg: 'md:bg-gray-900',
    gap: 'space-y-6 md:space-y-8'
  }
)
</script>

<template>
  <div
    class="
      md:p-6
      w-full
      rounded-xl
      max-w-[546px]
      md:border md:border-gray-600
    "
    :class="bg"
  >
    <div
      class="h-full flex flex-col"
      :class="gap"
    >
      <slot />
    </div>
  </div>
</template>
