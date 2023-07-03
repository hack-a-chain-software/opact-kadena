<script setup lang="ts">
withDefaults(
  defineProps<{
    placeholder?: string;
  }>(),
  {
    placeholder: ''
  }
)
</script>

<template>
  <input
    class="
      w-full
      px-[20px]
      py-[18px]
      rounded-[8px]
      text-base
      font-title
      leading-[20px]
      text-dark-blue
      placeholder:text-dark-blue
    "
    :placeholder="placeholder"
  >
</template>
