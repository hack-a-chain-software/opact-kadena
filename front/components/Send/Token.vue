<script setup lang="ts">
import { useSendToken } from '~/hooks/send-token'

const {
  data,
  node,
  router,
  provider,
  balance,
  isDisabled,
  sendTransfer,
  isInternalTransfer,
  showConnectWalletButton,
} = useSendToken()
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
            Send Token
          </h1>
        </div>
      </div>

      <InputMoney
        :balance="balance"
        :token="data.token"
        v-model="data.amount"
      />

      <ProviderUser
        v-if="provider && !isInternalTransfer && data.token.name !== 'Kadena'"
        :provider="provider"
      />

      <SelectToken
        :show="data.show"
        :token="data.token"
        @open="data.show = true"
        @close="data.show = false"
        @selected="data.token = $event"
      />

      <InputAddress
        :token="data.token"
        v-model="data.addressTo"
        @isValidAddress="data.isValidAddress = $event"
      />

      <TxWrapper
        :token="data.token"
        :amount="data.amount"
        :receiver="data.addressTo"
        :sender="node.address"
        :disabled="isDisabled"
      />
    </div>

    <Warning
      type="error"
      class="mt-4"
      v-if="data.error"
      :label="data.error + '*'"
    />


    <SelectWallet
      v-if="showConnectWalletButton"
    />

    <ButtonInline
      v-else
      :disabled="isDisabled"
      :loading="data.loading"
      @click="sendTransfer()"
      class="mt-full lg:mt-[40px]"
      :label="data.loading ? data.progress : 'Send Token'"
    />
  </div>
</template>
