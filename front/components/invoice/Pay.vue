<script lang="ts" setup>
import { stripOZK } from 'opact-sdk'
import { Money3Component } from 'v-money3'
import { useInvoice } from '~/hooks/invoice'
import { computePaymentParams } from '~/utils/sdk'

const { provider } = useExtensions()

const checkFunds = async () => {
  if (!data.token) {
    return
  }

  const prefix = data.token.name === 'Kadena' ? 'coin' : 'test.opact-coin'

  await nextTick()

  if (!provider.value) {
    return
  }

  data.loading = true

  const {
    result: {
      status,
      data: coinData
    }
  } = await provider.value.coinDetails(prefix)

  data.loading = false

  if (status === 'failure') {
    data.balance = 0

    return
  }

  data.balance = coinData.balance
}

const {
  data,
  token,
  pubkey,
  amount,
  params,
  buttonIsDisabled,
} = useInvoice()

const emits = defineEmits(['changeStep'])

const deposit = async () => {
  data.error = ''
  data.depositing = true

  try {
    const transactionArgs = await computePaymentParams({
      pubkey: `0x${stripOZK(pubkey.value)}`,
      amount: Number(amount.value),
      sender: provider.value.account.account.publicKey,
      receiptsParams: {
        id: "0",
        type: 'deposit',
        amount: Number(amount.value),
        receiver: BigInt(`0x${stripOZK(pubkey.value)}`),
        address: data.token.namespace.refName.name,
        sender: provider.value.account.account.publicKey,
      },
      selectedToken: token.value.namespace
    })

    await provider.value.transaction(
      transactionArgs,
      (message: string) => data.depositMessage = message
    )

    emits('changeStep', 'success')
  } catch (e) {
    console.warn(e)
    data.error = e.message
  } finally {
    data.depositing = false
    data.depositMessage = "Computing UTXO's Values..."
  }
}

watch(() => data.token, () => {
  checkFunds()
}, { immediate: true })
</script>

<template>
  <div>
    <div>
      <span class="text-md text-font-1">
        Payment Request
      </span>
    </div>

    <div class="pt-4">
      <div>
        <div
          class="pb-4"
        >
          <span class="text-xs text-font-1" :class="params?.amount && 'opacity-60'"> Amount </span>
        </div>

        <div
          class="p-4 rounded-[8px] flex items-center justify-between bg-gray-800"
          :class="[
            params?.amount && 'opacity-60',
            Number(amount) > 0 &&  'border !border-blue-400'
          ]"
        >
          <div class="flex-grow">
            <Money3Component
              placeholder="0"
              v-if="!params?.amount"
              v-model="data.amount"
              v-bind="data.config"
              class="
                h-[39px]
                bg-transparent
                text-xl
                w-full
                px-0
                font-semibold
                text-font-1
                !outline-none
                !border-none
                focus:ring-0
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            />

            <input
              v-else
              readonly
              :value="params.amount"
              class="
                bg-transparent
                text-xl text-font-1
                outline-none
                w-full
                cursor-not-allowed
              "
            >
          </div>

          <div>
            <button
              class="
                bg-dark-blue
                px-3
                rounded-full
                py-1
                flex
                space-x-1
                w-max
                items-center
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
              :disabled="!!params.tokenId"
              @click.prevent="data.show = true"
            >
              <div class="shrink-0">
                <img
                  :src="token.icon"
                  class="w-5 h-5"
                >
              </div>

              <div>
                <span v-text="token.symbol" />
              </div>
            </button>
          </div>
        </div>

        <button
          class="mt-4"
          :key="data.token.id"
          v-if="!data.loading && provider && data.token && !params?.amount"
          @click.prevent="data.amount = data.balance"
        >
          <span
            class="text-xxxs hover:underline"
            :class="data.balance > 0 ? 'text-green-500' : 'text-red-500'"
            v-text="`Balance: ${data.balance} ${data.token.symbol}`"
          />
        </button>
      </div>
    </div>

    <div
      class="pt-[18px] lg:pt-[32px]"
    >
      <div class="flex justify-between pb-4">
        <span
          class="text-xs font-medium text-font-1"
        >
          Receiver
        </span>
      </div>

      <div
        class="
          p-4
          flex
          w-full
          rounded-[8px]
          items-center
          bg-gray-800
          space-x-2
          border border-transparent
        "
        :class="provider && '!border-blue-400'"
      >
        <div
          class="min-w-[40px] h-[40px] max-h-[40px] flex items-center justify-center bg-dark-blue rounded-[8px]"
        >
          <Icon
            name="minilogo"
            class="w-6 h-6"
          />
        </div>

        <div
          class="flex-grow break-words overflow-hidden"
        >
          <span
            class="text-sm font-medium text-font-1"
            v-text="`OZK${pubkey}`"
          />
        </div>
      </div>
    </div>

    <TxWrapper
      :token="data.token"
      :amount="amount"
      :disabled="buttonIsDisabled"
      :receiver="`OZK${pubkey}`"
      :sender="provider?.account?.address || provider?.account?.account?.account"
    />

    <Warning
      type="error"
      class="mt-4"
      v-if="data.error"
      :label="data.error + '*'"
    />

    <ButtonInline
      :loading="data.depositing"
      @click="deposit()"
      :disabled="buttonIsDisabled"
      class="mt-full lg:mt-[40px]"
      :label="data.depositing ? data.depositMessage : 'Confirm Payment'"
    />

    <ModalTokens
      :show="data.show"
      @close="data.show = false"
      @selected="data.token = $event"
    />
  </div>
</template>
