<script setup lang="ts">
useHead({
  title: 'Auth'
})

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})
</script>

<template>
  <div class="lg:flex lg:justify-center">
    <AuthForm />
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
