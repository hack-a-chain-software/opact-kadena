<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    date?: any;
    receipts?: any;
  }>(),
  {
    date: '',
    receipts: [],
  }
)
</script>

<template>
  <div
    class="w-full pt-[60px]"
  >
    <div
      class="pb-3 pl-[40px]"
    >
      <span
        v-text="date"
        class="text-xxs text-font-2"
      />
    </div>

    <div
      class="p-6 bg-gray-900 rounded-[12px] flex flex-col border border-gray-600"
    >
      <HistoryItem
        v-bind="receipt"
        :key="receipt.date + 'sub' + id"
        v-for="(receipt, id) in receipts"
      />
    </div>
  </div>
</template>
