<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/apps/auth/stores/wallet'

const wallet = useWalletStore()

const { connected, truncatedAddress } = storeToRefs(wallet)

// const showLoader = useAppShowLoader

onBeforeMount(() => {
  if (!connected.value) {
    wallet.reconnect()
  }
})
</script>

<template>
  <div class="h-screen flex flex-col bg-dark-blue">
    <div
      v-if="!connected"
      class="h-full w-full flex items-center justify-center"
    >
      <Icon
        name="spinner"
        class="animate-spin text-white"
      />
    </div>

    <template v-else>
      <div class="p-8 flex justify-between items-center">
        <Logo class="flex justify-center mb-5" />

        <div
          class="
            flex
            items-center
            justify-center
            space-x-[12px]
          "
        >
          <span v-if="connected" class="text-white">
            {{ truncatedAddress }}
          </span>

          <Button
            variant="secondary"
            text="Logout"
            class="!h-[32px]"
            @click="wallet.logout()"
          />
        </div>
      </div>

      <div class="px-[32px] h-full pt-[32px]">
        <slot />
      </div>

      <div
        class="
          absolute
          bottom-0
          z-[1]
          left-0
          right-0
          pointer-events-none
        "
      >
        <figure>
          <NuxtImg
            width="1440px"
            src="/footer-bg.png"
            class="h-[400px] w-full"
          />
        </figure>
      </div>
    </template>
  </div>
</template>
