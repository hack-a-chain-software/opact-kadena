<script setup lang="ts">
withDefaults(
  defineProps<{
    token?: any;
  }>(),
  {
    token: null
  }
)
</script>

<template>
  <div>
    <div class="flex justify-between pb-2 lg:pb-4">
      <span class="text-xxs lg:text-xs font-medium text-font-1">
        Token
      </span>
    </div>

    <div
      class="
        p-4
        flex
        w-full
        min-h-[56px] lg:min-h-[64px]
        rounded-[8px]
        justify-between
        items-center
        bg-gray-800
        hover:opacity-90
        disabled:opacity-60
        box-border
        border border-transparent
        disabled:cursor-not-allowed
      "
    >
      <div class="space-x-4 flex items-center">
        <img :src="token.icon.replace('https://opact.io/', '/')" class="w-6 h-6 lg:w-10 lg:h-10" />

        <span
          v-text="token.name"
          class="text-xs lg:text-sm text-font-1"
        />
      </div>
    </div>
  </div>
</template>
