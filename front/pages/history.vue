<script setup lang="ts">
import { computed, reactive } from 'vue'
import { format, getDayOfYear, isWithinInterval } from 'date-fns'
import { useAppState } from '~/hooks/state'

const {
  receipts: receiptState
} = useAppState()

definePageMeta({
  layout: 'app',
  middleware: 'auth'
})

useHead({
  title: 'History'
})

const data = reactive<any>({
  range: [],
  filters: [
    'search'
  ]
})

const range = ref([])

const type = ref('')

const search = ref('')

const filterValidation = {
  range: {
    check: ({ date }: any) => {
      const flag = new Date(date)

      return isWithinInterval(flag, {
        start: range.value[0] || new Date(),
        end: range.value[1] || new Date()
      })
    }
  },
  type: {
    check: ({ type: receiptType }: any) => {
      if (type.value === 'all') {
        return true
      }

      return receiptType === type.value
    }
  },
  search: {
    check: ({ sender, receiver, type }: any) => {
      return sender.includes(search.value) || receiver.includes(search.value) || type.includes(search.value)
    }
  }
}

const updateSearch = (value: any) => {
  search.value = value
}

const updateType = (value: any) => {
  type.value = value

  if (value === 'all') {
    data.filters = data.filters.filter((filter: any) => filter !== 'type')

    return
  }

  data.filters.push('type')
}

const updateFilter = (value: any) => {
  range.value = value

  if (value.length === 0) {
    data.filters = data.filters.filter((filter: any) => filter !== 'range')

    return
  }

  data.filters.push('range')
}

const filtered = computed(() => {
  return receiptState.value.filter((receipt: any) => {
    return data.filters.every((filter: string) => filterValidation[filter].check(receipt))
  })
})

const receipts = computed(() => {
  return filtered.value.reduce((acc: any, curr: any) => {
    const flag = getDayOfYear(new Date(curr.date))

    if (!acc[flag]) {
      acc[flag] = {
        receipts: [],
        date: format(new Date(curr.date), 'MMM dd, yyyy')
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
    <HistoryHeader
      @update-type="updateType($event)"
      @update-filter="updateFilter($event)"
      @update-search="updateSearch($event)"
    />

    <div
      v-if="receiptState?.length > 0"
      class="w-full"
    >
      <HistoryGroup
        v-for="receipt in receipts"
        v-bind="receipt"
        :key="receipt.date"
      />
    </div>

    <div
      v-else
      class="flex justify-center py-[120px] flex-col items-center space-y-8"
    >
      <div>
        <img
          class="min-w-[284px]"
          src="/empty-receipts.png"
        >
      </div>

      <span
        class="text-font-2 text-[18px] font-[600]"
      >
        You don't have any activity yet.
      </span>
    </div>
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
