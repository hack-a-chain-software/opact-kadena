<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'

const wallet = useWalletStore()

const { connected, isLoading, node } = storeToRefs(wallet)

const computeState = (secret: any) => {
  return new Promise((resolve) => {
    const worker = new Worker('/data.41198612.js', { type: 'module' })
    worker.postMessage({ input: { secret } })

    worker.addEventListener('message', (e) => {
      if (e.data.type === 'done') {
        resolve(e.data.payload)
        worker.terminate()
      }
    }, false)
  })
}

onBeforeMount(() => {
  wallet.reconnect()
})

watch(node, async (newState) => {
  if (!newState) {
    return
  }

  console.log('fooo', newState.pvtkey)

  const state = await computeState(newState.pvtkey)
  wallet.getUserData(state)
})
</script>

<template>
  <div class="min-h-screen pb-[40px] flex flex-col lg:flex-row lg:w-full bg-dark-blue overflow-hidden relative">
    <div
      v-if="!connected || isLoading"
      class="h-full w-full flex items-center justify-center"
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
