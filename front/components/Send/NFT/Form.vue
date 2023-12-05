<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useTransferStore } from '~/stores/transfer'

const transferStore = useTransferStore()

const route = useRoute()

onBeforeMount(() => {
  const {
    address,
  } = route.query || {}

  if (address) {
    transferStore.addressTo = address
  }
})
</script>

<template>
  <div class="ozk-form w-full flex justify-center">
    <Transition name="fade" mode="out-in">
      <SendNFTStepsPayment/>
    </Transition>
  </div>
</template>
