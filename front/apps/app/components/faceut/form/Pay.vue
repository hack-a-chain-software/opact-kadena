<script setup lang="ts">
import Pact from 'pact-lang-api'
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'

const router = useRouter()

const wallet = useWalletStore()

const { node } = storeToRefs(wallet)

const { provider, logout } = useExtensions()

const data = reactive({
  error: '',
  amount: 100,
  token: {
    icon: '/kda.png',
    name: 'Kadena',
    symbol: 'KDA'
  },
  loadingMessage: '',
  showGenerateLink: false,
  loading: false
})

const isOpen = ref(false)

function setIsOpen (value) {
  isOpen.value = value
}

const RPC = process.env.NODE_ENV !== 'development' ? 'https://kb96ugwxhi.execute-api.us-east-2.amazonaws.com' : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:9001'

const pay = async () => {
  try {
    const tx = await provider.value.faceut(node.value)

    data.loading = true

    data.loadingMessage = 'Awaiting kadena result...'

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

    const { decrypt, getUtxoFromDecrypted } = await import('opact-sdk')

    wallet.loadState(decrypt, getUtxoFromDecrypted)
    router.push('/app')
    logout()
  } catch (e) {
    console.warn(e)
    logout()
  } finally {
    data.loading = false
    data.loadingMessage = ""
  }
}
</script>

<template>
  <div>
    <div>
      <span class="text-md text-font-1">
        Opact Testnet Faucet
      </span>
    </div>

    <div class="pt-4">
      <div class="pb-2">
        <div>
          <span class="text-xxs text-font-1 lg:text-xs"> Value </span>
        </div>

        <div class="mt-2 p-4 rounded-[8px] flex items-center justify-between bg-gray-700  cursor-not-allowed">
          <div class="flex-grow cursor-not-allowed" >
            <input
              readonly
              v-model="data.amount"
              placeholder="0"
              class="cursor-not-allowed
            bg-transparent
            text-xl text-font-1
            outline-none
            w-full
          "
            >
          </div>

          <div>
            <button
              disabled
              class="
            bg-gray-800
            px-3
            rounded-full
            py-1
            flex
            space-x-1
            w-max
            items-center
            cursor-not-allowed
          "
              @click.prevent="setIsOpen(true)"
            >
              <div class="shrink-0">
                <img
                  :src="data.token.icon"
                  class="w-5 h-5"
                >
              </div>

              <div>
                <span v-text="data.token.symbol" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-4 lg:pt-8">
      <div>
        <div>
          <span class="text-xxs lg:text-xs text-font-1"> Your account name </span>
        </div>

        <div class="mt-2 p-4 bg-gray-700 rounded-[8px] cursor-not-allowed">
          <span class="text-xs break-words">
            {{ node?.pubkey.toString() }}
          </span>
        </div>
      </div>
    </div>

    <div class="pt-6 lg:pt-[40px]">
      <button
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
        @click.prevent="pay()"
      >
        <span class="text-font-1"> Confirm Payment </span>
      </button>
    </div>
  </div>
</template>
~/apps/app/stores/wallet
