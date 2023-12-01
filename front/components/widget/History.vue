<script lang="ts" setup>
import { useOpactWallet } from '~/hooks/opact-wallet';
import { useAppState } from '~/hooks/state'

const { receipts } = useAppState()

const router = useRouter()

const { account } = useOpactWallet()
</script>

<template>
  <div>
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
      <div
        class="pb-[16px] flex justify-between items-center"
      >
        <div>
          <span class="text-sm text-font-1">
            Last Actions
          </span>
        </div>

        <button
          @click.prevent="router.push('history')"
          class="
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:opacity-80
          "
        >
          <span class="text-xxs text-blue-400">
            View All
          </span>
        </button>
      </div>

      <div class="flex flex-col gap-3">
        <div
          v-if="receipts?.length > 0"
          class="flex flex-col gap-3"
        >
          <HistoryWidgetItem
            v-bind="receipt"
            :key="receipt.date"
            :pubkey="account.pubkey"
            v-for="receipt in receipts?.slice(0, 5)"
          />
        </div>

        <div
          v-else
          class="
            flex
            justify-center
            py-[38px]
            flex-col
            items-center
            space-y-8
          "
        >
          <div>
            <img
              class="w-[120px]"
              src="/empty-receipts.png"
            />
          </div>

          <span class="text-font-2 text-[16px] font-[600]">
            You don't have any activity yet
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
