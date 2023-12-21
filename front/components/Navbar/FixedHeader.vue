<script setup>
const showFixedNavbar = useShowFixedHeader()
</script>

<template>
  <NavbarHeader
    v-if="showFixedNavbar"
    v-motion
    class="!fixed"
    :initial="{
      y: -50,
    }"
    :enter="{
      y: 0,
    }"
  />
</template>
