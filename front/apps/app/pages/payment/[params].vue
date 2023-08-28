<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/apps/auth/stores/wallet'
import form from '../../components/payment/form'

definePageMeta({
  layout: 'form'
  // middleware: 'auth'
})

useHead({
  title: 'Payment'
})

const wallet = useWalletStore()

const { connected } = storeToRefs(wallet)

onBeforeMount(() => {
  if (!connected.value) {
    wallet.reconnect()
  }
})

const { step } = usePaymentForm()
</script>

<template>
  <div class="text-white pt-[46px]">
    <div
      class="
        py-6
        px-4
        flex-col flex
        items-center
        justify-center
        gap-6
        rounded-[12px]
        bg-gray-800
      "
    >
      <div>
        <Icon name="logo" class="h-[37px] w-[188px]" />
      </div>

      <div class="w-full">
        <Transition name="fade" mode="out-in">
          <component :is="form[step]" />
        </Transition>
      </div>
    </div>
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
