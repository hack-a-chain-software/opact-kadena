<script lang="ts" setup>
import Pact from 'pact-lang-api'
import { onBeforeMount, reactive } from 'vue'

const RPC = process.env.NODE_ENV !== 'development'
  ? 'https://kb96ugwxhi.execute-api.us-east-2.amazonaws.com'
  : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:9001'

const props = withDefaults(
  defineProps<{
    id?: string;
  }>(),
  {
    id: '',
  }
)

const data = reactive({
  token: null
})

onBeforeMount(() => {
  if (!props.id) {
    return
  }

  (async () => {
    try {
      const network = RPC

      const createdAt = Math.round(new Date().getTime() / 1000) - 10

      const {
        result: {
          data: {
            data: res
          }
        }
      } = await Pact.fetch.local({
        pactCode: `(free.poly-fungible-v2-reference.get-manifest "${props.id}")`,
        meta: Pact.lang.mkMeta('', '0', 0, 0, createdAt, 0)
      }, network)

      const
        {
          datum
        }
      = res[0]

      data.token = {
        name: datum.title,
        uri: datum.assetUrl,
      }
    } catch (e) {
      console.warn(e)
    }
  })()

})
</script>

<template>
  <div
    class="lg:max-w-[204px] pb-4 px-2 pt-2 rounded-[8px] bg-gray-800"
  >
    <img
      v-if="data.token"
      :src="data.token.uri"
      class="rounded-[8px] w-[150px] h-[150px] mx-auto lg:min-w-[180px] lg:min-h-[182px]"
    >

    <div
      class="pt-3"
      v-if="data.token"
    >
      <span class="text-font-1 text-xxs">
        {{ data?.token?.name || '' }}
      </span>
    </div>
  </div>
</template>
