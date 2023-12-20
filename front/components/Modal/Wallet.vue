<script lang="ts" setup>
import { chains } from '~/chains'

withDefaults(
  defineProps<{
    show: boolean;
  }>(),
  {
    show: false
  }
)

const emit = defineEmits(['close', 'connected'])

const close = () => {
  emit('close')
}
</script>

<template>
  <UIModalRoot
    :show="show"
    title="Select Wallet"
    @close="close()"
  >
    <div class="w-full">
      <ul class="w-full space-y-6 gap-3">
        <TabItem
          v-for="provider in chains[0].providers"
          :key="provider.id"
          :chain="provider.key"
          v-bind="provider"
          class="w-full"
          @connected="emit('connected')"
        />
      </ul>
    </div>
  </UIModalRoot>
</template>
