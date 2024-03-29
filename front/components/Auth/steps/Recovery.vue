<script setup lang="ts">
import { reactive, computed } from 'vue'
import { validateMnemonic } from 'opact-sdk'
import { useWalletStore } from '~/stores/wallet'

const wallet = useWalletStore()

const emits = defineEmits(['changeStep'])

const router = useRouter()
const route = useRoute()

const data = reactive({
  phrase: '',
  words: []
})

const isValid = computed(() => {
  return validateMnemonic(data.words.join(' '))
})

const recovery = async () => {
  const phrase = data.words.join(' ')

  await wallet.connect(phrase)

  router.push((route.query as any).next || '/')
}

const toPaste = async () => {
  const text = await navigator.clipboard.readText()

  const pastedWords = text.split(' ').filter((word: string) => !!word)

  if (pastedWords.length !== 12 || !validateMnemonic(text)) {
    return
  }

  data.phrase = text
  data.words = pastedWords as any
}
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
            text-font-2
            font-regular
            text-xs
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
        class="
          grid grid-cols-3
          gap-[12px]
          relative
          group
          lg:p-4
          cursor-pointer
        "
      >
        <div
          v-for="(_, i) in 12"
          :key="'recovery-word-' + i"
          class="p-3 rounded-[8px] bg-gray-700 space-x-2 flex items-center justify-center"
        >
          <span
            class="
              block
              select-none
              text-xxs
              font-medium
              text-font-2
              lg:text-xxs lg:font-[500] lg:leading-[19.6px]
            "
            v-text="i + 1"
          />

          <input
            class="
              select-none
              text-xxs
              font-medium
              text-font-1
              lg:text-xxs
              w-full
              font-[500]
              bg-transparent
              border-none
              outline-none
              p-0
              leading-[19.6px]
              border-transparent focus:border-transparent focus:ring-0
            "
            v-model="data.words[i]"
          >
        </div>
      </div>

      <div class="pt-2 flex justify-end">
        <button
          class="
            px-3
            py-1
            flex
            space-x-2
            text-blue-400
            focus:text-green-500
          "
          @click.prevent="toPaste"
        >
          <span class="text-xs font-regular opacity-[0.9]">
            Paste Passphrase
          </span>

          <Icon name="copy" class="h-6 w-6" />
        </button>
      </div>
    </div>

    <UIFormFooter
      label="Recovery"
      :disabled="!isValid"
      @click.prevent="recovery()"
    />
  </UIFormLayout>
</template>
