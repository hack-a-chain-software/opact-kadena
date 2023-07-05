<script setup lang="ts">
const currentStep = useAuthCurrentStep()
</script>

<template>
  <div class="text-white max-w-[450px]">
    <div>
      <button
        class="flex items-center space-x-[4px]"
        @click.prevent="currentStep = 'connect'"
      >
        <Icon name="chevron" class="rotate-[90deg]" />

        <span class="text-title text-[16px]"> Back </span>
      </button>
    </div>

    <div class="pt-2">
      <div>
        <h2 class="text-white font-title text-[40px]">
          Create Your Account
        </h2>
      </div>

      <div class="py-[25px]">
        <p
          class="
            pb-[25px]
            text-[18px]
            font-[500]
            leading-[26px]
            text-[#BDBDBD]
          "
        >
          Opact Wallet is a secure wallet and account
          manager for your accounts.
        </p>

        <p
          class="
            text-[18px]
            font-[500]
            leading-[26px]
            text-[#BDBDBD]
          "
        >
          Once you create an account, you’ll need it to
          interact with applications on Opact Ecosystem, and
          to securely store your tokens and collectibles
          (NFTs).
        </p>
      </div>

      <div>
        <Button
          text="Get Started"
          @click="currentStep = 'method'"
        />
      </div>
    </div>
  </div>
</template>
