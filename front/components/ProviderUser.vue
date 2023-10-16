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
  <div class="pt-[18px] lg:pt-[32px]">
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
        rounded-[8px]
        items-center
        bg-gray-800
        space-x-2
        border border-transparent
      "
      :class="provider && '!border-blue-400'"
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
        "
      >
        <Icon
          :name="provider?.metadata?.icon"
          class="w-6 h-6"
        />
      </div>

      <div class="flex-grow break-words overflow-hidden">
        <span
          class="text-sm font-medium text-font-1"
          v-text="
            shortenAddress(
              provider?.account?.address ||
                '' ||
                provider?.account?.account?.account ||
                '',
              20
            )
          "
        />
      </div>
    </div>
  </div>
</template>
