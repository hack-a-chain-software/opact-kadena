<script lang="ts" setup>
import { reactive } from 'vue'

const data = reactive({
  show: false
})

const emit = defineEmits(['connected'])
</script>

<template>
  <div>
    <ButtonInline
      label="Connect Wallet"
      class="mt-full lg:mt-[40px]"
      @click.prevent="data.show = true"
    />

    <WalletConnector
      :show="data.show"
      @close="data.show = false"
      @connected="emit('connected')"
    />
  </div>
</template>
