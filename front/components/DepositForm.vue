<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { reactive, watch } from 'vue'
import { Money3Component } from 'v-money3'
import { tokens } from '~/utils/constants'
import { useAppState } from '~/hooks/state'
import { useWalletStore } from '~/stores/wallet'
import { computeDepositParams } from '~/utils/sdk'

const {
  loadAppState
} = useAppState()

const wallet = useWalletStore()

const { node } = storeToRefs(wallet)

const { provider } = useExtensions()

const router = useRouter()

const data = reactive({
  error: '',
  amount: 0,
  balance: 0,
  show: false,
  provider: null,
  loading: false,
  depositing: false,
  showConnect: false,
  showCollapsible: false,
  depositMessage: 'Generating ZK Proof...',
  token: tokens[0],
  config: {
    masked: false,
    prefix: '',
    suffix: '',
    thousands: '',
    decimal: '.',
    precision: 1,
    disableNegative: false,
    min: 0,
    allowBlank: false,
    minimumNumberOfCharacters: 0,
    shouldRound: true,
    focusOnRight: false,
  }
})

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

watch(() => data.token, () => {
  checkFunds()
})

const deposit = async () => {
  data.error = ''
  data.depositing = true

  try {
    const transactionArgs = await computeDepositParams(
      node.value,
      Number(data.amount),
      provider.value.account.account.publicKey,
      '',
      {
        id: 0,
        type: 'deposit',
        amount: Number(data.amount),
        receiver: node.value.pubkey,
        address: data.token.namespace.refName.name,
        sender: provider.value.account.account.publicKey,
      },
      data.token.namespace,
    )

    await provider.value.transaction(
      transactionArgs,
      (message: string) => data.depositMessage = message
    )

    loadAppState(node.value.pvtkey)
    router.push('/home')
  } catch (e) {
    console.warn(e)
    data.error = e.message
  } finally {
    data.depositing = false
    data.depositMessage = 'Generating ZK Proof...'
  }
}
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

      <div class="flex flex-col space-y-2 pt-[24px] lg:pt-0">
        <div>
          <h2
            class="text-font-1 text-xxs font-medium"
            :class="!provider && 'opacity-60 cursor-not-allowed'"
          >
            Enter or select amount
          </h2>
        </div>

        <div
          class="flex justify-between items-center space-x-1"
        >
          <Money3Component
            :max="data.balance"
            :disabled="!provider"
            v-model="data.amount"
            v-bind="data.config"
            class="
              h-[39px]
              bg-transparent
              text-xl
              w-full
              px-0
              font-semibold
              text-font-2
              !outline-none
              !border-none
              focus:ring-0
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          />
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

      <TokenAmounts
        :disabled="!provider"
        @selected="data.amount = $event"
      />

      <div class="pt-7">
        <div class="flex justify-between pb-2">
          <div>
            <span class="text-xxs font-medium text-font-1" :class="!provider && 'opacity-60 cursor-not-allowed'">
              Select Token
            </span>
          </div>
        </div>

        <button
          class="
            p-4
            flex
            w-full
            rounded-[8px]
            justify-between
            bg-gray-800
            hover:opacity-90
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
          :disabled="!provider"
          @click.prevent="data.show = true"
        >
          <div v-if="!data.token">
            <span class="text-font-2 text-xxs font-medium">
              Choose Token
            </span>
          </div>

          <div v-else class="space-x-2 flex items-center">
            <img :src="data.token.icon" class="w-6 h-6">

            <span v-text="data.token.name" />
          </div>

          <div>
            <Icon name="chevron" class="rotate-[-90deg]" />
          </div>
        </button>
      </div>

      <template v-if="provider">
        <div class="pt-[18px]">
          <div class="flex justify-between pb-2">
            <span class="text-xxs font-medium text-font-1">
              Your Wallet
            </span>
          </div>

          <div
            class="
              p-4
              flex
              w-full
              rounded-[8px]
              bg-gray-800
              space-x-2
            "
          >
            <div>
              <Icon
                :name="provider.metadata.icon"
                class="w-6 h-6"
              />
            </div>

            <div
              class="max-w-[calc(100%-32px)] break-words"
            >
              <p
                class="text-xxs font-meidum text-font-1"
                v-text="
                  provider?.account?.address ||
                    provider.account?.account?.account
                "
              />
            </div>
          </div>
        </div>

        <TxDetails
          fee="0"
          v-if="data.amount > 0 && data.balance !== 0 && data.balance >= data.amount"
          :amount="data.amount"
        />
      </template>
    </div>

    <Warning
      type="error"
      class="mt-2"
      v-if="data.error"
      :label="data.error + '*'"
    />

    <div class="mt-full lg:mt-[40px]">
      <button
        v-if="!provider"
        :disabled="!data.token || !data.amount"
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
        "
        :class="
          !data.token || !data.amount
            ? 'bg-gray-700'
            : 'bg-blue-gradient'
        "
        @click.prevent="data.showConnect = true"
      >
        <span class="text-font-1"> Connect Wallet </span>
      </button>

      <button
        v-else
        :disabled="!data.token || !data.amount || data.balance === 0"
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
        "
        :class="
          !data.token || !data.amount || data.balance === 0
            ? 'bg-gray-700'
            : 'bg-blue-gradient'
        "
        @click.prevent="deposit()"
      >
        <span class="text-font-1"> {{ data.depositing ? data.depositMessage : 'Deposit' }} </span>

        <Icon v-if="data.depositing" name="spinner" class="animate-spin text-white ml-[12px]" />
      </button>
    </div>

    <WalletConnector
      :show="data.showConnect"
      @close="data.showConnect = false"
      @connected="checkFunds()"
    />

    <SelectToken
      :show="data.show"
      @close="data.show = false"
      @selected="data.token = $event"
    />
  </div>
</template>
