<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
import { loadArtifacts } from 'opact-sdk'
import { useAppState } from '~/hooks/state'
import { useWalletStore } from '~/stores/wallet'

const wallet = useWalletStore()

const {
  isLoading,
  loadAppState
} = useAppState()

const { connected, node } = storeToRefs(wallet)

onBeforeMount(() => {
  loadArtifacts()
  wallet.reconnect()
})

watch(node, (newNode) => {
  if (!newNode) {
    return
  }

  loadAppState(newNode.pvtkey)
})
</script>

<template>
  <div class="min-h-screen pb-[40px] flex flex-col lg:flex-row lg:w-full bg-dark-blue overflow-hidden relative">
    <div
      v-if="!connected || isLoading"
      class="flex items-center justify-center absolute bg-dark-blue h-screen w-screen z-[99999]"
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

      <div class="px-4 lg:w-full lg:pt-[96px] relative z-[2]">
        <slot />
      </div>
    </template>
  </div>
</template>
