<script lang="ts" setup>
import { reactive } from 'vue'

withDefaults(
  defineProps<{
    label?: string;
    isDisabled?: boolean;
  }>(),
  {
    isDisabled: false,
    label: 'Connect Wallet'
  }
)

const data = reactive({
  show: false
})

const emit = defineEmits(['connected'])

const connected = () => {
  data.show = false

  emit('connected')
}
</script>

<template>
  <div>
    <ButtonInline
      :label="label"
      :disabled="isDisabled"
      @click.prevent="data.show = true"
    />

    <WalletConnector
      :show="data.show"
      @close="data.show = false"
      @connected="connected"
    />
  </div>
</template>
