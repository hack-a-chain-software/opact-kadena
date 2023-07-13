<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/apps/auth/stores/wallet'
import form from '../components/deposit/form'

definePageMeta({
  layout: 'form',
  middleware: 'auth'
})

useHead({
  title: 'Deposit'
})

const { step } = useForm()

const wallet = useWalletStore()

const { connected } = storeToRefs(wallet)

onBeforeMount(() => {
  if (!connected.value) {
    wallet.reconnect()
  }
})
</script>

<template>
  <div
    class="my-auto mt-[calc((100vh-650px)/2)] text-white"
  >
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
