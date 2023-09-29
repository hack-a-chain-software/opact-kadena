<script lang="ts" setup>
import axios from 'axios'
import Pact from 'pact-lang-api'
import { onBeforeMount } from 'vue'
import { useReceiver } from '~/hooks/receiver'
import { computePaymentParams } from '~/utils/sdk'

const { provider } = useExtensions()

const {
  data,
  pubkey,
  amount,
  params,
  buttonIsDisabled,
} = useReceiver()

const emits = defineEmits(['changeStep'])

// TODO: SEND THIS TO NUXTCONFIG
const RPC = process.env.NODE_ENV !== 'development'
  ? 'https://bpsd19dro1.execute-api.us-east-2.amazonaws.com/getdata'
  : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:5000/getdata'

onBeforeMount(() => {
  (async () => {
    data.depositing = true
    const { data: dataApi } = await axios.get(`${RPC}?salt=268`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })

    const { commitments } = dataApi
      .sort((a: any, b: any) => a.txid - b.txid)
      .map(({ events }: any) => events)
      .reduce((acc: any, curr: any) => acc.concat(curr), [])
      .reduce((curr: any, event: any) => {
        if (event.name === 'new-commitment') {
          const commitment = {
            value: event.params[0].int,
            order: event.params[1].int
          }

          curr.commitments = [...curr.commitments, commitment]
        }

        return curr
      }, {
        commitments: []
      }) as any

    console.log('commitments', commitments)

    data.commitments = commitments
    data.depositing = false
    data.depositMessage = 'Generating ZK Proof...'
  })()
})

const deposit = async () => {
  data.error = ''
  data.depositing = true

  try {
    const transactionArgs = await computePaymentParams(
      `0x${pubkey.value}`,
      Number(amount.value),
      data.commitments,
      provider.value.account.account.publicKey
    )

    data.depositMessage = 'Await sign...'

    const tx = await provider.value.transaction(transactionArgs)

    data.depositMessage = 'Awaiting TX results...'

    const RPC = process.env.NODE_ENV !== 'development'
      ? 'https://kb96ugwxhi.execute-api.us-east-2.amazonaws.com'
      : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:9001'

    const {
      result
    } = await Pact.fetch.listen(
      { listen: tx.requestKeys[0] },
      RPC
    )

    if (result.status === 'failure') {
      console.warn(result.error.message)
      data.error = result.error.message

      return
    }

    emits('changeStep', 'success')
  } catch (e) {
    console.warn(e)
    data.depositing = false
    data.depositMessage = "Computing UTXO's Values..."
  }
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
              v-if="!params?.amount"
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
            >
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
              :disabled="true"
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
          :value="pubkey"
          :readonly="params?.pubkey"
          :class="'cursor-not-allowed'"
          class="mt-2 p-4 bg-gray-700 rounded-[8px] text-xs break-words w-full outline-none"
        >
      </div>
    </div>

    <PaymentInfo
      :amount="amount"
    />

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
        <span class="text-font-1"> {{ data.depositing ? data.depositMessage : 'Confirm Payment' }} </span>

        <Icon v-if="data.depositing" name="spinner" class="animate-spin text-white ml-[12px]" />
      </button>
    </div>

    <!-- <TransitionRoot as="template" :show="isOpen">
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
    </TransitionRoot> -->
  </div>
</template>
