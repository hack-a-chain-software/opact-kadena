<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReceiveStore } from '~/stores/receive'
import { useWalletStore } from '~/stores/wallet'

const receiveStore = useReceiveStore()

const {
  link,
  amount,
  isPrivate,
  isDisabled,
  receiveType,
  selectedToken
} = storeToRefs(receiveStore)

const wallet = useWalletStore()

const { account } = storeToRefs(wallet)

const emit = defineEmits(['changeStep'])
</script>

<template>
  <UICardBody>
    <UICardHeader title="Enter receiving data" />

    <ReceiveType
      :selected="receiveType"
      @selected="receiveType = $event"
    />

    <UIInputMoney
      v-model="amount"
      :disabled="false"
      :token="selectedToken"
    />

    <SelectToken
      :token="selectedToken"
      @selected="selectedToken = $event"
    />

    <template v-if="isPrivate && !isDisabled">
      <UIInputCopy
        label="Your private address"
        :value="account?.address"
      />

      <div>
        <ReceiveFromLink
          :link="link"
          :isDisabled="isDisabled"
          @done="emit('reset')"
        />
      </div>
    </template>

    <template v-else-if="!isDisabled">
      <UIInputCopy
        label="Copy or share the custon payment link"
        :value="link"
      />

      <SelectWallet
        :isDisabled="isDisabled"
        @connected="emit('changeStep', 'review')"
      />
    </template>
  </UICardBody>
</template>
