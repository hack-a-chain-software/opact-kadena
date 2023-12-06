<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { kadenaBaseTokens } from 'opact-sdk'
import { useTransferStore } from '~/stores/transfer'

const transferStore = useTransferStore()

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
    const defaultToken = kadenaBaseTokens.find(({ id }) => id.toString() === token)

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
