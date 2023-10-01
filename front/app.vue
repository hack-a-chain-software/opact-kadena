<script setup lang="ts">
const nuxtApp = useNuxtApp();

const loading = ref(false);

nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});

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
  <div
    v-if="loading"
    class="h-full w-full flex items-center justify-center min-h-screen min-w-screen bg-gray-900 fixed top-0 left-0"
  >
    <Icon
      name="minilogo"
      class="animate-spin text-white w-8 h-8 min-h-screen"
    />
  </div>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
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
