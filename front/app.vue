<script setup lang="ts">
useHead({
  titleTemplate: title => title || 'Home',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content:
        'Opact: exploring the power of zero-knowledge technology to create the privacy and security products of the future. Meet our solutions and get in contact for partnerships!'
    },
    {
      hid: 'robots',
      name: 'robots',
      content: 'index, follow'
    },
    {
      hid: 'googlebot',
      name: 'googlebot',
      content: 'index, follow'
    }
  ]
})
</script>

<template>
  <Html lang="en" />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
