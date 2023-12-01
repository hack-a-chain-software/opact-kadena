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

    <UIInputMoney
      :disabled="false"
      :token="data.token"
      :modelValue="data.amount"
      @update:modelValue="emit('updateAmountValue', $event)"
    />

    <SelectToken
      :token="data.token"
      @selected="emit('updateTokenValue', $event)"
    />

    <template v-if="isPrivate && !isDisabled">
      <UIInputCopy
        label="Your private address"
        :value="account.address"
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
