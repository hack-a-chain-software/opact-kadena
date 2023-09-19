<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'
import { storeToRefs } from 'pinia'
import WalletConnector from '../../deposit/form/WalletConnector.vue'
import { useWalletStore } from '~/apps/auth/stores/wallet'

const wallet = useWalletStore()

const { node } = storeToRefs(wallet)

const { provider } = useExtensions()

const isOpen = ref(false)
const isConnectWalletOpen = ref(false)

function setIsOpen (value) {
  isOpen.value = value
}

function setConnectWalletOpen (value) {
  isConnectWalletOpen.value = value
}

const { step } = useSendForm()

const router = useRouter()

const data = reactive({
  amount: 0,
  token: {
    icon: '/kda.png',
    name: 'Kadena',
    symbol: 'KDA'
  },
  showCollapsible: false,
  addressTo: '18239893320378825242612781130732771293886265265465351431370885768079954670030'
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

const send = async () => {
  try {
    // setTimeout(() => {
    //   step.value = 'success'
    // }, 3000)
    // step.value = 'progress'
    const transactionArgs = await wallet.withdraw(
      Number(data.amount),
      data.addressTo
    )

    const res = await provider.value.transaction({ ...transactionArgs, node: node.value })

    console.log('res', res.requestKeys[0])
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

      <div class="pt-6">
        <Collapsible
          v-model="data.showCollapsible"
          title="Transaction Details"
        >
          <div>
            <div class="flex items-center justify-between">
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
                  0,02 KDA
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
                  class="text-xxs font-medium text-blue-300"
                >
                  156,02 KDA
                </span>
              </div>
            </div>
          </div>
        </Collapsible>
      </div>
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
        <span class="text-font-1"> Send Token </span>
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
