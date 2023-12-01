<script setup lang="ts">
const emits = defineEmits(['changeStep'])
</script>

<template>
  <UIFormLayout>
    <UIFormHeader
      title="Create Wallet"
      subtitle="Choose a Security Method"
      @changeStep="emits('changeStep', 'connect')"
    />

    <div class="pt-4">
      <div>
        <p
          class="
            text-xs
            font-regular
            text-font-2
            lg:text-xs lg:font-[400] lg:leading-[22.4px]
          "
        >
          Select a method to secure and recover your
          account. This will be used to verify important
          activity, recover your account and access your
          account from other devices.
        </p>
      </div>

      <div class="pt-6">
        <div class="pb-[20px]">
          <h3
            class="
              text-font-1 text-sm
              font-medium
              lg:text-[18px]
              lg:font-[500]
              lg:leading-[25.2px]
            "
          >
            Which Receiving Method
          </h3>
        </div>

        <div class="space-y-4">
          <button
            class="
              p-4
              bg-gray-600
              rounded-[8px]
              relative
              w-full
              hover:opacity-90
            "
            @click.prevent="emits('changeStep', 'mnemonic')"
          >
            <div class="text-left space-y-[8px]">
              <p
                class="
                  text-xs
                  font-regular
                  text-font-1
                  lg:text-xs
                  lg:font-[400]
                  lg:leading-[22.4px]
                "
              >
                Secure Passphrase
              </p>

              <p
                class="
                  text-xs
                  font-regular
                  text-font-2
                  lg:text-xxs
                  lg:font-[500]
                  lg:leading-[19.6px]
                "
              >
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
              <p
                class="
                  text-xs
                  font-regular
                  text-font-1
                  lg:text-xs
                  lg:font-[400]
                  lg:leading-[22.4px]
                "
              >
                Ledger Hardware Wallet
              </p>

              <p
                class="
                  text-xs
                  font-regular
                  text-font-2
                  lg:text-xxs
                  lg:font-[500]
                  lg:leading-[19.6px]
                "
              >
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
  </UIFormLayout>
</template>
