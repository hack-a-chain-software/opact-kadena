<script setup lang="ts">
import { useWalletStore } from '~/apps/auth/stores/wallet'

definePageMeta({
  layout: 'app',
  middleware: 'auth'
})

useHead({
  title: 'App'
})

const router = useRouter()

const { encrypt } = useWalletStore()
</script>

<template>
  <div class="">
    <div class="max-w-[580px] pt-2">
      <div>
        <h2 class="text-white font-title text-[40px]">
          Encrypt
        </h2>
      </div>

      <div class="pt-[25px]">
        <p
          class="
            pb-[25px]
            text-[18px]
            font-[500]
            leading-[26px]
            text-[#BDBDBD]
          "
        >
          Opact Wallet uses encrypted data
        </p>
      </div>

      <div class="flex flex-col space-y-[12px]">
        <Button
          text="Encrypt"
          class="!h-[32px]"
          @click="encrypt()"
        />

        <Button
          text="Deposit"
          class="!h-[32px]"
          @click="router.push('/deposit')"
        />
      </div>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
