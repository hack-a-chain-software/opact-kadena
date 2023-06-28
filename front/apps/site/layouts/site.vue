<script setup lang="ts">
import { onMounted } from 'vue'

const showFixedNavbar = useFixedNavbar()

onMounted(() => {
  window.onscroll = () => {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 550
    ) {
      showFixedNavbar.value = true

      return
    }

    showFixedNavbar.value = false
  }
})
</script>

<template>
  <HeaderNav />

  <HeaderFixedNav />
  <slot />

  <Footer />
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
</style>
