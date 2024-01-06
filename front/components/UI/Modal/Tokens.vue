<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { kadenaTokens } from 'opact-sdk'

withDefaults(
  defineProps<{
    show?: boolean;
  }>(),
  {
    show: false
  }
)

const data = reactive({
  input: ''
})

const emit = defineEmits(['selected', 'close'])

const close = () => {
  emit('close')
}

const select = (token: any) => {
  emit('selected', token)
}

const filtered = computed(() => {
  return kadenaTokens.filter(({ name, symbol }: any) => {
    return (
      name
        .toLowerCase()
        .includes(data.input.toLocaleLowerCase()) ||
      symbol
        .toLowerCase()
        .includes(data.input.toLocaleLowerCase())
    )
  })
})
</script>

<template>
  <UIModalRoot
    :show="show"
    @close="close()"
    title="Select token"
  >
    <div class="relative">
      <input
        v-model="data.input"
        placeholder="Search"
        class="
          p-4
          pl-11
          w-full
          text-xs
          rounded-[8px]
          text-font-1
          bg-transparent
          outline-none
          placeholder:text-font-2
          border-2 border-gray-700
        "
      />

      <div class="absolute left-4 top-4">
        <Icon name="search" class="w-[20px] h-[20px]" />
      </div>
    </div>

    <div>
      <div>
        <span class="text-xs text-font-2"> Tokens </span>
      </div>

      <div
        class="
          space-y-3
          divide divide-y-[1px] divide-gray-700
        "
      >
        <button
          v-for="token in filtered"
          :key="token.name"
          class="w-full flex items-center space-x-3 pt-3"
          @click.prevent="
            () => {
              close();
              select(token);
            }
          "
        >
          <div>
            <img :src="token.icon.replace('https://opact.io/', '/')" class="w-9 h-9" />
          </div>

          <div class="flex flex-col space-y-1 text-left">
            <span
              class="text-xs text-font-1"
              v-text="token.symbol"
            />

            <span
              class="text-xs text-font-2"
              v-text="token.name"
            />
          </div>
        </button>
      </div>
    </div>
  </UIModalRoot>
</template>
