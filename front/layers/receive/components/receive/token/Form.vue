<script setup lang="ts">
import receive from '~/layers/receive/components/receive/token/steps/Receive.vue'
import review from '~/layers/receive/components/receive/token/steps/Review.vue'

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
  <div
    class="ozk-form w-full flex justify-center"
  >
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
