<script setup lang="ts">
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { kadenaTokens as tokens } from 'opact-sdk'
import { useAppStore } from '~/stores/app'

const app = useAppStore()

const { isLoading } = storeToRefs(app)

const router = useRouter()

const { provider } = useExtensions()

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
  if (data.loading) {
    return
  }

  try {
    data.loading = true

    await provider.value.sendNFTFaucetTransaciton()

    isLoading.value = true
    router.push('/home')
  } catch (e) {
    console.warn(e)
  } finally {
    data.loading = false
  }
}
</script>

<template>
  <UICardBody>
    <UICardHeader
      title="Opact Testnet Faucet"
    />

    <div>
      <div class="pb-4">
        <span class="text-xxs text-font-1 lg:text-xs">
          Random Alpha Slayers Club
        </span>
      </div>

      <button
        class="
          p-4
          flex
          w-full
          rounded-[8px]
          justify-between
          items-center
          bg-gray-800
          hover:opacity-90
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      >
        <div class="space-x-4 flex items-center">
          <img
            :src="`https://d2k5a3kljnz265.cloudfront.net/nft/kadena-mining-club@kadena/1.webp`"
            class="h-[60px] w-[60px] rounded-[8px]"
          >

          <span
            class="text-xs text-font-1"
            v-text="`Alpha Slayers Club#?`"
          />
        </div>
      </button>
    </div>

    <ProviderUser
      v-if="provider"
      label="Wallet Receiver"
      :provider="provider"
    />

    <UIButtonInline
      :loading="data.loading"
      class="mt-full lg:mt-[40px]"
      :label="
        data.loading ? data.progress : 'Get Random NFT'
      "
      @click="pay()"
    />
  </UICardBody>
</template>
