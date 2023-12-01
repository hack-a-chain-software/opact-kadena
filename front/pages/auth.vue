<script setup lang="ts">
import { useAuthForm } from '~/hooks/auth-form'

useHead({
  title: 'Auth'
})

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

const { data, form } = useAuthForm()
</script>

<template>
  <div
    class="h-full lg:flex lg:justify-center lg:items-start"
  >
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
