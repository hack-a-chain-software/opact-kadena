<script setup lang="ts">
withDefaults(
  defineProps<{
    type: string;
    label: string;
  }>(),
  {
    type: 'error'
  }
)

const types = {
  error: {
    border: 'border-[#C6454B]',
    background: 'bg-[#251319]'
  },
  success: {
    border: 'border-[#F8D45C]',
    background: 'bg-[#2D2A1C]'
  }
}
</script>

<template>
  <div
    class="px-4 py-2 border rounded-[8px]"
    :class="[types[type].border, types[type].background]"
  >
    <span
      v-text="label"
      class="text-font-1 text-xxs font-[500]"
    />
  </div>
</template>
