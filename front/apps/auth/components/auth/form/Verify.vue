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

const verify = async () => {
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
</script>

<template>
  <div class="text-white max-w-[450px]">
    <div>
      <button
        class="flex items-center space-x-[4px]"
        @click.prevent="currentStep = 'method'"
      >
        <Icon name="chevron" class="rotate-[90deg]" />

        <span class="text-title text-[16px]">
          Restart
        </span>
      </button>
    </div>

    <div class="pt-2">
      <div>
        <h2 class="text-white font-title text-[40px]">
          Verify Phrase
        </h2>
      </div>

      <div class="py-[25px]">
        <p
          class="
            text-[18px]
            font-[500]
            leading-[26px]
            text-[#BDBDBD]
          "
        >
          Enter the following word from your recovery phrase
          to complete the setup process.
        </p>
      </div>

      <div>
        <div class="pb-[12px]">
          Word <strong v-text="randomNumber" />
        </div>

        <Input
          v-model="data.word"
          class="disabled:opacity-[0.4] !h-[32px]"
        />
      </div>

      <div class="pt-[30px]">
        <Button
          text="Verify & Complete"
          @click="verify()"
        />
      </div>
    </div>
  </div>
</template>
