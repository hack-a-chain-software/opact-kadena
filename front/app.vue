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
    <!-- <div id="nt-container" class="absolute inset-0 z-[9999999999999999999999999999]"/> -->
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
body {
  background-color: #060a0f;
}

body::-webkit-scrollbar {
  -webkit-appearance: none !important;
  width: 8px !important;
}

body::-webkit-scrollbar-thumb {
  border-radius: 20px !important;
  background-color: #202327cc !important;
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5) !important;
}

body {
  background: #060A0F;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.8rem);
}
</style>
