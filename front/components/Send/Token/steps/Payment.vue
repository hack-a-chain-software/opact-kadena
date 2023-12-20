<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'
import { useSendStore } from '~/stores/send'

const transferStore = useSendStore()

const walletStore = useWalletStore()

const {
  error,
  amount,
  balance,
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
    <UIInputMoney
      label="Amount"
      v-model="amount"
      :balance="balance"
      :token="selectedToken"
    />

    <ProviderUser
      v-if="
        provider &&
          !isInternalTransfer &&
          selectedToken?.name !== 'Kadena'
      "
      :provider="provider"
    />

    <SelectToken
      :token="selectedToken"
      @selected="selectedToken = $event"
    />

    <UIInputAddress
      :token="selectedToken"
      :model-value="addressTo"
      @update:modelValue="addressTo = $event"
      @isValidAddress="isValidAddress = $event"
    />

    <TxWrapper
      :token="selectedToken"
      :amount="amount"
      :receiver="addressTo"
      :sender="account.address"
      :disabled="isDisabled"
    />

    <UIWarning
      v-if="error"
      type="error"
      :label="error + '*'"
    />

    <SelectWallet v-if="showConnectWalletButton && !provider" />

    <UIButtonInline
      v-else
      :loading="isLoading"
      :disabled="isDisabled"
      :label="isLoading ? progress : 'Send Token'"
      @click.prevent="transferStore.sendTransferToken(account)"
    />
  </UICardBody>
</template>
~/stores/send
