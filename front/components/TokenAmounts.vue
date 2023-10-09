<script setup lang="ts">
const amounts = [1, 10, 100]

withDefaults(
  defineProps<{
    disabled?: boolean
  }>(),
  {
    disabled: false,
  }
)

const emit = defineEmits(['selected'])
</script>

<template>
  <div class="pt-6 space-x-2">
    <button
      v-for="amount in amounts"
      :key="amount"
      class="
        group
        active:border-blue-400
        border-[1.5px]
        border-gray-700
        p-3
        rounded-full
        disabled:opacity-60
        disabled:cursor-not-allowed
      "
      :disabled="disabled"
      @click.prevent="emit('selected', amount)"
    >
      <span
        class="text-xxs text-font-2 group-active:text-blue-400 font-medium"
        v-text="amount"
      />
    </button>
  </div>
</template>
