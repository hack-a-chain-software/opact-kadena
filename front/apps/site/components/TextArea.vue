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
  <textarea
    class="
      px-[20px]
      py-[18px]
      rounded-[8px]
      text-base
      font-title
      leading-[20px]
      mb-[21px]
      min-h-[110px]
      text-dark-blue
      placeholder:text-dark-blue
    "
    :placeholder="placeholder"
  />
</template>
