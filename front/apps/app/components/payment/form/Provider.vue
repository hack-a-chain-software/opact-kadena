<script lang="ts" setup>
const { step } = usePaymentForm()

const chains = getChains()
</script>

<template>
  <div class="w-full">
    <div>
      <span class="text-md text-font-1">
        Select Your Wallet
      </span>
    </div>

    <div class="w-full max-w-md pt-4">
      <ul class="w-full space-y-[14px] gap-3">
        <TabItem
          v-for="provider in chains[0].providers"
          :key="provider.id"
          :chain="provider.key"
          v-bind="provider"
          class="w-full"
          @connected="step = 'pay'"
        />
      </ul>
    </div>
  </div>
</template>
