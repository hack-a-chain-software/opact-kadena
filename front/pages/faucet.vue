<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'Faucet'
})
</script>

<template>
  <div class="lg:flex lg:justify-center">
    <LayoutGenericTopbar
      name="Token Faucet"
    />

    <FaucetForm
      class="mt-6 lg:md-0"
    />
  </div>
</template>
