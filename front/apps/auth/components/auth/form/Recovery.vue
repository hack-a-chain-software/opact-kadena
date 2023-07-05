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
    <div>
      <button
        class="flex items-center space-x-[4px]"
        @click.prevent="currentStep = 'connect'"
      >
        <Icon name="chevron" class="rotate-[90deg]" />

        <span class="text-title text-[16px]"> Back </span>
      </button>
    </div>

    <div class="pt-2">
      <div>
        <h2 class="text-white font-title text-[40px]">
          Recovery Your Wallet
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
          class="
            p-[2px]
            relative
            rounded-[12px]
            h-[42px]
            bg-card-gradient
          "
        >
          <div
            class="
              space-x-[8px]
              h-full
              w-full
              rounded-[12px]
              flex
              items-center
              pl-[8px]
              bg-inverted-card-gradient
            "
          >
            <span v-text="i + 1" class="select-none" />

            <span v-text="splited[i] || '-'" />
          </div>
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

      <div class="pt-[30px]">
        <Button
          text="Recovery"
          @click="recovery()"
          :disabled="!!!data.phrase"
        />
      </div>
    </div>
  </div>
</template>
