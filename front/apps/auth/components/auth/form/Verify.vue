<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useWalletStore } from '~/apps/auth/stores/wallet'

const router = useRouter()
const route = useRoute()

const data = reactive({
  word: ''
})

const currentStep = useAuthCurrentStep()

const wallet = useWalletStore()

const randomNumber = computed(() => {
  return Math.floor(
    Math.random() * (12 - 1 + 1) + 1
  ) as Number
})

const create = async () => {
  const isValid = wallet.verifyMnemonic(
    data.word,
    Number(randomNumber.value) - 1
  )

  if (!isValid) {
    return
  }

  await wallet.found()

  router.push((route.query as any).next || '/app')
  currentStep.value = 'connect'
}

const isDisabled = computed(() => {
  return (
    wallet.node.mnemonic.phrase.split(' ')[
      Number(randomNumber.value) - 1
    ] === data.word
  )
})
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
        <span class="text-blue-400 text-xxs font-medium">
          Restart
        </span>
      </button>

      <div>
        <h1 class="text-xs text-font-1 font-medium">
          Create Wallet
        </h1>
      </div>
    </div>

    <div class="pt-[32px]">
      <div>
        <h2 class="text-md text-font-1 font-medium">
          Verify Phrase
        </h2>
      </div>

      <div class="pt-[16px] pb-[32px]">
        <p class="text-xs font-regular text-font-2">
          Enter the following word from your recovery phrase
          to complete the setup process.
        </p>
      </div>

      <div>
        <div class="pb-[8px] text-xxs font-medium">
          Word <strong v-text="randomNumber" />
        </div>

        <input
          v-model="data.word"
          placeholder="Enter the corresponding word"
          class="
            text-xxs text-font-2
            font-medium
            placeholder:opacity-[0.9]
            h-[52px]
            w-full
            p-4
            bg-transparent
            border-[1.5px] border-gray-700
            rounded-[8px]
            outline-none
          "
        />
      </div>

      <div class="pt-[397px]">
        <button
          :disabled="!isDisabled"
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
            !isDisabled ? 'bg-gray-700' : 'bg-blue-gradient'
          "
          @click.prevent="create()"
        >
          <span class="text-font-1"> Create Wallet </span>
        </button>
      </div>
    </div>
  </div>
</template>
