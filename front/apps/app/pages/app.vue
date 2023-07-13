<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: 'auth'
})

useHead({
  title: 'App'
})
</script>

<template>
  <div class="">
    <div class="max-w-[580px] pt-2">
      <div>
        <h2 class="text-white font-title text-[40px]">
          Extensions
        </h2>
      </div>

      <div class="pt-[25px]">
        <p
          class="
            pb-[25px]
            text-[18px]
            font-[500]
            leading-[26px]
            text-[#BDBDBD]
          "
        >
          Extensions are responsible for connecting a common
          Wallet with your Opact Wallet and bringing your
          tokens to a secure environment.
        </p>
      </div>

      <div>
        <!-- <Tabs /> -->
      </div>
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
