<script lang="ts" setup>
import { reactive, watch } from 'vue'
import Pact from 'pact-lang-api'
import { getPoseidonTokenHash } from 'opact-sdk'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'

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
  <TransitionRoot as="template" :show="show">
    <Dialog as="div" class="relative z-10" @close="close()">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-[rgba(6,_10,_15,_0.80)]"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="
            flex
            min-h-full
            items-end
            justify-center
            lg:justify-center lg:items-start lg:pt-[312px]
            p-4
          "
        >
          <TransitionChild
            as="template"
            enter="duration-200 ease-out"
            enter-from="opacity-0 translate-y-[600px]"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 translate-y-[600px]"
          >
            <DialogPanel
              class="
                p-4
                w-full
                rounded-[12px]
                lg:max-w-[500px]
                space-y-4
                bg-gray-800
                lg:p-6 lg:border-[2px] lg:border-gray-600
              "
            >
              <div
                class="
                  lg:hidden
                  flex
                  items-center
                  justify-center
                  relative
                "
              >
                <button
                  class="absolute left-0"
                  @click.prevent="close()"
                >
                  <Icon
                    name="chevron"
                    class="text-font-1 rotate-90"
                  />
                </button>

                <DialogTitle
                  as="h3"
                  class="text-font-1 text-xs"
                >
                  Select NFT
                </DialogTitle>
              </div>

              <div
                class="
                  hidden
                  lg:flex
                  relative
                  !mt-0
                  justify-between
                  items-center
                  mx-[-24px]
                  px-[24px]
                  pb-4
                  border-b-[2px] border-gray-600
                "
              >
                <DialogTitle
                  as="h3"
                  class="text-font-1 text-sm"
                >
                  Select NFT
                </DialogTitle>

                <button
                  class="w-8 h-8"
                  @click.prevent="close()"
                >
                  <Icon
                    name="close"
                    class="rotate-90 w-4 h-4 text-blue-400"
                  />
                </button>
              </div>

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
                        class="
                          w-[125px]
                          h-[125px]
                          rounded-[6px]
                        "
                      >
                    </div>

                    <div
                      class="
                        flex flex-col
                        space-y-1
                        text-left
                      "
                    >
                      <span
                        class="
                          text-xxs text-font-1
                          font-[500]
                        "
                        v-text="token.name"
                      />
                    </div>
                  </button>
                </div>

                <div
                  v-else
                  class="
                    h-[180px]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Icon
                    name="spinner"
                    class="
                      animate-spin
                      text-white
                      ml-[12px]
                    "
                  />
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
