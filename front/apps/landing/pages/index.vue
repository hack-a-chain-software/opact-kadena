<script setup lang="ts">
definePageMeta({
  layout: 'landing'
})

useHead({
  title: 'Opact Wallet'
})
</script>

<template>
  <LandingPrivacy
    id="privacy"
  />

  <LandingSecurity
    id="security"
  />

  <div
    class="
      mx-auto
      lg:max-w-[1024px]
      lg:px-[60px]
      lg:flex
      lg:space-x-[32px]
      lg:items-stretch
      xl:max-w-[1280px]
      xl:px-[60px]
      xl:flex
      xl:space-x-[32px]
      xl:items-stretch
      2xl:max-w-[1440px]
    "
  >
    <LandingDocumentation id="documentation"/>

    <LandingCommunity />
  </div>

  <LandingTouch id="contact"/>
</template>
