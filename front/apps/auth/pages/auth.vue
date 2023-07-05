<script setup lang="ts">
import Connect from '../components/auth/form/Connect.vue'
import Create from '../components/auth/form/Create.vue'
import Recovery from '../components/auth/form/Recovery.vue'
import Method from '../components/auth/form/Method.vue'
import Mnemonic from '../components/auth/form/Mnemonic.vue'
import Verify from '../components/auth/form/Verify.vue'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

useHead({
  title: 'Auth'
})

const steps = {
  create: Create,
  connect: Connect,
  recovery: Recovery,
  method: Method,
  mnemonic: Mnemonic,
  verify: Verify
}

const currentStep = useAuthCurrentStep()
</script>

<template>
  <div class="my-auto mt-[calc((100vh-650px)/2)]">
    <Transition name="fade" mode="out-in">
      <component :is="steps[currentStep]" />
    </Transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
