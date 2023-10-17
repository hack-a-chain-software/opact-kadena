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
  <div id="footer" class="pt-[165px] lg:pt-[56px]">
    <ButtonInline
      :label="label"
      :disabled="disabled"
      @click.prevent="emits('click', $event)"
    />
  </div>
</template>
