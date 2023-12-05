<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'
import { useTransferStore } from '~/stores/transfer'

const transferStore = useTransferStore()

transferStore.init(1, 'nfts', null)

const walletStore = useWalletStore()

const {
  error,
  amount,
  progress,
  isLoading,
  addressTo,
  isDisabled,
  selectedToken,
  isValidAddress,
  isInternalTransfer,
  showConnectWalletButton
} = storeToRefs(transferStore)

const {
  account
} = storeToRefs(walletStore)

const { provider } = useExtensions()
</script>

<template>
  <UICardBody>
    <SelectOwnNFT
      :token="selectedToken"
      @selected="selectedToken = $event"
    />

    <ProviderUser
      v-if="provider && !isInternalTransfer"
      :provider="provider"
    />

    <UIInputAddress
      :token="selectedToken"
      v-model="addressTo"
      @isValidAddress="isValidAddress = $event"
    />

    <TxWrapperNFT
      :token="selectedToken"
      :amount="amount"
      :receiver="addressTo"
      :sender="account.address"
      :disabled="isDisabled"
    />

    <Warning
      type="error"
      class="mt-4"
      v-if="error"
      :label="error + '*'"
    />

    <SelectWallet v-if="showConnectWalletButton && !provider" />

    <UIButtonInline
      v-else
      :loading="isLoading"
      :disabled="isDisabled"
      class="mt-full lg:mt-[40px]"
      :label="isLoading ? progress : 'Send Token'"
      @click.prevent="transferStore.sendTransferToken(account)"
    />
  </UICardBody>
</template>
