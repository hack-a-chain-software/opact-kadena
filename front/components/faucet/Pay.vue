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
  progress: 'Sending TX',
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
      <div
        class="pb-4"
      >
        <span class="text-xxs text-font-1 lg:text-xs"> Amount </span>
      </div>

      <div class="p-4 rounded-[8px] flex items-center justify-between bg-gray-800 border border-blue-400">
        <div class="flex-grow " >
          <input
            readonly
            v-model="data.amount"
            placeholder="0"
            class="
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
              bg-dark-blue
              px-3
              rounded-full
              py-1
              flex
              space-x-1
              w-max
              hover:opacity-80
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

    <ProviderUser
      v-if="provider"
      label="Wallet Receiver"
      :provider="provider"
    />

    <ButtonInline
      :loading="data.loading"
      @click="pay()"
      class="mt-full lg:mt-[40px]"
      :label="data.loading ? data.progress : 'Get Tokens'"
    />

    <ModalTokens
      :show="data.show"
      @close="data.show = false"
      @selected="data.token = $event"
    />
  </div>
</template>
