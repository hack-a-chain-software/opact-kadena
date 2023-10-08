<script setup lang="ts">
import { reactive } from 'vue'
import { tokens } from '~/utils/constants'

const router = useRouter()

const { provider, logout } = useExtensions()

const data = reactive({
  error: '',
  show: false,
  amount: 100,
  token: tokens[0],
  showGenerateLink: false,
  loading: false
})

const pay = async () => {
  try {
    data.loading = true

    await provider.value.faucet(data.token.namespace)

    router.push('/home')
  } catch (e) {
    console.warn(e)
  } finally {
    data.loading = false
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
              class="
                bg-gray-800
                px-3
                rounded-full
                py-1
                flex
                space-x-1
                w-max
                items-center
              "
              @click.prevent="data.show = true"
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
            {{ provider?.account?.address ||
                provider?.account?.account?.account }}
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

    <SelectToken
      :show="data.show"
      @close="data.show = false"
      @selected="data.token = $event"
    />
  </div>
</template>
