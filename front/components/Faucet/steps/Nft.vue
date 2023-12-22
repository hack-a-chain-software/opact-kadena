<script setup lang="ts">
import Pact from 'pact-lang-api'
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { kadenaTokens as tokens, getConfig } from 'opact-sdk'
import { toHex } from 'ethereum-cryptography/utils'
import { getRandomBytesSync } from 'ethereum-cryptography/random'
import { useAppStore } from '~/stores/app'

const app = useAppStore()

const { isLoading } = storeToRefs(app)

const router = useRouter()

const { provider } = useExtensions()

const data = reactive({
  error: '',
  show: false,
  amount: 100,
  token: tokens[0],
  progress: 'Sending TX',
  showGenerateLink: false,
  loading: false
})

const uri = {
  data: 'iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEVBMTczNDg3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEVBMTczNDk3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRUExNzM0NjdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRUExNzM0NzdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjjUmssAAAGASURBVHjatJaxTsMwEIbpIzDA6FaMMPYJkDKzVYU+QFeEGPIKfYU8AETkCYI6wANkZQwIKRNDB1hA0Jrf0rk6WXZ8BvWkb4kv99vn89kDrfVexBSYgVNwDA7AN+jAK3gEd+AlGMGIBFDgFvzouK3JV/lihQTOwLtOtw9wIRG5pJn91Tbgqk9kSk7GViADrTD4HCyZ0NQnomi51sb0fUyCMQEbp2WpU67IjfNjwcYyoUDhjJVcZBjYBy40j4wXgaobWoe8Z6Y80CJBwFpunepIzt2AUgFjtXXshNXjVmMh+K+zzp/CMs0CqeuzrxSRpbOKfdCkiMTS1VBQ41uxMyQR2qbrXiiwYN3ACh1FDmsdK2Eu4J6Tlo31dYVtCY88h5ELZIJJ+IRMzBHfyJINrigNkt5VsRiub9nXICdsYyVd2NcVvA3ScE5t2rb5JuEeyZnAhmLt9NK63vX1O5Pe8XaPSuGq1uTrfUgMEp9EJ+CQvr+BJ/AAKvAcCiAR+bf9CjAAluzmdX4AEIIAAAAASUVORK5CYII=',
  scheme: 'image/jpeg;base64'
}

const createDatum = async (): Promise<any> => {
  const { nodeUrl } = getConfig()

  const createdAt =
    Math.round(new Date().getTime() / 1000) - 10

  const min = Math.ceil(1)

  const max = Math.floor(100)

  const randomId =
    Math.floor(Math.random() * (max - min + 1)) + min

  const res = await Pact.fetch.local(
    {
      pactCode:
        "(kip.token-manifest.create-datum (read-msg 'uri) (read-msg 'datum))",
      envData: {
        uri,
        datum: {
          assetUrl: `https://d2k5a3kljnz265.cloudfront.net/nft/kadena-mining-club@kadena/${randomId}.webp?t=1687187457812`,
          creationDate: '2022-02-09',
          title: `Kadena Mining Club #${randomId}`,
          artistName: 'Mateus de Santana',
          properties: {
            supply: '1',
            dimensions: '80x60cm',
            medium: 'Bonezinho bacana',
            recordDate: '2022-02-09',
            purchaseLocation: 'Direct from Artist',
            description:
              'Signed By Artist And Supplied With Printers Certificate Of Authenticity'
          }
        }
      },
      meta: Pact.lang.mkMeta('', '0', 0, 0, createdAt, 0)
    },
    nodeUrl
  )

  const all = res.result.data

  return all
}

const createManifest = async (
  data: any[]
): Promise<any> => {
  const { nodeUrl } = getConfig()

  const createdAt =
    Math.round(new Date().getTime() / 1000) - 10
  const res = await Pact.fetch.local(
    {
      pactCode:
        "(kip.token-manifest.create-manifest (read-msg 'uri) (read-msg 'data))",
      envData: {
        uri,
        data
      },
      meta: Pact.lang.mkMeta('', '0', 0, 0, createdAt, 0)
    },
    nodeUrl
  )

  const all = res.result.data

  return all
}

const pay = async () => {
  if (data.loading) {
    return
  }

  try {
    data.loading = true

    const id = BigInt(`0x${toHex(getRandomBytesSync(32))}`)

    const datum = await createDatum()

    const manifest = await createManifest([datum])

    await provider.value.sendNFTFaucetTransaciton(id, manifest)

    isLoading.value = true
    router.push('/')
  } catch (e) {
    console.warn(e)
  } finally {
    data.loading = false
  }
}
</script>

<template>
  <UICardBody>
    <UICardHeader
      title="Opact Testnet Faucet"
    />

    <div>
      <div class="pb-4">
        <span class="text-xxs text-font-1 lg:text-xs">
          Random Alpha Slayers Club
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
          disabled:cursor-not-allowed
        "
      >
        <div class="space-x-4 flex items-center">
          <img
            :src="`https://d2k5a3kljnz265.cloudfront.net/nft/kadena-mining-club@kadena/1.webp`"
            class="h-[60px] w-[60px] rounded-[8px]"
          >

          <span
            class="text-xs text-font-1"
            v-text="`Alpha Slayers Club#?`"
          />
        </div>
      </button>
    </div>

    <ProviderUser
      v-if="provider"
      label="Wallet Receiver"
      :provider="provider"
    />

    <UIButtonInline
      :loading="data.loading"
      class="mt-full lg:mt-[40px]"
      :label="
        data.loading ? data.progress : 'Get Random NFT'
      "
      @click="pay()"
    />
  </UICardBody>
</template>
