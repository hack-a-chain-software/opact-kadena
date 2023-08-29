<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import Settings from '../components/Settings.vue'
import { useWalletStore } from '~/apps/auth/stores/wallet'

const wallet = useWalletStore()

const { connected } = storeToRefs(wallet)

const data = reactive({
  showSettings: false
})

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
        name="minilogo"
        class="animate-spin text-white w-8 h-8"
      />
    </div>

    <template v-else>
      <div
        class="
          h-[60px]
          py-3
          px-6
          flex
          justify-between
          items-center
          pt-8
        "
      >
        <div>
          <Icon name="minilogo" class="w-[30px] h-[30px]" />
        </div>

        <div>
          <button
            class="
              flex
              items-center
              justify-center
              rounded-[30px]
              px-4
              py-2.5
              bg-gray-800
              space-x-2
            "
          >
            <span class="text-xxxs font-medium text-font-1">
              KADENA
            </span>

            <div class="mr-[-4px]">
              <Icon
                name="chevron"
                class="w-5 h-5 mb-0.5 text-white"
              />
            </div>
          </button>
        </div>

        <div>
          <button
            class="
              rounded-full
              bg-gray-800
              w-9
              h-9
              flex
              items-center
              justify-center
            "
            @click.prevent="data.showSettings = true"
          >
            <Icon
              name="settings"
              class="w-5 h-5 text-font-1"
            />
          </button>
        </div>
      </div>

      <div class="px-4">
        <slot />
      </div>
    </template>

    <Settings
      :show="data.showSettings"
      @close="data.showSettings = false"
    />
  </div>
</template>
