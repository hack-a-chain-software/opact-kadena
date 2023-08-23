<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useWalletStore } from '~/apps/auth/stores/wallet'

const currentStep = useAuthCurrentStep()

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
  await wallet.recovery(data.phrase)

  router.push((route.query as any).next || '/app')
  currentStep.value = 'connect'
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
  <div class="text-white max-w-[450px]">
    <div
      class="
        w-full
        py-4
        flex
        justify-center
        relative
        items-center
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
          Recover Wallet
        </h1>
      </div>
    </div>

    <div class="pt-[32px]">
      <div>
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
          :key="'recovery-word-' + i"
          v-for="(_, i) in 12"
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

        <div
          class="
            hidden
            absolute
            top-0
            z-[10]
            inset-0
            group-hover:flex
            items-center
            backdrop-blur-sm
            justify-center
            bg-white/5
            rounded-[12px]
            group-active:bg-white/10
          "
        >
          <button
            @click.prevent="toPaste"
            class="
              flex
              items-center
              justify-center
              space-x-[4px]
              w-full
              h-full
            "
          >
            <Icon name="menu" class="w-max h-[28px]" />

            <span class="block"> Click to paste </span>
          </button>
        </div>
      </div>

      <div class="pt-[265px]">
        <button
          :disabled="!!!data.phrase"
          class="
            w-full
            flex
            items-center
            justify-center
            h-[44px]
            py-3
            px-4
            rounded-[12px]
            relative
            disabled:cursor-not-allowed
          "
          :class="
            !!!data.phrase
              ? 'bg-gray-700'
              : 'bg-blue-gradient'
          "
          @click.prevent="recovery()"
        >
          <span class="text-font-1"> Create Wallet </span>
        </button>
      </div>
    </div>
  </div>
</template>
