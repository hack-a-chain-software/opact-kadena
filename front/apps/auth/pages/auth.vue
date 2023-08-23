<script setup lang="ts">
import form from '../components/auth/form'

definePageMeta({
  layout: 'form',
  middleware: 'guest'
})

useHead({
  title: 'Auth'
})

const currentStep = useAuthCurrentStep()
</script>

<template>
  <div>
    <Transition name="fade" mode="out-in">
      <component :is="form[currentStep]" />
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
