<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWalletStore } from '../stores/wallet'

definePageMeta({
  layout: 'wallet'
})

useHead({
  title: 'Wallet'
})

const wallet = useWalletStore()

const { connected } = storeToRefs(wallet)
</script>

<template>
  <div class="flex flex-col">
    <div v-if="!connected">
      <div
        v-for="{ name, providers, key } in chains()"
        :key="'blockchain' + name"
        class="flex flex-col space-y-[12px]"
      >
        <div v-text="'Blockchain: ' + name" />

        <div class="space-y-[8px]">
          <span> Providers: </span>

          <div>
            <div
              v-for="{ name: n, key: k } in providers"
              :key="'blockchainanme' + key + k"
              @click="wallet.login(key, k)"
              v-text="n"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-else @click="wallet.signPayload('foo')">
      sign this message: foo
    </div>
  </div>
</template>
