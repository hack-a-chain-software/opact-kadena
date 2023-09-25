<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'

const route = useRoute()

const params = computed<any>(() => {
  const [
    tokenId = '',
    amount = '',
    pubkey = '',
  ] = window.atob(route.params.params).split('-') || []

  return {
    tokenId,
    amount,
    pubkey
  }
})

const lockedToken = computed(() => {
  return tokens.find(({ id }) => id === Number(params.value.tokenId || -1))
})

const buttonIsDisabled = computed(() => {
  if (params.value.tokenId && params.value.amount && params.value.pubkey) {
    return false
  }

  return !data.token || !data.amount
})

const tokens = [
  {
    id: 1,
    icon: '/kda.png',
    name: 'Kadena',
    symbol: 'KDA'
  },
  {
    id: 2,
    icon: '/kdx.png',
    name: 'Kaddex',
    symbol: 'KDX'
  },
  {
    id: 3,
    icon: '/kishk.png',
    name: 'KishuKen',
    symbol: 'KISHK'
  }
]

const data = reactive({
  amount: '',
  error: '',
  balance: 0,
  loading: false,
  token: tokens[0],
  depositing: false,
  depositMessage: '',
  showCollapsible: false,
})

const isOpen = ref(false)

function setIsOpen (value) {
  isOpen.value = value
}

const deposit = async () => {
  console.log('foooooooooo')
}
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

        <div class="mt-2 p-4 rounded-[8px] flex items-center justify-between bg-gray-700">
          <div class="flex-grow">
            <input
              v-if="!params.amount"
              v-model="data.amount"
              placeholder="0"
              class="
                bg-transparent
                text-xl text-font-1
                outline-none
                w-full
              "
            >

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
            />
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
                cursor-not-allowed
                disabled:opacity-[0.8]
              "
              :disabled="lockedToken !== -1"
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
          <span class="text-xxs text-font-2"> to </span>
        </div>

        <input
          readonly
          :value="`OZK${params.pubkey}`"
          :class="'cursor-not-allowed'"
          class="mt-2 p-4 bg-gray-700 rounded-[8px] text-xs break-words w-full outline-none"
        />
      </div>
    </div>

    <div class="pt-4 lg:pt-8">
      <Collapsible
        v-model="data.showCollapsible"
        title="Transaction Details"
        class="!bg-gray-700"
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
        "
        :class="
          buttonIsDisabled
            ? 'bg-gray-700'
            : 'bg-blue-gradient'
        "
        @click.prevent="deposit()"
      >
        <span class="text-font-1"> Confirm Payment </span>
      </button>
    </div>

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
            class="fixed inset-0 bg-black bg-opacity-25"
          />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="
              flex
              min-h-full
              items-end
              justify-center
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
                  space-y-4
                  bg-gray-800
                "
              >
                <div
                  class="
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

                <div class="relative">
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
