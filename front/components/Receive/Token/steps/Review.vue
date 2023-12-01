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
      withBack
      title="Confirm deposit information"
      @back="emit('changeStep', 'receive')"
    />

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
