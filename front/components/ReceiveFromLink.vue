<script setup lang="ts">
import { reactive } from 'vue'

withDefaults(
  defineProps<{
    link?: string;
    isDisabled?: boolean;
  }>(),
  {
    link: '',
    isDisabled: false
  }
)

const emit = defineEmits(['done'])

const data = reactive({
  show: false
})

const done = () => {
  data.show = false
  emit('done')
}
</script>

<template>
  <div>
    <UIButtonInline
      :disabled="isDisabled"
      label="Generate Receive Link"
      @click.prevent="data.show = true"
    />
  </div>

  <UIModalGenerateLink
    :link="link"
    :show="data.show"
    @done="done()"
    @close="data.show = false"
  />
</template>
