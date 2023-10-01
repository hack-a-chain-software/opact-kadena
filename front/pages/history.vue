<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'
import { format, getDayOfYear } from 'date-fns'

const wallet = useWalletStore()

const { state } = storeToRefs(wallet)

definePageMeta({
  layout: 'app',
  middleware: 'auth'
})

useHead({
  title: 'History'
})

const receipts = computed(() => {
  return state.value.receipts.reduce((acc: any, curr: any) => {
    const flag = getDayOfYear(new Date(curr.date))


    if (!acc[flag]) {
      acc[flag] = {
        receipts: [],
        date: format(new Date(curr.date), 'MMM dd, yyyy'),
      }
    }

    acc[flag].receipts.push(curr)

    return acc
  }, {})
})
</script>

<template>
  <div
    class="lg:flex lg:justify-center max-w-[1028px] items-center mx-auto flex-col"
  >
    <HistoryHeader />

    <HistoryGroup
      v-bind="receipt"
      :key="receipt.date"
      v-for="receipt in receipts"
    />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
