<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'
import { useReceiveStore } from '~/stores/receive'

const receiveStore = useReceiveStore()

const {
  amount,
  progress,
  isLoading,
  selectedToken
} = storeToRefs(receiveStore)

const wallet = useWalletStore()
const { account } = storeToRefs(wallet)

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
      :model-value="amount"
    />

    <ProviderUser
      v-if="provider"
      label="Your Wallet"
      :provider="provider"
    />

    <UISelectedToken :token="selectedToken" />

    <TxWrapper
      :amount="amount"
      :token="selectedToken"
      :receiver="account.address"
      :sender="
        provider?.account?.address ||
          provider?.account?.account?.account
      "
    />

    <UIButtonInline
      :loading="isLoading"
      :label="isLoading ? progress : 'Deposit Now'"
      @click.prevent="receiveStore.sendDeposit(account)"
    />
  </UICardBody>
</template>
