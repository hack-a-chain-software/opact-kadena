<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: any;
    placeholder?: string;
  }>(),
  {
    modelValue: '',
    placeholder: ''
  }
)

const emits = defineEmits(['update:modelValue'])

const handleInput = (e: any) => {
  emits('update:modelValue', e.target.value)
}
</script>

<template>
  <textarea
    :value="modelValue"
    class="
      px-[20px]
      py-[18px]
      rounded-[8px]
      text-base
      font-title
      leading-[20px]
      mb-[21px]
      min-h-[110px]
      disabled:cursor-not-allowed
      disabled:opacity-[0.4]
      text-dark-blue
      placeholder:text-dark-blue
    "
    :placeholder="placeholder"
    @input="handleInput"
  />
</template>
