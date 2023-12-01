<script setup lang="ts">
import { useOpactWallet } from '~/hooks/opact-wallet'

withDefaults(
  defineProps<{
    data: any;
    link: string;
    isPrivate: boolean;
    isDisabled: boolean;
  }>(),
  {}
)

const emit = defineEmits([
  'reset',
  'deposit',
  'changeStep',
  'updateTokenValue',
  'updateAmountValue',
  'updateReceiveTypeValue'
])

const { account } = useOpactWallet()
</script>

<template>
  <UICardBody>
    <UICardHeader title="Enter receiving data" />

    <ReceiveType
      :selected="data.receiveType"
      @selected="emit('updateReceiveTypeValue', $event)"
    />

    <template v-if="isPrivate">
      <UIInputCopy
        label="Your private address"
        :value="account.address"
      />

      <ReceiveFromLink
        :link="data.link"
        @done="emit('reset')"
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
