<script lang="ts" setup>
withDefaults(
  defineProps<{
    label?: string;
    provider?: any;
  }>(),
  {
    provider: null,
    label: 'Fee Payer'
  }
)
</script>

<template>
  <div>
    <div class="flex justify-between pb-4">
      <span
        v-text="label"
        class="text-xs font-medium text-font-1"
      />
    </div>

    <div
      class="
        p-4
        flex
        w-full
        h-[72px]
        rounded-[8px]
        items-center
        bg-gray-800
        space-x-4
        border border-transparent
      "
    >
      <div
        class="
          w-[40px]
          h-[40px]
          max-h-[40px]
          flex
          items-center
          justify-center
          bg-dark-blue
          rounded-[8px]
          shrink-0
        "
      >
        <img
          :src="provider?.metadata?.icon"
          class="w-10 h-10"
        />
      </div>

      <div
        class="
          flex-grow
          break-words
          overflow-hidden overflow-ellipsis
        "
      >
        <span
          class="
            text-sm
            font-medium
            text-font-1
            line-clamp-1
          "
          v-text="
            provider?.account?.address ||
            provider?.account?.account?.account
          "
        />
      </div>
    </div>
  </div>
</template>
