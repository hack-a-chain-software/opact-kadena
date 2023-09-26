<script setup lang="ts">
import { chains } from '~/chains'

const emit = defineEmits(['connected'])
</script>

<template>
  <div class="w-full max-w-md">
    <ul class="w-full space-y-[14px] gap-3">
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
</template>
