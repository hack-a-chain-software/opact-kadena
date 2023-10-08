<script setup lang="ts">
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { tokens } from '~/utils/constants'
import { useAppState } from '~/hooks/state'
import { useWalletStore } from '~/stores/wallet'
import { sendPactTransaction } from '~/utils/kadena'
import { computeWihtdrawParams, computeTransferParams } from '~/utils/sdk'

const {
  state,
  userData,
  loadAppState
} = useAppState()

const wallet = useWalletStore()

const { provider, logout } = useExtensions()

const {
  node
} = storeToRefs(wallet)

const router = useRouter()

const data = reactive({
  amount: 0,
  show: false,
  loading: false,
  showConnect: false,
  showWalletConnector: false,
  loadingMessage: 'Generating ZK Proof...',
  error: '',
  token: tokens[0],
  showCollapsible: false,
  addressTo: ''
})

const send = async () => {
  try {
    data.loading = true
    data.error = ''

    let params = null

    if (data.addressTo.includes('OZK')) {
      params = await computeTransferParams(
        Number(data.amount),
        data.addressTo.replace('OZK', '').trim(),
        node.value,
        userData.value.tokens[data.token.namespace.refName.name],
        {
          id: 0,
          type: 'transfer',
          sender: node.value.pubkey,
          amount: Number(data.amount),
          address: data.token.namespace.refName.name,
          receiver: BigInt(`0x${data.addressTo.replace('OZK', '').trim()}`),
        },
        data.token.namespace
      )
    } else {
      params = await computeWihtdrawParams(
        Number(data.amount),
        data.addressTo,
        node.value,
        userData.value.tokens[data.token.namespace.refName.name],
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

    if (data.token.id === 1) {
      await sendPactTransaction(data.addressTo, params, (message: string) => data.loadingMessage = message)
    } else {
      await provider.value.transaction(
        params,
        (message: string) => data.loadingMessage = message,
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
    data.loadingMessage = 'Generating ZK Proof...'
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
            Send Token
          </h1>
        </div>
      </div>

      <div class="flex flex-col space-y-2 pt-[24px] lg:pt-0">
        <div>
          <h2 class="text-font-1 text-xxs font-medium">
            Amount
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

          <Icon name="pen" class="h-6 w-6 text-font-2" />
        </div>
      </div>

      <div class="pt-7">
        <div class="flex justify-between pb-2">
          <span class="text-xxs font-medium text-font-1">
            Select Token
          </span>
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

      <TxDetails
        :fee="1"
        :amount="data.amount"
      />
    </div>

    <div
      v-if="data.error"
      class="mt-2 max-w-full break-words"
    >
      <span
        v-text="data.error + '*'"
        class="text-xs text-red-500"
      />
    </div>

    <div class="mt-full lg:mt-[40px]">
      <button
        v-if="!provider && data.token.namespace.refName.name !== 'coin' && !data.addressTo.includes('OZK')"
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
        <span class="text-font-1"> {{ data.loading ? data.loadingMessage : 'Send Token' }} </span>

        <Icon v-if="data.loading" name="spinner" class="animate-spin text-white ml-[12px]" />
      </button>
    </div>

    <WalletConnector
      :show="data.showConnect"
      @close="data.showConnect = false"
      @connected="data.showConnect = false"
    />

    <SelectToken
      :show="data.show"
      @close="data.show = false"
      @selected="data.token = $event"
    />
  </div>
</template>
