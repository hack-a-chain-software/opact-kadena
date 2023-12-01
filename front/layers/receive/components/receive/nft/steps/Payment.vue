<script setup lang="ts">
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

const { account } = useOpactWallet()

const { provider } = useExtensions()
</script>

<template>
  <CardBody>
    <CardHeader
      with-back
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

    <ProviderUser
      v-if="provider"
      label="Your Wallet"
      :provider="provider"
    />

    <SelectNFT
      :token="data.token"
      :disabled="!provider"
      @selected="emit('updateTokenValue', $event)"
      :account-name="provider?.account?.account?.publicKey"
    />

    <TxWrapperNFT
      :token="data.token"
      :amount="data.amount"
      :disabled="!data.token"
      :receiver="account.address"
      :sender="
        provider?.account?.address ||
        provider?.account?.account?.account
      "
    />

    <ButtonInline
      :loading="data.loading"
      label="Deposit Now"
      @click.prevent="emit('deposit')"
    />
  </CardBody>
</template>
