<script setup>
const showFixedNavbar = useFixedNavbar()
</script>

<template>
  <HeaderNav
    class="!fixed"
    v-if="showFixedNavbar"
    v-motion
      :initial="{
        y: -50,
      }"
      :enter="{
        y: 0,
      }"
  />
</template>
