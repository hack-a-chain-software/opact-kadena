<script setup lang="ts">
import { reactive } from 'vue'

import ReceiveModal from '../components/receive/ReceiveModal.vue'

definePageMeta({
  layout: 'app',
  middleware: 'auth'
})

useHead({
  title: 'App'
})

const data = reactive({
  showReceiveModal: false
})

const router = useRouter()
</script>

<template>
  <div class="h-full pt-4">
    <div class="flex justify-between">
      <div>
        <div class="pb-[2px]">
          <span class="text-font-2 text-xxs font-medium">
            Balance
          </span>
        </div>

        <div class="flex items-center space-x-4">
          <div>
            <span class="text-lg font-medium text-font-1">
              900.34
            </span>
          </div>

          <div>
            <Icon name="visible" class="w-6 h-6" />
          </div>
        </div>
      </div>

      <div class="mt-auto">
        <button
          disabled
          class="
            text-blue-300
            flex
            items-center
            justify-center
            space-x-2
            opacity-[0.5]
            cursor-not-allowed
          "
        >
          <span class="font-xs font-regular">
            History
          </span>

          <div>
            <Icon
              name="chevron"
              class="w-5 h-5 rotate-[-90deg]"
            />
          </div>
        </button>
      </div>
    </div>

    <div class="pt-[24px] gap-2 grid grid-cols-3">
      <button
        @click.prevent="router.push('/send')"
        class="bg-gray-800 rounded-[8px] py-3 px-4"
      >
        <div class="pb-2">
          <Icon name="send" class="w-6 h-6" />
        </div>

        <div>
          <span class="text-xxs font-medium text-font-1">
            Send
          </span>
        </div>
      </button>

      <button
        class="bg-gray-800 rounded-[8px] py-3 px-4"
        @click.prevent="data.showReceiveModal = true"
      >
        <div class="pb-2">
          <Icon name="receive" class="w-6 h-6" />
        </div>

        <div>
          <span class="text-xxs font-medium text-font-1">
            Receive
          </span>
        </div>
      </button>

      <button
        class="bg-gray-800 rounded-[8px] py-3 px-4"
        @click.prevent="router.push('/deposit')"
      >
        <div class="pb-2">
          <Icon name="add" class="w-6 h-6 text-font-1" />
        </div>

        <div>
          <span class="text-xxs font-medium text-font-1">
            Deposit
          </span>
        </div>
      </button>
    </div>

    <div class="pt-[24px] flex space-x-[24px]">
      <div class="px-2 pb-2 border-b-[1px] border-blue-400">
        <span class="text-sm font-medium text-font-1">
          Tokens
        </span>
      </div>

      <div
        class="px-2 pb-2 opacity-[0.5] cursor-not-allowed"
      >
        <span class="text-sm font-medium text-font-2">
          NFTs
        </span>
      </div>
    </div>

    <div class="pt-[16px] space-y-3">
      <div
        class="
          px-4
          py-2.5
          bg-gray-800
          rounded-[8px]
          h-[66px]
          flex
          items-center
        "
      >
        <div class="pr-4">
          <img src="/kda.png" />
        </div>

        <div class="space-y-1">
          <p
            class="
              text-xs
              font-regular
              opacity-[0.9]
              text-font-1
            "
          >
            KDA
          </p>

          <p
            class="
              text-font-2 text-xxs
              font-medium
              opacity-[0.9]
            "
          >
            $338,91
          </p>
        </div>

        <div class="ml-auto">
          <p
            class="
              text-sm
              font-medium
              text-font-1
              opacity-[0.9]
            "
          >
            700,94
          </p>
        </div>
      </div>

      <div
        class="
          px-4
          py-2.5
          bg-gray-800
          rounded-[8px]
          h-[66px]
          flex
          items-center
        "
      >
        <div class="pr-4">
          <img src="/kdx.png" />
        </div>

        <div class="space-y-1">
          <p
            class="
              text-xs
              font-regular
              opacity-[0.9]
              text-font-1
            "
          >
            KDX
          </p>

          <p
            class="
              text-font-2 text-xxs
              font-medium
              opacity-[0.9]
            "
          >
            $78,91
          </p>
        </div>

        <div class="ml-auto">
          <p
            class="
              text-sm
              font-medium
              text-font-1
              opacity-[0.9]
            "
          >
            199,4
          </p>
        </div>
      </div>
    </div>

    <div
      class="
        py-3
        fixed
        bottom-0
        left-0
        right-0
        flex
        px-[61px]
        justify-between
        border-t-[0.5px] border-[#5F6267]
      "
    >
      <button class="space-y-[4px]">
        <div>
          <Icon
            name="wallet"
            class="text-blue-400 w-6 h-6"
          />
        </div>

        <div>
          <span class="text-blue-400 text-xxxs font-medium">
            Home
          </span>
        </div>
      </button>

      <button
        disabled
        class="space-y-1 opacity-[0.5] cursor-not-allowed"
      >
        <div>
          <Icon name="chart" class="text-font-1 w-6 h-6" />
        </div>

        <div>
          <span class="text-font-1 text-xxxs font-medium">
            History
          </span>
        </div>
      </button>

      <button
        disabled
        class="space-y-1 opacity-[0.5] cursor-not-allowed"
      >
        <div>
          <Icon
            name="Settings"
            class="text-font-1 w-6 h-6"
          />
        </div>

        <div>
          <span class="text-font-1 text-xxxs font-medium">
            Settings
          </span>
        </div>
      </button>
    </div>
  </div>

  <ReceiveModal
    :show="data.showReceiveModal"
    @close="data.showReceiveModal = false"
  />
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
