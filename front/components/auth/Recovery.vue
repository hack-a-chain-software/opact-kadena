<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useWalletStore } from '~/stores/wallet'

const emits = defineEmits(['changeStep'])

const router = useRouter()
const route = useRoute()

const wallet = useWalletStore()

const data = reactive({
  phrase: ''
})

const splited = computed(() => {
  if (!data.phrase) {
    return []
  }

  return data.phrase.split(' ')
})

const recovery = async () => {
  await wallet.found(data.phrase)

  router.push((route.query as any).next || '/home')
}

const toPaste = async () => {
  const text = await navigator.clipboard.readText()

  if (text.split(' ').length !== 12) {
    return
  }

  data.phrase = text
}
</script>

<template>
  <div
    class="
      text-white
      max-w-[450px]
      lg:h-auto
      lg:mt-[150px]
      lg:p-6
      lg:bg-gray-900
      lg:w-[546px]
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
          Recover Wallet
        </h1>
      </div>
    </div>

    <div class="pt-[32px] lg:pt-0">
      <div class="flex space-x-4 items-center">
        <button
          class="flex items-center space-x-[4px]"
          @click.prevent="emits('changeStep', 'connect')"
        >
          <Icon name="chevronLeft" class="h-8 w-8" />
        </button>

        <h2 class="text-md text-font-1 font-medium">
          Setup Your Secure Passphrase
        </h2>
      </div>

      <div class="pt-4 pb-[32px]">
        <p class="text-font-2 font-regular text-xs">
          Paste your passphrase below to recover your
          account.
        </p>
      </div>

      <div
        class="
          grid grid-cols-3
          gap-[12px]
          relative
          group
          cursor-pointer
        "
      >
        <div
          v-for="(_, i) in 12"
          :key="'recovery-word-' + i"
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
            v-text="splited[i] || '-'"
          />
        </div>
      </div>

      <div class="pt-4 flex justify-end">
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

      <div class="pt-[250px] lg:pt-[56px]">
        <ButtonInline
          label="Create Wallet"
          :disabled="!!!data.phrase"
          @click.prevent="recovery()"
        />
      </div>
    </div>
  </div>
</template>
