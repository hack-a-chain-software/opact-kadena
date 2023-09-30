<script lang="ts" setup>
import { reactive } from 'vue'
import ReceiveModal from '~/apps/app/components/receive/ReceiveModal.vue'

const router = useRouter()

const data = reactive({
  tab: 'tokens',
  showReceiveModal: false
})
</script>

<template>
  <div
    class="hidden lg:block p-6 bg-[#0E1319] rounded-[12px] border-[2px] border-gray-600 h-auto row-span-1"
  >
    <div
      class="pb-[16px]"
    >
      <span
        class="
          text-sm text-font-1
        "
      >
        Actions
      </span>
    </div>

    <div class="gap-2 grid grid-cols-3">
      <button
        class="bg-gray-800 rounded-[8px] h-[72px] px-4"
        @click.prevent="router.push('/send')"
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
        class="bg-gray-800 rounded-[8px] h-[72px] px-4"
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
        class="bg-gray-800 rounded-[8px] px-4 h-[72px]"
        @click.prevent="router.push('/deposit/token')"
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

  <ReceiveModal
    :show="data.showReceiveModal"
    @close="data.showReceiveModal = false"
  />
</template>
