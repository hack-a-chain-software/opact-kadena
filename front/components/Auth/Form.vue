<script setup lang="ts">
import { reactive } from 'vue'
import verify from './steps/Verify.vue'
import create from './steps/Create.vue'
import connect from './steps/Connect.vue'
import mnemonic from './steps/Mnemonic.vue'
import recovery from './steps/Recovery.vue'

const form = {
  verify,
  create,
  connect,
  mnemonic,
  recovery
}

export type FormType =
  | 'create'
  | 'connect'
  | 'recovery'
  | 'mnemonic'
  | 'verify';

interface UseAuthInterface {
  mnemonic: string;
  stepForm: FormType;
}

const data = reactive<UseAuthInterface>({
  mnemonic: '',
  stepForm: 'connect'
})
</script>

<template>
  <div class="ozk-form w-full flex justify-center">
    <Transition name="fade" mode="out-in">
      <component
        :is="form[data.stepForm]"
        :mnemonic="data.mnemonic"
        @mnemonic="($event: any) => (data.mnemonic = $event)"
        @changeStep="($event: any) => (data.stepForm = $event)"
      />
    </Transition>
  </div>
</template>
