<script lang="ts" setup>
withDefaults(
  defineProps<{
    date?: any;
    receipts?: any;
  }>(),
  {
    date: '',
    receipts: []
  }
)
</script>

<template>
  <div class="w-full pt-[60px]">
    <div class="pb-3 md:pl-[40px]">
      <span v-text="date" class="text-xxs text-font-2" />
    </div>

    <div
      class="
        px-4
        py-3
        md:px-6
        md:py-6
        bg-gray-900
        rounded-[12px]
        flex flex-col
        gap-6 md:gap-0
        border border-gray-600
      "
    >
      <HistoryItem
        v-bind="receipt"
        :key="receipt.date + 'sub' + id"
        v-for="(receipt, id) in receipts"
      />
    </div>
  </div>
</template>
