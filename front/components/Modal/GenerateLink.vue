<script lang="ts" setup>
withDefaults(
  defineProps<{
    show: boolean;
    link: string;
  }>(),
  {
    link: '',
    show: false
  }
)

const emit = defineEmits(['close', 'done'])
</script>

<template>
  <UiModalRoot
    :show="show"
    title="Shareable link"
    @close="emit('close')"
  >
    <UIInputCopy
      label="Copy or share the payment link"
      :value="link"
    />

    <UIButtonInline
      label="Done"
      @click.prevent="emit('done')"
    />
  </UiModalRoot>
</template>
