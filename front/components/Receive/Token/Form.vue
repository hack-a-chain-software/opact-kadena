<script setup lang="ts">
import review from './steps/Review.vue'
import receive from '~/steps/Receive.vue'
import { useReceiveForm } from '~/hooks/receive'

export type FormType = 'receive' | 'review';

const steps = {
  receive,
  review
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
} = useReceiveForm()
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
        @updateReceiveTypeValue="updateReceiveTypeValue"
        @changeStep="(event: any) => (data.stepForm = event)"
      />
    </Transition>
  </div>
</template>
