<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: 'auth'
})

useHead({
  title: 'Home'
})
</script>

<template>
  <div>
    <LayoutMobileTopbar />

    <div
      class="
        lg:w-full
        h-full
        pt-6
        lg:pt-0
        lg:gap-6
        lg:grid
        lg:grid-cols-[minmax(auto,_698px)_400px]
        lg:grid-rows-[141px_1fr]
        lg:justify-center
      "
    >
      <HomeWidgetTokens />

      <HomeWidgetActions />

      <HomeWidgetHistory />
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
