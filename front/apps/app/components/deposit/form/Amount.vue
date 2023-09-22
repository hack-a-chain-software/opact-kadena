<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import Pact from 'pact-lang-api'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'
import WalletConnector from './WalletConnector.vue'

const wallet = useWalletStore()

const RPC = process.env.NODE_ENV !== 'development' ? 'https://kb96ugwxhi.execute-api.us-east-2.amazonaws.com' : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:9001'

const { node, depositMessage, depositing } = storeToRefs(wallet)

const isOpen = ref(false)
const isConnectWalletOpen = ref(false)

const { provider, logout } = useExtensions()

function setIsOpen (value) {
  isOpen.value = value
}

function setConnectWalletOpen (value) {
  isConnectWalletOpen.value = value
}

const { step } = useForm()

const router = useRouter()

const amounts = [1, 10, 100]

const data = reactive({
  error: '',
  amount: 0,
  balance: 0,
  token: {
    icon: '/kda.png',
    name: 'Kadena',
    symbol: 'KDA'
  },
  loading: false,
  showCollapsible: false
})

const tokens = [
  {
    icon: '/kda.png',
    name: 'Kadena',
    symbol: 'KDA'
  },
  {
    icon: '/kdx.png',
    name: 'Kaddex',
    symbol: 'KDX'
  },
  {
    icon: '/kishk.png',
    name: 'KishuKen',
    symbol: 'KISHK'
  }
]

const coinDetails = async ({ pubkey }: any) => {
  try {
    const accountName = pubkey.toString()

    const network = RPC

    const t_creationTime = Math.round(new Date().getTime() / 1000) - 10
    const data = await Pact.fetch.local({
      pactCode: `(coin.details ${JSON.stringify(accountName)})`,
      meta: Pact.lang.mkMeta('', '0', 0, 0, t_creationTime, 0)
    }, network)

    return data
  } catch (e) {
    console.warn(e)
  }
}

onMounted(async () => {
  data.loading = true

  const {
    result: {
      status,
      data: coinData
    }
  } = await coinDetails({ pubkey: node.value.pubkey })

  data.loading = false

  if (status === 'failure') {
    return
  }

  data.balance = coinData.balance
})

const deposit = async () => {
  try {
    data.error = ''

    const transactionArgs = await wallet.deposit(
      Number(data.amount)
    )

    depositMessage.value = 'Awaiting signature...'

    try {
      const tx = await provider.value.transaction({ ...transactionArgs, node: node.value })

      depositMessage.value = 'Awaiting TX results...'

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
      depositing.value = false
      depositMessage.value = "Computing UTXO's Values..."
    }
  } catch (e) {
    console.warn(e)
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
          @click.prevent="router.push('/app')"
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
        class="mt-1"
        v-if="!data.loading"
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
          @click.prevent="data.amount = amount"
          :key="amount"
          class="
            group
            active:border-blue-400
            border-[1.5px]
            border-gray-700
            p-3
            rounded-full
          "
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
          @click.prevent="setIsOpen(true)"
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
                    provider.account.account.account
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
        v-text="data.error + '*'"
        class="text-xs text-red-500"
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
        @click.prevent="setConnectWalletOpen(true)"
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
        <span class="text-font-1"> {{ depositing ? depositMessage : 'Deposit'}} </span>

        <Icon v-if="depositing" name="spinner" class="animate-spin text-white ml-[12px]" />
      </button>
    </div>

    <WalletConnector
      :show="isConnectWalletOpen"
      @close="setConnectWalletOpen(false)"
      @connected="setConnectWalletOpen(false)"
    />

    <TransitionRoot as="template" :show="isOpen">
      <Dialog
        as="div"
        class="relative z-10"
        @close="setIsOpen(false)"
      >
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-[rgba(6,_10,_15,_0.80)]"
          />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="
              flex
              min-h-full
              items-end
              justify-center
              lg:justify-center
              lg:items-start
              lg:pt-[312px]
              p-4
            "
          >
            <TransitionChild
              as="template"
              enter="duration-200 ease-out"
              enter-from="opacity-0 translate-y-[600px]"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 translate-y-[600px]"
            >
              <DialogPanel
                class="
                  p-4
                  w-full
                  rounded-[12px]
                  lg:max-w-[500px]
                  space-y-4
                  bg-gray-800
                  lg:p-6
                  lg:border-[2px] lg:border-gray-600
                "
              >
                <div
                  class="
                    lg:hidden
                    flex
                    items-center
                    justify-center
                    relative
                  "
                >
                  <button
                    class="absolute left-0"
                    @click.prevent="setIsOpen(false)"
                  >
                    <Icon
                      name="chevron"
                      class="text-font-1 rotate-90"
                    />
                  </button>

                  <DialogTitle
                    as="h3"
                    class="text-font-1 text-xs"
                  >
                    Choose Token
                  </DialogTitle>
                </div>

                <div
                  class="
                    hidden lg:flex relative !mt-0
                    justify-between
                    items-center
                    mx-[-24px]
                    px-[24px]
                    pb-4
                    border-b-[2px] border-gray-600
                  "
                >
                  <DialogTitle
                    as="h3"
                    class="text-font-1 text-sm"
                  >
                    Select token
                  </DialogTitle>

                  <button
                    @click.prevent="setIsOpen(false)"
                    class="w-8 h-8"
                  >
                    <Icon
                      name="close"
                      class="rotate-90 w-4 h-4 text-blue-400"
                    />
                  </button>
                </div>

                <div class="relative lg:!mt-6">
                  <input
                    placeholder="Search"
                    class="
                      p-4
                      pl-11
                      w-full
                      text-xs
                      rounded-[8px]
                      text-font-1
                      bg-transparent
                      outline-none
                      placeholder:text-font-2
                      border-2 border-gray-700
                    "
                  >

                  <div class="absolute left-4 top-4">
                    <Icon
                      name="search"
                      class="w-[20px] h-[20px]"
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <span
                      class="
                        text-xxs
                        font-medium
                        text-font-2
                      "
                    >
                      Your tokens
                    </span>
                  </div>

                  <div
                    class="
                      space-y-3
                      divide divide-y-[1px] divide-gray-700
                    "
                  >
                    <button
                      v-for="token in tokens"
                      :key="token.name"
                      class="
                        w-full
                        flex
                        items-center
                        space-x-3
                        pt-3
                      "
                      @click.prevent="
                        () => {
                          setIsOpen(false);
                          data.token = { ...token };
                        }
                      "
                    >
                      <div>
                        <img
                          :src="token.icon"
                          class="w-9 h-9"
                        >
                      </div>

                      <div
                        class="
                          flex flex-col
                          space-y-1
                          text-left
                        "
                      >
                        <span
                          class="text-xs text-font-1"
                          v-text="token.symbol"
                        />

                        <span
                          class="text-xs text-font-2"
                          v-text="token.name"
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
~/apps/app/stores/wallet
