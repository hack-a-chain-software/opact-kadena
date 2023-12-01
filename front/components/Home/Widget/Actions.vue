<script lang="ts" setup>
import { reactive } from 'vue'

const data = reactive({
  tab: 'tokens',
  show: false,
  showTransfer: false
})
</script>

<template>
  <div
    class="
      hidden
      lg:block
      p-6
      bg-[#0E1319]
      rounded-[12px]
      border-[2px] border-gray-600
      h-auto
      row-span-1
    "
  >
    <div class="pb-[16px]">
      <span class="text-sm text-font-1"> Actions </span>
    </div>

    <div class="gap-2 grid grid-cols-3">
      <button
        class="
          bg-gray-800
          rounded-[8px]
          h-[72px]
          px-4
          hover:opacity-80
        "
        @click.prevent="data.showTransfer = true"
      >
        <div class="pb-1">
          <Icon name="send" class="w-6 h-6" />
        </div>

        <div>
          <span class="text-xxs font-medium text-font-1">
            Send
          </span>
        </div>
      </button>

      <button
        class="
          bg-gray-800
          rounded-[8px]
          h-[72px]
          px-4
          hover:opacity-80
        "
        @click.prevent="data.showReceiveModal = true"
      >
        <div class="pb-1">
          <Icon name="receive" class="w-6 h-6" />
        </div>

        <div>
          <span class="text-xxs font-medium text-font-1">
            Receive
          </span>
        </div>
      </button>

      <button
        class="
          bg-gray-800
          rounded-[8px]
          px-4
          h-[72px]
          hover:opacity-80
        "
        @click.prevent="data.show = true"
      >
        <div class="pb-1">
          <Icon name="add" class="w-6 h-6 text-font-1" />
        </div>

        <div>
          <span class="text-xxs font-medium text-font-1">
            Deposit
          </span>
        </div>
      </button>
    </div>
  </div>

  <DepositModal
    :show="data.show"
    @close="data.show = false"
  />

  <TransferModal
    :show="data.showTransfer"
    @close="data.showTransfer = false"
  />
</template>
