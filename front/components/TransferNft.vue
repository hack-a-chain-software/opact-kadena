<script setup lang="ts">
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppState } from '~/hooks/state'
import { useWalletStore } from '~/stores/wallet'
import { sendPactTransaction } from '~/utils/kadena'
import { computeWihtdrawParamsForNFT, computeTransferParamsForNFT } from '~/utils/sdk'

const {
  state,
  userData,
  loadAppState
} = useAppState()

const wallet = useWalletStore()

const { node } = storeToRefs(wallet)

const { provider, logout } = useExtensions()

const router = useRouter()

const data = reactive({
  error: '',
  amount: 1,
  balance: 0,
  show: false,
  provider: null,
  loading: false,
  depositing: false,
  showConnect: false,
  showCollapsible: false,
  addressTo: '',
  depositMessage: 'Generating ZK Proof...',
  token: null
})

const checkFunds = async (prefix?: string) => {
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

watch(() => data.token, (value) => {
  const prefix = value.name === 'Kadena' ? 'coin' : 'test.opact-coin'

  checkFunds(prefix)
})

const send = async () => {
  if (!data.token) {
    return
  }

  try {
    data.loading = true
    data.error = ''

    let params = null

    if (data.addressTo.includes('OZK')) {
      params = await computeTransferParamsForNFT(
        Number(data.amount),
        data.addressTo.replace('OZK', '').trim(),
        node.value,
        userData.value.nfts[data.token.namespace.refName.name],
        {
          id: data.token.id,
          type: 'transfer',
          sender: node.value.pubkey,
          amount: Number(data.amount),
          address: data.token.namespace.refName.name,
          receiver: BigInt(`0x${data.addressTo.replace('OZK', '').trim()}`),
        },
        data.token.namespace
      )
    } else {
      params = await computeWihtdrawParamsForNFT(
        Number(data.amount),
        data.addressTo,
        node.value,
        userData.value.nfts[data.token.namespace.refName.name],
        {
          id: 0,
          type: 'withdraw',
          receiver: data.addressTo,
          sender: node.value.pubkey,
          amount: Number(data.amount),
          address: data.token.namespace.refName.name,
        },
        data.token.namespace
      )
    }

    if (data.addressTo.includes('OZK')) {
      await sendPactTransaction(data.addressTo, params, (message: string) => data.depositMessage = message)
    } else {
      await provider.value.transaction(
        params,
        (message: string) => data.depositMessage = message,
        true,
        data.addressTo
      )
    }

    loadAppState(node.value.pvtkey)
    router.push('/home')
  } catch (e) {
    logout()
    console.warn(e)
  } finally {
    data.loading = false
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
            Deposit NFT
          </h1>
        </div>
      </div>

      <div class="pt-[24px] lg:pt-0">
        <div class="flex justify-between pb-2">
          <div>
            <span class="text-xxs font-medium text-font-1">
              Select Token
            </span>
          </div>
        </div>

        <button
          class="
            p-4
            flex
            w-full
            items-center
            rounded-[8px]
            justify-between
            bg-gray-800
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
          @click.prevent="data.show = true"
        >
          <div v-if="!data.token">
            <span class="text-font-2 text-xxs font-medium">
              Choose Token
            </span>
          </div>

          <div v-else class="space-x-4 flex items-center">
            <img :src="data?.token?.uri" class="h-[60px] w-[60px] rounded-[8px]">

            <span v-text="data?.token?.name" class="text-xs" />
          </div>

          <div>
            <Icon name="chevron" class="rotate-[-90deg]" />
          </div>
        </button>
      </div>

      <div class="pt-4">
        <div class="flex justify-between pb-2">
          <span class="text-xxs font-medium text-font-1">
            Send to
          </span>
        </div>

        <div class="relative">
          <input
            v-model="data.addressTo"
            placeholder="Address..."
            class="
              p-4
              flex
              w-full
              rounded-[8px]
              justify-between
              bg-gray-800
              text-font-1
              outline-none
            "
          >

          <div class="absolute top-3 right-4">
            <Icon
              name="pen"
              class="h-6 w-6 rotate-[-90deg]"
            />
          </div>
        </div>
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

        <!-- <TxDetails
          fee="0"
          :amount="data.amount"
        /> -->
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
        v-if="!provider && data.token && !data.addressTo.includes('OZK')"
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
        :disabled="
          !data.token || !data.amount || !data.addressTo
        "
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
          !data.token || !data.amount || !data.addressTo
            ? 'bg-gray-700'
            : 'bg-blue-gradient'
        "
        @click.prevent="send()"
      >
        <span class="text-font-1"> {{ data.loading ? data.depositMessage : 'Send Token' }} </span>

        <Icon v-if="data.loading" name="spinner" class="animate-spin text-white ml-[12px]" />
      </button>
    </div>

    <WalletConnector
      :show="data.showConnect"
      @close="data.showConnect = false"
      @connected="checkFunds()"
    />

    <SelectOwnNft
      :show="data.show"
      @close="data.show = false"
      @selected="data.token = $event"
    />
  </div>
</template>
