<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'
import GenerateLink from '../modals/GenerateLink.vue'

const isOpen = ref(false)

function setIsOpen (value) {
  isOpen.value = value
}

const router = useRouter()

const amounts = [1, 10, 100]

const data = reactive({
  amount: 0,
  token: null,
  token: {
    icon: '/kda.png',
    name: 'Kadena',
    symbol: 'KDA'
  },
  showGenerateLink: false
})

const tokens = [
  {
    id: 1,
    icon: '/kda.png',
    name: 'Kadena',
    symbol: 'KDA'
  },
  {
    id: 3,
    icon: '/kdx.png',
    name: 'Kaddex',
    symbol: 'KDX'
  },
  {
    id: 2,
    icon: '/kishk.png',
    name: 'KishuKen',
    symbol: 'KISHK'
  }
]
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
    <div>
      <div
        class="
          lg:hidden
          w-full
          py-4
          flex
          justify-center
          relative
          items-center
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
            Receive
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

          <Icon
            name="pen"
            class="min-w-[24px] min-h-[24px] text-font-2 lg:invisible"
          />
        </div>
      </div>

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
            class="text-xxs group-active:text-blue-400 text-font-2 font-medium"
            v-text="amount"
          />
        </button>
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
    </div>

    <div class="mt-full lg:mt-[40px]">
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
        @click.prevent="data.showGenerateLink = true"
      >
        <span class="text-font-1">
          Generate payment link
        </span>
      </button>
    </div>

    <GenerateLink
      :token="1"
      :amount="data.amount"
      :show="data.showGenerateLink"
      @close="data.showGenerateLink = false"
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
                    class="w-8 h-8"
                    @click.prevent="setIsOpen(false)"
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
