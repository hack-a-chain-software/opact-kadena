<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'

const wallet = useWalletStore()
const { account } = storeToRefs(wallet)

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

const { provider } = useExtensions()
</script>

<template>
  <UICardBody>
    <UICardHeader
      title="Confirm deposit information"
    />

    <UIInputMoney
      readonly
      label="Amount"
      :model-value="data.amount"
    />

    <ProviderUser
      v-if="provider"
      label="Your Wallet"
      :provider="provider"
    />

    <SelectedToken :token="data.token" />

    <TxWrapper
      :token="data.token"
      :amount="data.amount"
      :receiver="account.address"
      :sender="
        provider?.account?.address ||
        provider?.account?.account?.account
      "
    />

    <UIButtonInline
      :loading="data.loading"
      label="Deposit Now"
      @click.prevent="emit('deposit')"
    />
  </UICardBody>
</template>
