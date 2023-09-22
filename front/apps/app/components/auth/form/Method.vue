<script setup lang="ts">
const currentStep = useAuthCurrentStep()
</script>

<template>
  <div class="text-white max-w-[450px]">
    <div>
      <button
        class="flex items-center space-x-[4px]"
        @click.prevent="currentStep = 'create'"
      >
        <Icon name="chevron" class="rotate-[90deg]" />

        <span class="text-title text-[16px]"> Back </span>
      </button>
    </div>

    <div class="pt-2">
      <div>
        <h2 class="text-white font-title text-[40px]">
          Choose a Security Method
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
          Select a method to secure and recover your
          account. This will be used to verify important
          activity, recover your account and access your
          account from other devices.
        </p>
      </div>

      <div>
        <div class="pb-[20px]">
          <h3 class="font-[600]">
            Most Secure (Recommended)
          </h3>
        </div>

        <div>
          <RadioGroup />
        </div>
      </div>

      <div class="pt-[30px]">
        <Button
          text="Secure My Account"
          @click="currentStep = 'mnemonic'"
        />
      </div>
    </div>
  </div>
</template>
