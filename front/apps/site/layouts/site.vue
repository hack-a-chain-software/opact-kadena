<script setup lang="ts">
import { onMounted, reactive } from 'vue'

const data = reactive({
  showFixedNavbar: false
})

onMounted(() => {
  window.onscroll = () => {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 250
    ) {
      data.showFixedNavbar = true

      return
    }

    data.showFixedNavbar = false
  }
})
</script>

<template>
  <header>
    <HeaderNav />

    <HeaderFixedNav
      v-motion
      :initial="{
        y: -50,
      }"
      :enter="{
        y: 0,
      }"
      v-if="data.showFixedNavbar"
    />
  </header>
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
