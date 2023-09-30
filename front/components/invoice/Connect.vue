<script lang="ts" setup>
const emits = defineEmits(['changeStep'])
</script>

<template>
  <div>
    <div>
      <span class="text-md text-font-1">
        Payment Request
      </span>
    </div>

    <div class="pt-2">
      <span class="text-xs text-font-2">
        "Opact user" requested a payment of 100 KDA. Connect
        your wallet to proceed.
      </span>
    </div>

    <div class="pt-6">
      <button
        class="
          w-full
          flex
          items-center
          justify-center
          h-[44px]
          py-3
          px-4
          rounded-[12px]
          relative
          disabled:cursor-not-allowed
          bg-blue-gradient
        "
        @click.prevent="emits('changeStep', 'provider')"
      >
        <span class="text-font-1"> Connect Wallet </span>
      </button>
    </div>
  </div>
</template>
