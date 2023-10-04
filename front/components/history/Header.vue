<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { format } from 'date-fns'

const data = reactive({
  range: [],
  search: '',
  type: 'all',
  showPicker: false,
})

const emit = defineEmits(['updateFilter', 'updateType', 'updateSearch'])

const selectedPicker = (range: any) => {
  data.range = range
  data.showPicker = false

  emit('updateFilter', range)
}

const selectedDate = computed(() => {
  if (data.range.length === 0) {
    return 'Selected Date'
  }

  return `${format(data.range[0] || new Date(), 'yyyy/MM/dd')} - ${format(data.range[1] || new Date(), 'yyyy/MM/dd')}`
})

const handlepicker = () => {
  if (data.range.length === 0) {

    data.showPicker = true

    return
  }

  data.range = [],
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
  <div
    class="w-full"
  >
    <div
      class="pb-[48px]"
    >
      <div class="pb-[2px]">
        <span class="text-font-2 text-xxs font-medium">
          Balance
        </span>
      </div>

      <div class="flex items-center space-x-4">
        <div>
          <span class="text-lg font-medium text-font-1">
            0 USD
          </span>
        </div>

        <div>
          <Icon name="visible" class="w-6 h-6" />
        </div>
      </div>
    </div>

    <div
      class="grid grid-cols-[1fr,auto] gap-[24px]"
    >
      <div
        class="border border-gray-600  rounded-[8px] flex items-cneter p-4 space-x-2"
      >
        <div>
          <Icon
            name="search"
            class="w-6 h-6"
          />
        </div>

        <input
          v-model="data.search"
          @input="handleSearch"
          placeholder="Search"
          class="
            text-xs
            text-font-2
            w-full
            bg-transparent
            outline-none
          "
        />
      </div>

      <div
        @click.prevent="handlepicker()"
        class="border border-gray-600 rounded-[8px] p-4  flex items-center space-x-2 cursor-pointer min-w-[267px] hover:opacity-80"
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

        <div
          v-if="data.range.length !== 0"
          class="ml-auto"
        >
          <Icon
            name="close"
            class="w-5 h-5 text-blue-400 ml-3 mb-[2px]"
          />
        </div>
      </div>

      <!-- <div
        class="border border-gray-600 rounded-[8px] p-4  flex items-center space-x-2 cursor-pointer"
      >
        <div>
          <Icon
            name="filter"
            class="w-6 h-6 text-blue-400"
          />
        </div>

        <div>
          <span
            class="text-font-1 text-xxs"
          >
            Filter
          </span>
        </div>
      </div> -->
    </div>

    <div
      class="pt-[32px] flex items-center space-x-[24px]"
    >
      <button
        @click.prevent="handleType('all')"
        :class="data.type === 'all' && 'bg-blue-400'"
        class="px-4 py-2 text-xxs text-font-2 hover:bg-gray-800 rounded-[8px]"
      >
        All time
      </button>

      <button
        @click.prevent="handleType('withdraw')"
        :class="data.type === 'withdraw' && 'bg-blue-400'"
        class="px-4 py-2 text-xxs text-font-2 hover:bg-gray-800 rounded-[8px]"
      >
        Withdraw
      </button>

      <button
        @click.prevent="handleType('deposit')"
        :class="data.type === 'deposit' && 'bg-blue-400'"
        class="px-4 py-2 text-xxs text-font-2 hover:bg-gray-800 rounded-[8px]"
      >
        Deposit
      </button>
    </div>

    <DatePicker
      :show="data.showPicker"
      @close="data.showPicker = false"
      @selected="selectedPicker"
    />
  </div>
</template>
