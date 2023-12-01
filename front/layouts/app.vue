<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { loadArtifact } from 'opact-sdk'
import { useAppState } from '~/hooks/state'
import { useOpactWallet } from '~/hooks/opact-wallet';

const { isLoading, loadAppState } = useAppState()

const { account, connected } = useOpactWallet()

onBeforeMount(() => {
  loadArtifact()
})

watch(
  account,
  (newNode) => {
    if (!newNode) {
      return
    }

    loadAppState(newNode.pvtkey)
  },
  {
    immediate: true
  }
)
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

      <LayoutMobileTopbar />

      <div
        class="
          px-4
          lg:w-full lg:pt-[96px]
          relative
          z-[2]
          pl-4
          lg:pl-[135px]
          xl:pl-[276px]
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
~/layers/auth/composables/opact-wallet
