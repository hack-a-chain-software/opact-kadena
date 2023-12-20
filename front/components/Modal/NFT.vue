<script lang="ts" setup>
import Pact from 'pact-lang-api'
import { reactive, watch } from 'vue'
import { getPoseidonTokenHash } from 'opact-sdk'

const RPC =
  process.env.NODE_ENV !== 'development'
    ? 'https://kb96ugwxhi.execute-api.us-east-2.amazonaws.com'
    : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:9001'

const props = withDefaults(
  defineProps<{
    show?: boolean;
    accountName: '';
  }>(),
  {
    show: false,
    accountName: ''
  }
)

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

watch(
  () => props.show,
  async (show) => {
    if (!show) {
      data.tokens = []

      return
    }

    try {
      const network = RPC

      const createdAt =
        Math.round(new Date().getTime() / 1000) - 10

      const { result } = await Pact.fetch.local(
        {
          pactCode: `(free.poly-fungible-v2-reference.ids-owned-by "${props.accountName}")`,
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

      data.tokens = (
        await Promise.all(
          result.data.map(async ({ id }: any) => {
            const {
              result: { status, data: detailData }
            } = await Pact.fetch.local(
              {
                pactCode: `(free.poly-fungible-v2-reference.details "${id}" "${props.accountName}")`,
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

            if (
              status === 'failure' ||
              detailData.balance === 0
            ) {
              return
            }

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
      ).filter((item: any) => !!item)
    } catch (e) {
      console.warn(e)
    }
  }
)
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
