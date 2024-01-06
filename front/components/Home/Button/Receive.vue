<script setup lang="ts">
import { reactive } from 'vue'

const data = reactive({
  show: false
})
</script>

<template>
  <div>
    <UIButtonAction
      icon="receive"
      label="Receive"
      @click.prevent="data.show = true"
    />

    <UIModalTokenType
      title="Receive"
      :show="data.show"
      @close="data.show = false"
    />
  </div>
</template>
