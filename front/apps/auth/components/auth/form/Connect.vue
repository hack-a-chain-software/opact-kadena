<script setup>
const currentStep = useAuthCurrentStep()
</script>

<template>
  <div class="flex flex-col space-y-[24px]">
    <div class="flex flex-col space-y-[14px] max-w-[400px]">
      <h2 class="text-white font-title text-[40px]">
        Connect your private address
      </h2>

      <p
        class="
          text-[18px]
          font-[500]
          leading-[26px]
          text-[#BDBDBD]
        "
      >
        Choose how you want to connect. Web3 like you never
        imagined.
      </p>
    </div>

    <div class="flex flex-col space-y-[8px]">
      <Button
        text="Recover Wallet"
        class="min-w-[200px]"
        @click="currentStep = 'recovery'"
      />

      <Button
        variant="secondary"
        text="Create Wallet"
        class="!h-[32px] min-w-[200px]"
        @click="currentStep = 'create'"
      />
    </div>
  </div>
</template>
