<script setup lang="ts">
import { useDepositToken } from '~/hooks/deposit-token'

const {
  data,
  node,
  router,
  provider,
  isDisabled,
  checkFunds,
  sendDeposit,
  showConnectWalletButton,
} = useDepositToken()
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
            Deposit
          </h1>
        </div>
      </div>

      <InputMoney
        :token="data.token"
        :disabled="!provider"
        v-model="data.amount"
        :balance="data.balance"
      />

      <ProviderUser
        v-if="provider"
        label="Payer"
        :provider="provider"
      />

      <SelectToken
        :show="data.show"
        :token="data.token"
        @open="data.show = true"
        @close="data.show = false"
        @selected="data.token = $event"
      />

      <TxWrapper
        :token="data.token"
        :amount="data.amount"
        :receiver="node.address"
        :sender="provider?.account?.address || provider?.account?.account?.account"
        :disabled="isDisabled"
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
      :disabled="isDisabled"
      :loading="data.loading"
      @click="sendDeposit()"
      class="mt-full lg:mt-[40px]"
      :label="data.loading ? data.progress : 'Send Token'"
    />

    <WalletConnector
      :show="data.showConnect"
      @close="data.showConnect = false"
      @connected="checkFunds()"
    />
  </div>
</template>
