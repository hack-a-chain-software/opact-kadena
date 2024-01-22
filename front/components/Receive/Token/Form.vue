<script setup lang="ts">
import review from './steps/Review.vue'
import receive from './steps/Receive.vue'
import { reactive, onBeforeMount } from 'vue'
import { useReceiveStore } from '~/stores/receive'

export type FormType = 'receive' | 'review';

const steps = {
  receive,
  review
}

const data = reactive({
  step: 'receive'
})

const store = useReceiveStore()

onBeforeMount(() => {
  store.reset()
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
