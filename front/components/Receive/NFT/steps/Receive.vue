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
  <UICardBody>
    <UICardHeader title="Enter receiving data" />

    <ReceiveType
      :selected="receiveType"
      @selected="receiveType = $event"
    />

    <template v-if="isPrivate">
      <UIInputCopy
        label="Your private address"
        :value="account.address"
      />

      <ReceiveFromLink
        :link="link"
        @done="receiveStore.reset()"
      />
    </template>

    <template v-else>
      <UIInputCopy
        label="Copy or share the custon payment link"
        :value="link"
      />

      <SelectWallet
        label="Connect wallet to deposit"
        @connected="emit('changeStep', 'payment')"
      />
    </template>
  </UICardBody>
</template>
