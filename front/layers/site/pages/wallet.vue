<script setup lang="ts">
definePageMeta({
  layout: 'site',
  middleware: 'site'
})

useHead({
  title: 'Opact Wallet'
})
</script>

<template>
  <LandingHero />

  <LandingPrivacy />

  <LandingSecurity />

  <LandingCommuniDocs />

  <LandingContact />
</template>
