<script setup lang="ts">
const emits = defineEmits(['click'])

withDefaults(
  defineProps<{
    label?: string;
    disabled?: boolean;
  }>(),
  {
    label: '',
    disabled: false
  }
)
</script>

<template>
  <div class="mt-auto pb-[32px] lg:pt-[56px]">
    <UIButtonInline
      :label="label"
      :disabled="disabled"
      @click.prevent="emits('click', $event)"
    />
  </div>
</template>
