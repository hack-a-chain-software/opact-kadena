<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue'
import connect from './steps/Connect.vue'
import payment from './steps/Payment.vue'
import success from './steps/Success.vue'
import { useInvoiceStore } from '~/stores/invoice'

export type FormType = 'connect' | 'payment' | 'success';

const steps = {
  connect,
  payment,
  success
}

const data = reactive({
  step: 'connect'
})

const invoiceStore = useInvoiceStore()

const route = useRoute()

onBeforeMount(() => {
  const {
    address
  } = route.query || {}

  if (address) {
    invoiceStore.addressTo = address
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
