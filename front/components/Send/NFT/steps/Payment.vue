<script setup lang="ts">
//
</script>

<template>
  <UICardBody>
    <!-- <SelectOwnNFT
      :token="data.token"
      @selected="data.token = $event"
    />

    <ProviderUser
      v-if="provider && !isInternalTransfer"
      :provider="provider"
    />

    <UIInputAddress
      :token="data.token"
      v-model="data.addressTo"
      @isValidAddress="data.isValidAddress = $event"
    />

    <TxWrapperNFT
      :token="data.token"
      :amount="data.amount"
      :receiver="data.addressTo"
      :sender="node.address"
      :disabled="isDisabled"
    />

    <Warning
      type="error"
      class="mt-4"
      v-if="data.error"
      :label="data.error + '*'"
    />

    <SelectWallet v-if="showConnectWalletButton" />

    <UIButtonInline
      v-else
      :disabled="isDisabled"
      :loading="data.loading"
      @click="sendTransfer()"
      class="mt-full lg:mt-[40px]"
      :label="data.loading ? data.progress : 'Send Token'"
    /> -->
  </UICardBody>
</template>
