<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue'
import { kadenaTokens } from 'opact-sdk'
import connect from './steps/Connect.vue'
import payment from './steps/Payment.vue'
import success from './steps/Success.vue'
import { useReceiveStore } from '~/stores/receive'

export type FormType = 'connect' | 'payment' | 'success';

const steps = {
  connect,
  payment,
  success
}

const data = reactive({
  step: 'connect'
})

const invoiceStore = useReceiveStore()

const route = useRoute()

onBeforeMount(() => {
  const {
    token,
    amount,
    address
  } = route.query || {}

  if (address) {
    invoiceStore.addressTo = address
  }

  if (amount) {
    invoiceStore.amount = amount
  }

  if (token) {
    const defaultToken = kadenaTokens.find(({ id }) => id.toString() === token)

    invoiceStore.selectedToken = defaultToken
  }
})
</script>

<template>
  <div class="ozk-form w-full flex justify-center">
    <Transition name="fade" mode="out-in">
      <component
        :is="steps[data.step as FormType]"
        @changeStep="(event: any) => (data.step = event)"
      />
    </Transition>
  </div>
</template>
