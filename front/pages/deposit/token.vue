<script setup lang="ts">
import { useDepositForm } from '~/hooks/deposit'

definePageMeta({
  layout: 'app',
  middleware: 'auth'
})

useHead({
  title: 'Deposit Token'
})

const { data, form } = useDepositForm()
</script>

<template>
  <div class="lg:flex lg:justify-center">
    <div
      class="
        lg:p-6
        lg:bg-gray-900
        lg:w-[546px]
        lg:border-2
        lg:border-gray-600
        lg:rounded-[12px]
      "
    >
      <Transition name="fade" mode="out-in">
        <component :is="form[data.stepForm]" />
      </Transition>
    </div>
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
