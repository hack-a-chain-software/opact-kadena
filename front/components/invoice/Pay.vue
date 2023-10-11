<script lang="ts" setup>
import { Money3Component } from 'v-money3'
import { useInvoice } from '~/hooks/invoice'
import { computePaymentParams } from '~/utils/sdk'

const { provider } = useExtensions()

const checkFunds = async () => {
  if (!data.token) {
    return
  }

  const prefix = data.token.name === 'Kadena' ? 'coin' : 'test.opact-coin'

  data.showConnect = false

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
      pubkey: `0x${pubkey.value}`,
      amount: Number(amount.value),
      sender: provider.value.account.account.publicKey,
      receiptsParams: {
        id: "0",
        type: 'deposit',
        amount: Number(amount.value),
        receiver: BigInt(`0x${pubkey.value}`),
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
      <div class="pb-2">
        <div>
          <span class="text-xxs text-font-2"> Value </span>
        </div>

        <div class="mt-2 p-4 rounded-[8px] flex items-center justify-between bg-gray-700"
          :class="params?.amount && 'opacity-60'">
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
                bg-gray-800
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
          class="mt-1"
          :key="data.token.id"
          v-if="!data.loading && provider && data.token"
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

    <div class="pt-4 lg:pt-2">
      <div>
        <div>
          <span class="text-xxs text-font-2"> to </span>
        </div>

        <input
          :value="pubkey"
          :readonly="params?.pubkey"
          :class="'cursor-not-allowed'"
          class="mt-2 p-4 bg-gray-700 rounded-[8px] text-xs break-words w-full outline-none opacity-60"
        >
      </div>
    </div>

    <TxDetails
      :fee="0"
      v-if="amount > 0"
      :amount="amount"
    />

    <Warning
      type="error"
      class="mt-2"
      v-if="data.error"
      :label="data.error + '*'"
    />

    <div class="pt-6 lg:pt-[40px]">
      <button
        :disabled="buttonIsDisabled"
        class="
          w-full
          flex
          items-center
          justify-center
          h-[44px]
          py-3
          px-4
          rounded-[12px]
          relative
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
        :class="
          buttonIsDisabled
            ? 'bg-gray-700'
            : 'bg-blue-gradient'
        "
        @click.prevent="deposit()"
      >
        <span class="text-font-1"> {{ data.depositing ? data.depositMessage : 'Confirm Payment' }} </span>

        <Icon v-if="data.depositing" name="spinner" class="animate-spin text-white ml-[12px]" />
      </button>
    </div>

    <SelectToken
      :show="data.show"
      @close="data.show = false"
      @selected="data.token = $event"
    />
  </div>
</template>
