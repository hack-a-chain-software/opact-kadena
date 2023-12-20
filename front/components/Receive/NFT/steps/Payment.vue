<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'
import { useReceiveStore } from '~/stores/receive'

const receiveStore = useReceiveStore()

const {
  progress,
  isLoading,
  isDisabled,
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

    <ProviderUser
      v-if="provider"
      label="Your Wallet"
      :provider="provider"
    />

    <SelectNFT
      :disabled="!provider"
      :token="selectedToken"
      @selected="selectedToken = $event"
      :account-name="provider?.account?.address"
    />

    <TxWrapperNFT
      :token="selectedToken"
      :disabled="!selectedToken"
      :receiver="account.address"
      :sender="provider?.account?.address"
    />

    <UIButtonInline
      :loading="isLoading"
      :disabled="isDisabled"
      :label="isLoading ? progress : 'Receive Now'"
      @click.prevent="receiveStore.sendDeposit(account)"
    />
  </UICardBody>
</template>
