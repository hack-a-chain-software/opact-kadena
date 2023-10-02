<script lang="ts" setup>
import axios from 'axios'
import { onBeforeMount } from 'vue'
import { useInvoice } from '~/hooks/invoice'
import { computePaymentParams } from '~/utils/sdk'

const { provider } = useExtensions()

const {
  data,
  token,
  pubkey,
  amount,
  params,
  buttonIsDisabled,
} = useInvoice()

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
      provider.value.account.account.publicKey,
      token.value.namespace
    )

    await provider.value.transaction(
      transactionArgs,
      (message: string) => data.depositMessage = message
    )

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
                disabled:opacity-[0.8]
              "
              @click.prevent="data.show = true"
            >
              <div class="shrink-0">
                <img
                  :src="token.icon"
                  class="w-5 h-5"
                >
              </div>

              <div>
                <span v-text="token.symbol" />
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

    <TxDetails
      :fee="0"
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

    <SelectToken
      :show="data.show"
      @close="data.show = false"
      @selected="data.token = $event"
    />
  </div>
</template>
