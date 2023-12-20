<script lang="ts" setup>
import { reactive } from 'vue'

withDefaults(
  defineProps<{
    token?: any;
  }>(),
  {
    token: null
  }
)

const data = reactive({
  show: false
})

const emit = defineEmits(['selected'])
</script>

<template>
  <div>
    <div>
      <div class="flex justify-between pb-2 lg:pb-4">
        <span
          class="
            text-font-1
            text-xxs lg:text-xs
            font-medium
          "
        >
          Select Token
        </span>
      </div>

      <button
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
        @click.prevent="data.show = !data.show"
      >
        <div v-if="!token">
          <span class="text-font-2 text-xs font-medium">
            Choose Token
          </span>
        </div>

        <div v-else class="space-x-4 lg:space-x-2 flex items-center">
          <img :src="token.icon.replace('https://opact.io/', '/')" class="w-6 h-6 lg:w-10 lg:h-10" />

          <span
            v-text="token.name"
            class="text-xs lg:text-sm text-font-1"
          />
        </div>

        <div>
          <Icon
            name="chevron"
            class="w-5 h-5 rotate-[-90deg] text-font-1"
          />
        </div>
      </button>
    </div>

    <ModalTokens
      :show="data.show"
      @close="data.show = false"
      @selected="emit('selected', $event)"
    />
  </div>
</template>
