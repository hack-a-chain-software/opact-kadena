<script lang="ts" setup>
withDefaults(
  defineProps<{
    token: any,
    show?: boolean,
  }>(),
  {
    token: null,
    show: false,
  }
)

const emit = defineEmits(['selected', 'close', 'open'])
</script>

<template>
  <div>
    <div class="pt-8">
      <div class="flex justify-between pb-4">
        <span class="text-xs font-medium text-font-1">
          Select Token
        </span>
      </div>

      <button
        class="
          p-4
          flex
          w-full
          rounded-[8px]
          justify-between
          items-center
          bg-gray-800
          hover:opacity-90
          disabled:opacity-60
          border border-transparent
          disabled:cursor-not-allowed
        "
        :class="token && '!border-blue-400'"
        @click.prevent="emit('open')"
      >
        <div v-if="!token">
          <span class="text-font-2 text-xs font-medium">
            Choose Token
          </span>
        </div>

        <div v-else class="space-x-2 flex items-center">
          <img :src="token.icon" class="w-10 h-10">

          <span v-text="token.name" class="text-sm text-font-1" />
        </div>

        <div>
          <Icon name="chevron" class="w-5 h-5 rotate-[-90deg]" />
        </div>
      </button>
    </div>

    <ModalTokens
      :show="show"
      @close="emit('close', $event)"
      @selected="emit('selected', $event)"
    />
  </div>
</template>
