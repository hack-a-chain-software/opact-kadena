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
      title: 'Mnemonic Copied'
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
  <UIFormLayout>
    <UIFormHeader
      title="Create Wallet"
      subtitle="Setup Your Secure Passphrase"
      @changeStep="emits('changeStep', 'connect')"
    />

    <div class="pt-4">
      <div class="pb-6">
        <p
          class="
            text-font-2 text-xs
            font-regular
            lg:text-xs lg:font-[400] lg:leading-[22.4px]
          "
        >
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
          lg:p-4
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
              text-font-2
              lg:text-xxs lg:font-[500] lg:leading-[19.6px]
            "
            v-text="i + 1"
          />

          <span
            class="
              select-none
              text-xxs
              font-medium
              text-font-1
              lg:text-xxs
              font-[500]
              leading-[19.6px]
            "
            v-text="word"
          />
        </div>
      </div>

      <div class="pt-2 flex items-center justify-end">
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
    </div>

    <UIFormFooter
      label="Verify Passphrase"
      @click="emits('changeStep', 'verify')"
    />
  </UIFormLayout>
</template>
