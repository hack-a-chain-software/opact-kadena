<script setup lang="ts">
const emits = defineEmits(['changeStep'])
</script>

<template>
  <div
    class="
      text-white
      max-w-[450px]
      lg:h-auto
      lg:p-6
      lg:bg-gray-900
      lg:w-[546px]
      lg:mt-[150px]
      lg:border-2
      lg:border-gray-600
      lg:rounded-[12px]
    "
  >
    <div
      class="
        w-full
        py-4
        flex
        justify-center
        relative
        items-center
        lg:hidden
      "
    >
      <button
        class="
          flex
          items-center
          space-x-[4px]
          h-6
          absolute
          top-4
          left-0
        "
        @click.prevent="emits('changeStep', 'connect')"
      >
        <Icon name="chevronLeft" class="h-6 w-6" />
      </button>

      <div>
        <h1 class="text-xs text-font-1 font-medium">
          Create Wallet
        </h1>
      </div>
    </div>

    <div class="pt-8 lg:pt-0">
      <div class="flex space-x-4 items-center">
        <button
          class="flex items-center space-x-[4px]"
          @click.prevent="emits('changeStep', 'connect')"
        >
          <Icon name="chevronLeft" class="h-8 w-8" />
        </button>

        <h2 class="text-font-1 text-md font-medium">
          Choose a Security Method
        </h2>
      </div>

      <div class="pt-[16px]">
        <p class="text-xs font-regular text-font-2">
          Select a method to secure and recover your
          account. This will be used to verify important
          activity, recover your account and access your
          account from other devices.
        </p>
      </div>

      <div class="pt-6">
        <div class="pb-[20px]">
          <h3 class="text-font-1 text-sm font-medium">
            Which Receiving Method
          </h3>
        </div>

        <div class="space-y-4">
          <button
            class="
              p-4
              bg-gray-700
              rounded-[8px]
              relative
              w-full
            "
            @click.prevent="emits('changeStep', 'mnemonic')"
          >
            <div class="text-left space-y-[8px]">
              <p class="text-xs font-regular text-font-1">
                Secure Passphrase
              </p>

              <p class="text-xs font-regular text-font-2">
                Generate and safely store a unique
                passphrase.
              </p>
            </div>

            <div
              class="
                absolute
                right-[16px]
                top-[25px]
                shrink-0
              "
            >
              <Icon
                name="chevronLeft"
                class="h-7 w-7 rotate-[180deg]"
              />
            </div>
          </button>

          <button
            disabled
            class="
              p-4
              w-full
              bg-gray-700
              rounded-[8px]
              relative
              disabled:opacity-[0.5]
              disabled:cursor-not-allowed
            "
          >
            <div class="text-left space-y-[8px]">
              <p class="text-xs font-regular text-font-1">
                Ledger Hardware Wallet
              </p>

              <p class="text-xs font-regular text-font-2">
                Secure your account with a Ledger hardware
                device.
              </p>
            </div>

            <div
              class="
                absolute
                right-[16px]
                top-[25px]
                shrink-0
              "
            >
              <Icon
                name="chevronLeft"
                class="h-7 w-7 rotate-[180deg]"
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
