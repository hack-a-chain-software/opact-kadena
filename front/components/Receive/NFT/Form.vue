<script setup lang="ts">
import { reactive } from 'vue'
import receive from './steps/Receive.vue'
import payment from './steps/Payment.vue'

export type FormType = 'receive' | 'payment';

const steps = {
  receive,
  payment
}

const data = reactive({
  step: 'receive'
})
</script>

<template>
  <div class="ozk-form w-full flex justify-center">
    <Transition name="fade" mode="out-in">
      <component
        :is="steps[data.step as FormType]"
        @changeStep="(event) => (data.step = event as any)"
      />
    </Transition>
  </div>
</template>
