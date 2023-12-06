<script setup lang="ts">
import { reactive } from 'vue'
import nft from './steps/Nft.vue'
import token from './steps/Token.vue'
import connect from './steps/Connect.vue'

export type FormType = 'nft' | 'token' | 'connect';

const steps = {
  nft,
  token,
  connect
}

const data = reactive({
  step: 'connect',
  token: 'token'
})
</script>

<template>
  <div class="ozk-form w-full flex justify-center">
    <Transition name="fade" mode="out-in">
      <component
        v-bind="data"
        :is="steps[data.step as FormType]"
        @token="data.token = $event"
        @changeStep="(event: any) => (data.step = event)"
      />
    </Transition>
  </div>
</template>
