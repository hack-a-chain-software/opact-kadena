<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: 'auth'
})

useHead({
  title: 'Send NFT'
})
</script>

<template>
  <div class="lg:flex lg:justify-center">
    <LayoutGenericTopbar
      name="Send NFT"
    />

    <SendNFTForm
      class="mt-6 lg:md-0"
    />
  </div>
</template>
