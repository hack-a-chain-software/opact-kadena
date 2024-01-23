<script setup lang="ts">
import { storeToRefs } from 'pinia'
// import { loadArtifact } from 'opact-sdk'
import { onBeforeMount } from 'vue'
import { useAppStore } from '~/stores/app'
import { useWalletStore } from '~/stores/wallet'

const wallet = useWalletStore()

const app = useAppStore()

const { isLoading } = storeToRefs(app)

const { connected, account } = storeToRefs(wallet)

onBeforeMount(() => {
  wallet.reconnect()
})

// onMounted(() => {
//   loadArtifact()
// })

watch(account, (newAccount) => {
  if (!newAccount) {
    return
  }

  app.initApp(newAccount)
})
</script>

<template>
  <div
    class="
      min-h-screen
      pb-[40px]
      flex flex-col
      lg:flex-row lg:w-full
      bg-dark-blue
      overflow-hidden
      relative
    "
  >
    <div
      v-if="!connected || isLoading"
      class="
        flex
        items-center
        justify-center
        absolute
        bg-dark-blue
        h-screen
        w-screen
        z-[99999]
      "
    >
      <Icon
        name="minilogo"
        class="animate-spin text-white w-8 h-8 min-h-screen"
      />
    </div>

    <template v-else>
      <LayoutSidebar />

      <LayoutTopbar />

      <LayoutBottombar />

      <div
        class="
          px-4
          lg:w-full lg:pt-[96px]
          relative
          z-[2]
          pl-4
          lg:pl-[135px]
          xl:pl-[276px]
          pb-[78.45px] lg:pb-0
        "
      >
        <slot />
      </div>
    </template>
  </div>
</template>

<style>
body {
  position: relative;
}
</style>
