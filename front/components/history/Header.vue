<script lang="ts" setup>
import { format } from 'date-fns'
import { reactive, computed } from 'vue'

const data = reactive({
  range: [],
  search: '',
  type: 'all',
  kdxInDolar: 0,
  kadenaInDolar: 0,
  showPicker: false
})

const emit = defineEmits([
  'updateFilter',
  'updateType',
  'updateSearch'
])

const selectedPicker = (range: any) => {
  data.range = range
  data.showPicker = false

  emit('updateFilter', range)
}

const selectedDate = computed(() => {
  if (data.range.length === 0) {
    return 'Selected Date'
  }

  return `${format(
    data.range[0] || new Date(),
    'yyyy/MM/dd'
  )} - ${format(
    data.range[1] || new Date(),
    'yyyy/MM/dd'
  )}`
})

const handlepicker = () => {
  if (data.range.length === 0) {
    data.showPicker = true

    return
  }

  data.range = []
  emit('updateFilter', [])
}

const handleType = (value: any) => {
  data.type = value

  emit('updateType', data.type)
}

const handleSearch = (event: any) => {
  emit('updateSearch', event.target.value)
}
</script>

<template>
  <div class="w-full">
    <div class="hidden md:grid grid-cols-[1fr,auto] gap-[24px]">
      <div
        class="
          border border-gray-500
          rounded-[8px]
          flex
          items-center
          p-4
          space-x-2
        "
      >
        <div>
          <Icon name="search" class="w-6 h-6" />
        </div>

        <input
          v-model="data.search"
          placeholder="Search"
          class="
            text-xs text-font-2
            p-0
            w-full
            select-none
            focus:outline-none
            bg-transparent
            border-transparent
            !outline-none
            border-transparent focus:border-transparent focus:ring-0
          "
          @input="handleSearch"
        />
      </div>

      <div
        class="
          border border-gray-500
          rounded-[8px]
          p-4
          flex
          items-center
          space-x-2
          cursor-pointer
          min-w-[267px]
          hover:opacity-80
        "
        @click.prevent="handlepicker()"
      >
        <div>
          <Icon
            name="calendar"
            class="w-6 h-6 text-blue-400"
          />
        </div>

        <div>
          <span
            class="text-font-1 text-xxs"
            v-text="selectedDate"
          />
        </div>

        <div v-if="data.range.length !== 0" class="ml-auto">
          <Icon
            name="close"
            class="w-5 h-5 text-blue-400 ml-3 mb-[2px]"
          />
        </div>
      </div>
    </div>

    <div class="pt-[32px] flex items-center space-x-4 md:space-x-[24px]">
      <button
        :class="data.type === 'all' && 'bg-blue-400'"
        class="
          px-2
          md:px-4
          py-2
          font-lato
          text-xs md:text-xxs text-font-1
          hover:bg-gray-800
          rounded-[8px]
        "
        @click.prevent="handleType('all')"
      >
        All time
      </button>

      <button
        :class="data.type === 'withdraw' && 'bg-blue-400'"
        class="
          px-2
          md:px-4
          py-2
          font-lato
          text-xs md:text-xxs text-font-1
          hover:bg-gray-800
          rounded-[8px]
        "
        @click.prevent="handleType('withdraw')"
      >
        Withdraw
      </button>

      <button
        :class="data.type === 'deposit' && 'bg-blue-400'"
        class="
          px-2
          md:px-4
          py-2
          font-lato
          text-xs md:text-xxs text-font-1
          hover:bg-gray-800
          rounded-[8px]
        "
        @click.prevent="handleType('deposit')"
      >
        Deposit
      </button>
    </div>

    <UIDatePicker
      :show="data.showPicker"
      @close="data.showPicker = false"
      @selected="selectedPicker"
    />
  </div>
</template>
