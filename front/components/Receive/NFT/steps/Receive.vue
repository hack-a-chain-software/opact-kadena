<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'
import { useReceiveStore } from '~/stores/receive'

const receiveStore = useReceiveStore()

const {
  link,
  isPrivate,
  receiveType
} = storeToRefs(receiveStore)

receiveStore.init(1, 'nft', null)

const wallet = useWalletStore()

const { account } = storeToRefs(wallet)

const emit = defineEmits([
  'changeStep'
])
</script>

<template>
  <div
    class="flex flex-col space-y-4 w-full"
  >
    <UICardBody
      gap="space-y-6"
    >
      <UICardHeader
        title="Enter receiving data"
        description="You can deposit funds from a Regular Kadena Wallet or receive from another Opact Wallet."
      />

      <ReceiveType
        :selected="receiveType"
        @selected="receiveType = $event"
      />

      <template v-if="isPrivate">
        <UIInputCopy
          bg="bg-gray-800"
          :value="account?.address"
          placeholder="Copy and share your public Opact Wallet address"
        />

        <div
          class="flex flex-col gap-2"
        >
          <div>
            <span
              class="text-[20px] text-font-1"
            >
              OR
            </span>
          </div>

          <ReceiveFromLink
            :link="link"
            @done="receiveStore.reset()"
          />
        </div>
      </template>
    </UICardBody>

    <UICardBody
      v-if="!isPrivate"
      gap="space-y-6"
      bg="md:bg-gray-800"
    >
      <UIInputCopy
        label="Copy or share the custon payment link"
        :value="link"
        bg="bg-[#21262D]"
        border="border-blue-400"
        tooltip-text="You can share the payment link with other people so they will be able to deposit into your Opact Wallet."
      />

      <div
        class="flex flex-col gap-2"
      >
        <div>
          <span
            class="text-xs text-font-1"
          >
            OR
          </span>
        </div>

        <SelectWallet
          label="Connect wallet to deposit"
          @connected="emit('changeStep', 'payment')"
        />
      </div>
    </UICardBody>
  </div>
</template>
