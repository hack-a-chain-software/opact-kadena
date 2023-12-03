<script lang="ts" setup>
import Pact from 'pact-lang-api'
import { reactive, watch } from 'vue'
import { getPoseidonTokenHash } from 'opact-sdk'
import { useAppState } from '~/hooks/state'

const { userData } = useAppState()

const RPC =
  process.env.NODE_ENV !== 'development'
    ? 'https://kb96ugwxhi.execute-api.us-east-2.amazonaws.com'
    : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:9001'

withDefaults(
  defineProps<{
    show?: boolean;
  }>(),
  {
    show: false
  }
)

const data = reactive({
  input: '',
  tokens: []
})

const emit = defineEmits(['selected', 'close'])

const close = () => {
  emit('close')
}

const select = (token: any) => {
  emit('selected', token)
}

watch(
  userData,
  async (newData) => {
    if (!newData.nfts['poly-fungible-v2-reference']) {
      return
    }

    const items =
      newData.nfts['poly-fungible-v2-reference'].utxos

    try {
      const network = RPC

      const createdAt =
        Math.round(new Date().getTime() / 1000) - 10

      data.tokens = await Promise.all(
        items.map(async ({ id }: any) => {
          const {
            result: {
              data: { data }
            }
          } = await Pact.fetch.local(
            {
              pactCode: `(free.poly-fungible-v2-reference.get-manifest "${id}")`,
              meta: Pact.lang.mkMeta(
                '',
                '0',
                0,
                0,
                createdAt,
                0
              )
            },
            network
          )

          const { datum } = data[0]

          const namespace = {
            id,
            refName: {
              name: 'poly-fungible-v2-reference',
              namespace: 'free'
            },
            refSpec: {
              name: 'poly-fungible-v2',
              namespace: 'kip'
            }
          }

          return {
            id,
            address: 'poly-fungible-v2-reference',
            hash: getPoseidonTokenHash({ namespace }),
            name: datum.title,
            uri: datum.assetUrl,
            namespace
          }
        })
      )
    } catch (e) {
      console.warn(e)
    }
  },
  { immediate: true }
)
</script>

<template>
  <UIModalRoot
    :show="show"
    @close="close()"
    title="Select NFT"
  >
    <div v-if="data.tokens.length > 0">
      <div
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
    </div>

    <div
      v-else
      class="
        flex
        justify-center
        py-[32px]
        flex-col
        items-center
        space-y-4
      "
    >
      <div>
        <img src="/empty-tokens.png" class="w-[218px]" />
      </div>

      <span class="text-font-2 text-[18px] font-[600]">
        You don't have NFTs yet.
      </span>
    </div>
  </UIModalRoot>
</template>
