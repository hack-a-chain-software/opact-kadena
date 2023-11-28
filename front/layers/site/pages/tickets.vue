<script setup lang="ts">
definePageMeta({
  layout: 'site'
})

useHead({
  title: 'Opact Tickets'
})
</script>

<template>
  <TicketsHero />

  <TicketsSecurity />

  <TicketsSimple />

  <TicketsFeatures />

  <TicketsCommuniDocs />

  <TicketsContact />
</template>
