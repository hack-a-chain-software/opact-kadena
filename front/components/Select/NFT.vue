<script lang="ts" setup>
import { reactive } from 'vue'

withDefaults(
  defineProps<{
    token: any;
    show?: boolean;
    accountName: any;
    disabled?: boolean;
  }>(),
  {
    show: false,
    token: null,
    disabled: false
  }
)

const data = reactive({
  show: false
})

const emit = defineEmits(['selected', 'close', 'open'])
</script>

<template>
  <div>
    <div class="pt-0">
      <div class="flex justify-between pb-4">
        <span
          class="text-xs font-medium text-font-1"
          :class="disabled && 'opacity-60'"
        >
          Select NFT
        </span>
      </div>

      <button
        :disabled="disabled"
        class="
          p-4
          flex
          w-full
          rounded-[8px]
          justify-between
          items-center
          bg-gray-800
          hover:opacity-90
          text-font-1
          disabled:opacity-60
          border border-transparent
          disabled:cursor-not-allowed
        "
        @click.prevent="data.show = true"
      >
        <div v-if="!token">
          <span class="text-font-2 text-xs font-medium">
            Choose Token
          </span>
        </div>

        <div v-else class="space-x-2 flex items-center">
          <img
            :src="token?.uri"
            class="h-[60px] w-[60px] rounded-[8px]"
          />

          <span v-text="token?.name" class="text-xs" />
        </div>

        <div>
          <Icon
            name="chevron"
            class="w-5 h-5 rotate-[-90deg]"
          />
        </div>
      </button>
    </div>

    <ModalNFT
      :show="data.show"
      :accountName="accountName"
      @close="data.show = false"
      @selected="emit('selected', $event)"
    />
  </div>
</template>
