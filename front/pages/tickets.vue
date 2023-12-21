<script setup lang="ts">
definePageMeta({
  layout: 'site'
})

useHead({
  title: 'Opact Tickets'
})
</script>

<template>
  <div>
    <PagesTicketsHero />

    <PagesTicketsSecurity />

    <PagesTicketsSimple />

    <PagesTicketsFeatures />

    <PagesTicketsCommuniDocs />
  </div>
</template>
