<script setup lang="ts">
withDefaults(
  defineProps<{
    gap?: string
  }>(),
  {
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
      md:bg-gray-900 md:border md:border-gray-600
    "
  >
    <div
      class="h-full flex flex-col"
      :class="gap"
    >
      <slot />
    </div>
  </div>
</template>
