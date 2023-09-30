<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import Pact from 'pact-lang-api'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'
import { computeDepositParams } from '~/utils/sdk'

const wallet = useWalletStore()

const RPC = process.env.NODE_ENV !== 'development'
  ? 'https://kb96ugwxhi.execute-api.us-east-2.amazonaws.com'
  : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:9001'

const { node, state } = storeToRefs(wallet)

const { provider, logout } = useExtensions()

const router = useRouter()

const amounts = [1, 10, 100]

const data = reactive({
  error: '',
  amount: 0,
  balance: 0,
  provider: null,
  loading: false,
  depositing: false,
  showConnect: false,
  showCollapsible: false,
  depositMessage: 'Generating ZK Proof...',
  token: {
    icon: '/kda.png',
    name: 'Kadena',
    symbol: 'KDA'
  }
})

const checkFunds = async () => {
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
  } = await provider.value.coinDetails()

  data.loading = false

  if (status === 'failure') {
    return
  }

  data.balance = coinData.balance
}

onMounted(() => {
  if (!provider.value) {
    return
  }

  checkFunds()
})

const deposit = async () => {
  data.error = ''
  data.depositing = true

  try {
    const transactionArgs = await computeDepositParams(
      node.value,
      Number(data.amount),
      state.value.commitments,
      provider.value.account.account.publicKey
    )

    data.depositMessage = 'Await sign...'

    const tx = await provider.value.transaction(transactionArgs)

    data.depositMessage = 'Awaiting TX results...'

    const {
      result
    } = await Pact.fetch.listen(
      { listen: tx.requestKeys[0] },
      RPC
    )

    if (result.status === 'failure') {
      data.error = result.error.message

      return
    }

    wallet.loadState()
    router.push('/home')
    logout()
  } catch (e) {
    logout()
    console.warn(e)
    data.depositing = false
    data.depositMessage = "Computing UTXO's Values..."
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
          <h2 class="text-font-1 text-xxs font-medium">
            Enter or select amount
          </h2>
        </div>

        <div
          class="flex justify-between items-center space-x-1"
        >
          <input
            v-model="data.amount"
            class="
              h-[39px]
              bg-transparent
              text-xl
              font-semibold
              text-font-2
              outline-none
            "
          >

          <Icon name="pen" class="h-6 w-6 text-font-2 lg:hidden" />
        </div>
      </div>

      <button
        v-if="!data.loading"
        class="mt-1"
        @click.prevent="data.amount = data.balance"
      >
        <span
          class="text-xxxs hover:underline"
          :class="data.balance > 0 ? 'text-green-500' : 'text-red-500'"
          v-text="`Balance: ${data.balance}`"
        />
      </button>

      <div class="pt-6 space-x-2">
        <button
          v-for="amount in amounts"
          :key="amount"
          class="
            group
            active:border-blue-400
            border-[1.5px]
            border-gray-700
            p-3
            rounded-full
          "
          @click.prevent="data.amount = amount"
        >
          <span
            class="text-xxs text-font-2 group-active:text-blue-400 font-medium"
            v-text="amount"
          />
        </button>
      </div>

      <div class="pt-7">
        <div class="flex justify-between pb-2">
          <div>
            <span class="text-xxs font-medium text-font-1">
              Select Token
            </span>
          </div>

          <div>
            <button
              disabled
              class="
                flex
                items-center
                space-x-2
                text-blue-400
                cursor-not-allowed
                disabled:opacity-[0.8]
              "
              @click.prevent="step = 'token'"
            >
              <span class="text-xxs font-medium">
                Import token
              </span>

              <div>
                <Icon name="add" class="w-5 h-5" />
              </div>
            </button>
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
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
          disabled
          @click.prevent="() => {}"
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

        <div class="pt-6">
          <Collapsible
            v-model="data.showCollapsible"
            title="Transaction Details"
          >
            <div>
              <div
                class="flex items-center justify-between"
              >
                <div>
                  <span
                    class="text-xxs font-medium text-font-2"
                  >
                    Estimated Fees
                  </span>
                </div>

                <div>
                  <span
                    class="text-xxs font-medium text-font-1"
                  >
                    1 KDA
                  </span>
                </div>
              </div>

              <div
                class="
                  flex
                  justify-between
                  items-center
                  pt-3
                  mt-4
                  border-t border-[#57595C]
                "
              >
                <div>
                  <span
                    class="text-xxs font-medium text-font-2"
                  >
                    Total
                  </span>
                </div>

                <div>
                  <span
                    class="
                      text-xxs
                      font-medium
                      text-blue-300
                    "
                  >
                    {{ Number(data.amount) + 1 }} KDA
                  </span>
                </div>
              </div>
            </div>
          </Collapsible>
        </div>
      </template>
    </div>

    <div
      v-if="data.error"
      class="mt-2"
    >
      <span
        class="text-xs text-red-500"
        v-text="data.error + '*'"
      />
    </div>

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
  </div>
</template>
