<script setup lang="ts">
import receive from '~/layers/receive/components/receive/nft/steps/Receive.vue'
import payment from '~/layers/receive/components/receive/nft/steps/Payment.vue'

export type FormType = 'receive' | 'payment';

const steps = {
  receive,
  payment
}

const {
  // States
  data,

  // Computeds
  link,
  isPrivate,
  isDisabled,

  // Methods
  reset,
  deposit,
  updateTokenValue,
  updateAmountValue,
  updateReceiveTypeValue
} = useReceiveForm(1, null as any)
</script>

<template>
  <div class="ozk-form w-full flex justify-center">
    <Transition name="fade" mode="out-in">
      <component
        :is="steps[data.stepForm as FormType]"
        :link="link"
        :data="data"
        :isPrivate="isPrivate"
        :isDisabled="isDisabled"
        @reset="reset"
        @deposit="deposit"
        @updateTokenValue="updateTokenValue"
        @updateAmountValue="updateAmountValue"
        @changeStep="(event) => (data.stepForm = event as any)"
        @updateReceiveTypeValue="updateReceiveTypeValue"
      />
    </Transition>
  </div>
</template>
