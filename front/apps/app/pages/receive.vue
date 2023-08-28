<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/apps/auth/stores/wallet'
import Create from '../components/receive/form/Create.vue'

definePageMeta({
  layout: 'form',
  middleware: 'auth'
})

useHead({
  title: 'Receive'
})

const wallet = useWalletStore()

const { connected } = storeToRefs(wallet)

onBeforeMount(() => {
  if (!connected.value) {
    wallet.reconnect()
  }
})
</script>

<template>
  <div class="text-white">
    <Transition name="fade" mode="out-in">
      <Create />
    </Transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
