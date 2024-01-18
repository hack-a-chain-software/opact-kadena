<script lang="ts" setup>
import { reactive } from 'vue'

const data = reactive({
  input: '',
  baseUrl:
    'https://ffgateway.infura-ipfs.io/ipfs/QmcABQEkMb6sTQ8bzwh4XdtkqHLTUeTkwbwzHSbsUn7mxG',
  tokens: []
})

const emit = defineEmits(['selected', 'close'])

const close = () => {
  emit('close')
}

const select = (token: any) => {
  emit('selected', token)
}
</script>

<template>
  <UIModalRoot
    :show="show"
    @close="close()"
    title="Select NFT"
  >
    <div>
      <div
        v-if="data.tokens.length > 0"
        class="
          gap-3
          grid grid-cols-3
          divide divide-y-[1px] divide-gray-700
        "
      >
        <button
          v-for="token in data.tokens"
          :key="token.name"
          class="
            w-full
            flex flex-col
            p-2
            rounded-[8px]
            bg-gray-700
            items-center
            hover:opacity-80
          "
          @click.prevent="
            () => {
              close();
              select(token);
            }
          "
        >
          <div class="pb-2">
            <img
              :src="token.uri"
              class="w-[125px] h-[125px] rounded-[6px]"
            />
          </div>

          <div class="flex flex-col space-y-1 text-left">
            <span
              class="text-xxs text-font-1 font-[500]"
              v-text="token.name"
            />
          </div>
        </button>
      </div>

      <div
        v-else
        class="h-[180px] flex items-center justify-center"
      >
        <Icon
          name="spinner"
          class="animate-spin text-white ml-[12px]"
        />
      </div>
    </div>
  </UIModalRoot>
</template>
