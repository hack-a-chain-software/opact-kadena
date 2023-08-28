<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/apps/auth/stores/wallet'
import form from '../components/send/form'

definePageMeta({
  layout: 'form',
  middleware: 'auth'
})

useHead({
  title: 'Send'
})

const { step } = useSendForm()

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
      <component :is="form[step]" />
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
