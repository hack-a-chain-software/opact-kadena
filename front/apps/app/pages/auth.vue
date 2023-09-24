<script setup lang="ts">
import { useAuth } from '~/hooks/auth'

definePageMeta({
  layout: 'form',
  middleware: 'guest'
})

useHead({
  title: 'Auth'
})

const {
  data,
  form
} = useAuth()
</script>

<template>
  <div
    class="h-full lg:flex lg:justify-center lg:items-start lg:pt-[40px]"
  >
    <Transition name="fade" mode="out-in">
      <component
        :is="form[data.stepForm]"
        :mnemonic="data.mnemonic"
        @mnemonic="($event) => data.mnemonic = $event"
        @changeStep="($event) => data.stepForm = $event"
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
