<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: 'auth'
})

useHead({
  title: 'Receive Token'
})
</script>

<template>
  <div class="lg:flex lg:justify-center">
    <LayoutGenericTopbar
      name="Receive Token"
    />

    <ReceiveTokenForm
      class="mt-6 lg:md-0"
    />
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
