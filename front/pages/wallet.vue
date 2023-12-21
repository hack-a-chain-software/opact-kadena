<script setup lang="ts">
definePageMeta({
  layout: 'site'
})

useHead({
  title: 'Opact Wallet'
})
</script>

<template>
  <div>
    <PagesWalletHero />

    <PagesWalletPrivacy />

    <PagesWalletSecurity />

    <PagesWalletCommuniDocs />
  </div>
</template>
