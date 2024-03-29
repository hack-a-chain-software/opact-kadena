<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { getTokenDetails } from 'opact-sdk'
import { useReceiveStore } from '~/stores/receive'
import { useWalletStore } from '~/stores/wallet'

const receiveStore = useReceiveStore()

const {
  link,
  amount,
  balance,
  haveFunds,
  isPrivate,
  isDisabled,
  receiveType,
  selectedToken
} = storeToRefs(receiveStore)

const wallet = useWalletStore()

const { account } = storeToRefs(wallet)

const emit = defineEmits(['changeStep'])

const { provider } = useExtensions()

const checkFunds = async (token: any) => {
  await nextTick()

  if (!token || !provider.value) {
    return
  }

  try {
    const details = await getTokenDetails(
      provider.value.account?.address,
      token
    )

    return details.balance
  } catch (e) {
    console.warn(e)
  }
}

const connected = async () => {
  const funds = await checkFunds(selectedToken.value)

  balance.value = funds

  if (funds < amount.value) {
    return
  }

  emit('changeStep', 'review')
}
</script>

<template>
  <div
    class="flex flex-col space-y-4 w-full items-center justify-center"
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

      <template
        v-if="isPrivate"
      >
        <UIInputCopy
          bg="bg-gray-800"
          :value="account?.address"
          placeholder="Copy and share your public Opact Wallet address"
        />

        <div>
          <span
            class="text-[20px] text-font-1"
          >
            Or generate a payment link
          </span>
        </div>
      </template>

      <UIInputMoney
        v-model="amount"
        :disabled="false"
        :token="selectedToken"
        label="Amount to Receive"
        @update:model-value="balance = null"
      />

      <UIWarning
        type="error"
        v-show="haveFunds"
        v-motion-slide-visible-top
        desc="You do not have sufficient funds to make this deposit"
      />

      <UISelectToken
        :token="selectedToken"
        @selected="selectedToken = $event"
      />

      <template v-if="isPrivate">
        <ReceiveFromLink
          :link="link"
          :is-disabled="isDisabled"
          @done="receiveStore.reset()"
        />
      </template>
    </UICardBody>

    <UICardBody
      v-if="!isPrivate && !isDisabled"
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

        <UISelectWallet
          label="Connect wallet to deposit"
          :is-disabled="isDisabled || haveFunds"
          @connected="connected"
        />
      </div>
    </UICardBody>
  </div>
</template>
