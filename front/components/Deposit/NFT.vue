<script setup lang="ts">
import { useDepositToken } from '~/hooks/deposit-token'

const {
  data,
  node,
  router,
  provider,
  isDisabledNFT,
  sendDeposit,
  showConnectWalletButton,
} = useDepositToken(1, null as any)
</script>

<template>
  <div
    class="
      flex flex-col
      justify-between
      pb-[32px]
      max-w-[450px]
      text-white
      min-h-[812px]
      lg:pb-0
      lg:min-h-full
      lg:max-w-full
    "
  >
    <div
      class="lg:w-full"
    >
      <div
        class="
          w-full
          py-4
          flex
          justify-center
          relative
          items-center
          lg:hidden
        "
      >
        <button
          class="
            flex
            items-center
            space-x-[4px]
            h-6
            absolute
            top-4
            left-0
          "
          @click.prevent="router.push('/home')"
        >
          <Icon name="chevronLeft" class="h-6 w-6" />
        </button>

        <div>
          <h1 class="text-xs text-font-1 font-medium">
            Deposit NFT
          </h1>
        </div>
      </div>

      <SelectNFT
        :show="data.show"
        :token="data.token"
        :disabled="!provider"
        @open="data.show = true"
        @close="data.show = false"
        @selected="data.token = $event"
        :accountName="provider?.account?.account?.publicKey"
      />

      <ProviderUser
        v-if="provider && data.token?.name !== 'Kadena'"
        :provider="provider"
        label="Your Wallet"
      />

      <TxWrapperNFT
        :token="data.token"
        :amount="data.amount"
        :disabled="isDisabledNFT"
        :receiver="'OZK' + node.hexPub"
        :sender="provider?.account?.address || provider?.account?.account?.account"
      />
    </div>

    <Warning
      type="error"
      class="mt-4"
      v-if="data.error"
      :label="data.error + '*'"
    />

    <AppButton
      label="Connect Wallet"
      class="mt-full lg:mt-[40px]"
      v-if="showConnectWalletButton"
      @click.prevent="data.showConnect = true"
    />

    <AppButton
      v-else
      :loading="data.loading"
      @click="sendDeposit()"
      :disabled="isDisabledNFT"
      class="mt-full lg:mt-[40px]"
      :label="data.loading ? data.progress : 'Deposit NFT'"
    />

    <WalletConnector
      :show="data.showConnect"
      @close="data.showConnect = false"
      @connected="data.showConnect = false"
    />
  </div>
</template>
