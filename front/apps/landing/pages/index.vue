<script setup lang="ts">
definePageMeta({
  layout: 'landing'
})

useHead({
  title: 'Opact Wallet'
})
</script>

<template>
  <LandingPrivacy />

  <LandingSecurity />

  <div
    class="
      mx-auto
      lg:max-w-[1024px]
      lg:px-[48px]
      lg:flex
      lg:space-x-[28px]
      lg:items-stretch
      xl:max-w-[1280px]
      xl:px-[60px]
      xl:flex
      xl:space-x-[32px]
      xl:items-stretch
    "
  >
    <LandingDocumentation />

    <LandingCommunity />
  </div>

  <LandingTouch />
</template>
