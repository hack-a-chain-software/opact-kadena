<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <UICardBody>
    <div
      class="mx-auto"
    >
      <img src="/images/feedback/success.png" class="w-[100px]" />
    </div>

    <div class="mx-auto flex flex-col gap-3">
      <span
class="
        text-font-1
        text-xl
        font-[600]
      ">
        Payment Complete
      </span>

      <span
        class="
          text-font-2
          text-xs
        "
      >
        Thank you for using Opact Invoices
      </span>
    </div>

    <UIButtonInline
      @click.prevent="router.push('/')"
      label="Create or go to your Opact Wallet"
    />
  </UICardBody>
</template>
