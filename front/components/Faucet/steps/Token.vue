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
  progress: 'Awaiting the transaction outcome',
  showGenerateLink: false,
  loading: false
})

const pay = async () => {
  try {
    data.error = ''
    data.loading = true

    try {
      await provider.value.sendFaucet()
    } catch (e: any) {
      console.warn(e)

      data.error = e.message

      data.loading = false
      data.progress = 'Awaiting the transaction outcome'

      return
    }

    isLoading.value = true
    router.push('/')
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

    <UIInputMoney
      label="Amount"
      readonly
      :modelValue="100"
    />

    <UISelectToken
      :token="data.token"
      @selected="data.token = $event"
    />

    <ProviderUser
      v-if="provider"
      label="Wallet Receiver"
      :provider="provider"
    />

    <UIWarning
      type="warning"
      v-if="data.error"
      :label="data.error"
    />

    <UIButtonInline
      :loading="data.loading"
      class="mt-full lg:mt-[40px]"
      :label="data.loading ? data.progress : 'Get Tokens'"
      @click="pay()"
    />
  </UICardBody>
</template>
