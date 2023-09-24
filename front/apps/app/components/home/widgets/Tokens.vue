<script lang="ts" setup>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'

const wallet = useWalletStore()

const { userData } = storeToRefs(wallet)

const router = useRouter()

const data = reactive({
  tab: 'tokens',
  showReceiveModal: false
})
</script>

<template>
  <div
    class="
      h-full
      lg:row-span-full
    "
  >
    <div
      class="
        lg:h-auto
        lg:p-6
        lg:bg-gray-900
        lg:w-full
        lg:border-2 lg:border-gray-600 lg:rounded-[12px]
      "
    >
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
                0 USD
              </span>
            </div>

            <div>
              <Icon name="visible" class="w-6 h-6" />
            </div>
          </div>
        </div>

        <div class="mt-auto lg:hidden">
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

      <div class="lg:hidden pt-[24px] gap-2 grid grid-cols-3">
        <button
          class="bg-gray-800 rounded-[8px] py-3 px-4"
          @click.prevent="router.push('/send')"
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

      <div class="pt-[24px] lg:pt-8 flex space-x-[24px]">
        <button
          :class="
            data.tab === 'tokens' &&
              'border-b-[1px] border-blue-400 !opacity-100'
          "
          class="px-2 pb-2 opacity-[0.5]"
          @click.prevent="data.tab = 'tokens'"
        >
          <span class="text-sm font-medium text-font-1">
            Tokens
          </span>
        </button>

        <button
          :class="
            data.tab === 'nfts' &&
              'border-b-[1px] border-blue-400 !opacity-100'
          "
          class="px-2 pb-2 opacity-[0.5] cursor-not-allowed"
          @click.prevent="data.tab = 'nfts'"
        >
          <span class="text-sm font-medium text-font-2">
            NFTs
          </span>
        </button>
      </div>

      <div
        v-if="data.tab === 'tokens'"
        class="pt-[16px] space-y-3"
      >
        <div
          v-if="Object.keys(userData).length > 0"
        >
          <div
            v-for="{ publicAmount, token } of userData"
            :key="token.id"
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
              <img src="/kda.png">
            </div>

            <div class="space-y-1">
              <p
                class="
                  text-xs
                  font-regular
                  opacity-[0.9]
                  text-font-1
                "
                v-text="token.symbol"
              />

              <p
                class="
                  text-font-2 text-xxs
                  font-medium
                  opacity-[0.9]
                "
              >
                -
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
                v-text="publicAmount.toFixed(1)"
              />
            </div>
          </div>
        </div>

        <div
          v-else
          class="flex justify-center py-[32px]"
        >
          <span
            class="text-font-1 text-md"
          >
            You don't have any tokens
          </span>
        </div>
      </div>

      <div
        v-else
        class="pb-[90px] lg:pb-0 grid grid-cols-2 gap-3 pt-3 lg:grid-cols-3 xl:grid-cols-4"
      >
        <div
          v-for="n in 8"
          :key="n"
          class="pb-4 px-2 pt-2 rounded-[8px] bg-gray-800 lg:max-w-[204px]"
        >
          <img src="/nft.png" class="rounded-[8px] w-[150px] h-[150px] mx-auto lg:min-w-[180px] lg:min-h-[182px]">

          <div class="pt-3">
            <span class="text-font-1 text-xxs">
              Back in the Apes #9786
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
