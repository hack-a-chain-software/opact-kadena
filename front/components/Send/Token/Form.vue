<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { kadenaTokens } from 'opact-sdk'
import { useSendStore } from '~/stores/send'

const transferStore = useSendStore()

const route = useRoute()

onBeforeMount(() => {
  transferStore.reset()

  const {
    token,
    amount,
    address
  } = route.query || {}

  if (address) {
    transferStore.addressTo = address
  }

  if (amount) {
    transferStore.amount = amount
  }

  if (token) {
    const defaultToken = kadenaTokens.find(({ id }) => id.toString() === token)

    transferStore.selectedToken = defaultToken
  }
})
</script>

<template>
  <div class="ozk-form w-full flex justify-center">
    <Transition name="fade" mode="out-in">
      <SendTokenStepsPayment/>
    </Transition>
  </div>
</template>
~/stores/send
