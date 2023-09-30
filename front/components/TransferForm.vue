<script setup lang="ts">
import { reactive } from 'vue'
import Pact from 'pact-lang-api'
import { storeToRefs } from 'pinia'
import { computePactCode } from '~/utils/kadena'
import { useWalletStore } from '~/stores/wallet'
import { computeWihtdrawParams, computeTransferParams } from '~/utils/sdk'

const RPC = process.env.NODE_ENV !== 'development'
  ? 'https://kb96ugwxhi.execute-api.us-east-2.amazonaws.com'
  : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:9001'

const wallet = useWalletStore()

const {
  node,
  state,
  userData,
} = storeToRefs(wallet)

const router = useRouter()

const data = reactive({
  amount: 0,
  show: false,
  loading: false,
  showWalletConnector: false,
  loadingMessage: 'Generating ZK Proof...',
  error: '',
  token: {
    icon: '/kda.png',
    name: 'Kadena',
    symbol: 'KDA'
  },
  showCollapsible: false,
  addressTo: ''
})

const send = async () => {
  try {
    data.loading = true
    data.error = ''

    if (data.addressTo.includes('OZK')) {
      const {
        args,
        proof,
        extData,
        tokenSpec
      } = await computeTransferParams(
        Number(data.amount),
        data.addressTo.replace('OZK', '').trim(),
        node.value,
        state.value.commitments,
        userData.value[1]
      )

      const kp = Pact.crypto.genKeyPair()

      const pactCode = computePactCode({ args, proof, extData, tokenSpec })

      const network = RPC

      const createdAt = Math.round(new Date().getTime() / 1000) - 10

      data.loadingMessage = 'Sending your proof to relayer...'

      const cap1 = Pact.lang.mkCap(
        'Coin Transfer',
        'Capability to transfer designated amount of coin from sender to receiver',
        'coin.TRANSFER',
        ['opact-contract', data.addressTo, Number((extData.extAmount * (-1)).toFixed(1))]
      )

      const tx = await Pact.fetch.send({
        networkId: 'testnet04',
        pactCode,
        keyPairs: [
          {
            publicKey: kp.publicKey,
            secretKey: kp.secretKey,
            clist: [
              cap1.cap,
              {
                name: 'opact-gas-payer.GAS_PAYER',
                args: [1.0]
              }
            ]
          }
        ],
        envData: {
          language: 'Pact',
          name: 'transact-deposit',
          'token-instance': {
            refSpec: [{
              name: tokenSpec.refSpec.name
            }],
            refName: {
              name: tokenSpec.refName.name
            }
          }
        },

        meta: Pact.lang.mkMeta('', '0', 0, 0, createdAt, 0)
      }, network)

      data.loadingMessage = 'Awaiting TX results...'

      const {
        result
      } = await Pact.fetch.listen(
        { listen: tx.requestKeys[0] },
        network
      )

      if (result.status === 'failure') {
        data.error = result.error.message

        return
      }

      wallet.loadState()
      router.push('/home')

      return
    } else {
      const {
        args,
        proof,
        extData,
        tokenSpec
      } = await computeWihtdrawParams(
        Number(data.amount),
        data.addressTo,
        node.value,
        state.value.commitments,
        userData.value[1]
      )

      const kp = Pact.crypto.genKeyPair()

      const pactCode = computePactCode({ args, proof, extData, tokenSpec })

      const network = RPC

      const createdAt = Math.round(new Date().getTime() / 1000) - 10

      data.loadingMessage = 'Sending your proof to relayer...'

      const cap1 = Pact.lang.mkCap(
        'Coin Transfer',
        'Capability to transfer designated amount of coin from sender to receiver',
        'coin.TRANSFER',
        ['opact-contract', data.addressTo, Number((extData.extAmount * (-1)).toFixed(1))]
      )

      const cap2 = Pact.lang.mkCap(
        'Coin Transfer for Gas',
        'Capability to transfer gas fee from sender to gas payer',
        'coin.TRANSFER',
        ['opact-contract', 'opact-gas-payer', 1.0]
      )

      const tx = await Pact.fetch.send({
        networkId: 'testnet04',
        pactCode,
        keyPairs: [
          {
            publicKey: kp.publicKey,
            secretKey: kp.secretKey,
            clist: [
              cap1.cap,
              cap2.cap,
              {
                name: 'opact-gas-payer.GAS_PAYER',
                args: [1.0]
              }
            ]
          }
        ],
        envData: {
          language: 'Pact',
          name: 'transact-deposit',
          'token-instance': {
            refSpec: [{
              name: tokenSpec.refSpec.name
            }],
            refName: {
              name: tokenSpec.refName.name
            }
          }
        },

        meta: Pact.lang.mkMeta('', '0', 0, 0, createdAt, 0)
      }, network)

      data.loadingMessage = 'Awaiting TX results...'

      const {
        result
      } = await Pact.fetch.listen(
        { listen: tx.requestKeys[0] },
        network
      )

      if (result.status === 'failure') {
        data.error = result.error.message

        return
      }
    }

    wallet.loadState()
    router.push('/home')
  } catch (e) {
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
          disabled
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
      :show="data.showWalletConnector"
      @close="data.showWalletConnector = false"
    />

    <SelectToken
      :show="data.show"
      @close="data.show = false"
      @select="data.token = token"
    />
  </div>
</template>
