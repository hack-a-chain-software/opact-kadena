<script setup lang="ts">
import { onMounted } from 'vue'
// import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/apps/auth/stores/wallet'

const currentStep = useAuthCurrentStep()

const wallet = useWalletStore()
// const { connected } = storeToRefs(wallet)

onMounted(() => {
  wallet.newMnemonic()
})
</script>

<template>
  <div class="text-white max-w-[450px]">
    <div>
      <button
        class="flex items-center space-x-[4px]"
        @click.prevent="currentStep = 'method'"
      >
        <Icon name="chevron" class="rotate-[90deg]" />

        <span class="text-title text-[16px]"> Back </span>
      </button>
    </div>

    <div class="pt-2">
      <div>
        <h2 class="text-white font-title text-[40px]">
          Setup Your Secure Passphrase
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
          Write down the following words in order and keep
          them somewhere safe. Anyone with access to it will
          also have access to your account! You’ll be asked
          to verify your passphrase next.
        </p>
      </div>

      <div
        v-if="wallet.mnemonic"
        class="
          grid grid-cols-3
          gap-[12px]
          relative
          group
          cursor-pointer
        "
      >
        <div
          :key="word + i"
          v-for="(word, i) in wallet.mnemonic.split(' ')"
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

            <span v-text="word" />
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
            @click.prevent="wallet.copyToClipboard()"
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

            <span class="block"> Copy to Clipboard </span>
          </button>
        </div>
      </div>

      <div class="pt-[30px]">
        <Button
          text="Continue"
          @click="currentStep = 'verify'"
        />
      </div>
    </div>
  </div>
</template>
