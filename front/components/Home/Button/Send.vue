<script setup lang="ts">
import { reactive } from 'vue'

const data = reactive({
  show: false
})
</script>

<template>
  <div>
    <UiButtonAction
      icon="send"
      label="Send"
      @click.prevent="data.show = true"
    />

    <ModalTokenType
      title="Send"
      baseRoute="send"
      :show="data.show"
      @close="data.show = false"
      subtile="Choose your send option"
      description="You can send tokens and NFTs to your Opact Wallet."
    />
  </div>
</template>
