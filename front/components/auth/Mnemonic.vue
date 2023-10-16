<script setup lang="ts">
import { reactive } from 'vue'
import { generateMnemonic } from 'opact-sdk'

const { $toaster } = useNuxtApp()

const data = reactive({
  mnemonic: ''
})

const emits = defineEmits(['changeStep', 'mnemonic'])

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(data.mnemonic)

    $toaster.info({
      type: 'info',
      title: 'Mnemonic Copied',
    })
  } catch (e) {
    console.warn(e)
  }
}

onMounted(() => {
  const mnemonic = generateMnemonic()

  data.mnemonic = mnemonic

  emits('mnemonic', mnemonic)
})
</script>

<template>
  <div
    class="text-white max-w-[450px]
      lg:h-auto
      lg:p-6
      lg:mt-[150px]
      lg:bg-gray-900
      lg:w-[546px]
      lg:border-2 lg:border-gray-600 lg:rounded-[12px]"
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
        @click.prevent="currentStep = 'connect'"
      >
        <Icon name="chevronLeft" class="h-6 w-6" />
      </button>

      <div>
        <h1 class="text-xs text-font-1 font-medium">
          Create Wallet
        </h1>
      </div>
    </div>

    <div class="pt-[32px] lg:pt-0">
      <div
        class="flex space-x-4 items-center"
      >
        <button
          class="
            flex
            items-center
            space-x-[4px]
          "
          @click.prevent="emits('changeStep', 'connect')"
        >
          <Icon name="chevronLeft" class="h-8 w-8" />
        </button>

        <h2 class="text-md text-font-1 font-medium">
          Setup Your Secure Passphrase
        </h2>
      </div>

      <div class="pt-4 pb-[32px]">
        <p class="text-font-2 text-xs font-regular">
          Write down the following words in order and keep
          them somewhere safe. Anyone with access to it will
          also have access to your account! You’ll be asked
          to verify your passphrase next.
        </p>
      </div>

      <div
        v-if="data.mnemonic"
        class="
          grid grid-cols-3
          gap-y-[12px] gap-x-[8px]
          relative
          group
        "
      >
        <div
          v-for="(word, i) in data.mnemonic.split(' ')"
          :key="word + i"
          class="p-3 rounded-[8px] bg-gray-700 space-x-2"
        >
          <span
            class="
              select-none
              text-xxs
              font-medium
              text-font-1
            "
            v-text="i + 1"
          />

          <span
            class="
              select-none
              text-xxs
              font-medium
              text-font-1
            "
            v-text="word"
          />
        </div>
      </div>

      <div class="pt-4 flex items-center justify-end">
        <button
          class="
            px-3
            py-1
            flex
            space-x-2
            text-blue-400
            focus:text-green-500
          "
          @click.prevent="copyToClipboard()"
        >
          <span class="text-xs font-regular opacity-[0.9]">
            Copy Passphrase
          </span>

          <Icon name="copy" class="h-6 w-6" />
        </button>
      </div>

      <div class="pt-[165px] lg:pt-[56px]">
        <ButtonInline
          label="Next"
          @click.prevent="emits('changeStep', 'verify')"
        />
      </div>
    </div>
  </div>
</template>
