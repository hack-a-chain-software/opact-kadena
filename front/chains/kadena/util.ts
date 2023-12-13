import Pact from 'pact-lang-api'
import Client from '@walletconnect/sign-client'
import { WalletConnectModal } from '@walletconnect/modal'
import { getConfig } from 'opact-sdk'

export const projectId = '3974e0e0f91a102389b8cb3fc1a590a5'

export const getWalletConnectClient = async () => {
  return await Client.init({
    relayUrl: 'wss://relay.walletconnect.com',
    projectId: '3974e0e0f91a102389b8cb3fc1a590a5'
  })
}

export const getWalletConnectModal = () => {
  return new WalletConnectModal({
    projectId: '3974e0e0f91a102389b8cb3fc1a590a5',
    themeMode: 'dark'
  })
}

const uri = {
  data: 'iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEVBMTczNDg3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEVBMTczNDk3QzA5MTFFNjk3ODM5NjQyRjE2RjA3QTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowRUExNzM0NjdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowRUExNzM0NzdDMDkxMUU2OTc4Mzk2NDJGMTZGMDdBOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjjUmssAAAGASURBVHjatJaxTsMwEIbpIzDA6FaMMPYJkDKzVYU+QFeEGPIKfYU8AETkCYI6wANkZQwIKRNDB1hA0Jrf0rk6WXZ8BvWkb4kv99vn89kDrfVexBSYgVNwDA7AN+jAK3gEd+AlGMGIBFDgFvzouK3JV/lihQTOwLtOtw9wIRG5pJn91Tbgqk9kSk7GViADrTD4HCyZ0NQnomi51sb0fUyCMQEbp2WpU67IjfNjwcYyoUDhjJVcZBjYBy40j4wXgaobWoe8Z6Y80CJBwFpunepIzt2AUgFjtXXshNXjVmMh+K+zzp/CMs0CqeuzrxSRpbOKfdCkiMTS1VBQ41uxMyQR2qbrXiiwYN3ACh1FDmsdK2Eu4J6Tlo31dYVtCY88h5ELZIJJ+IRMzBHfyJINrigNkt5VsRiub9nXICdsYyVd2NcVvA3ScE5t2rb5JuEeyZnAhmLt9NK63vX1O5Pe8XaPSuGq1uTrfUgMEp9EJ+CQvr+BJ/AAKvAcCiAR+bf9CjAAluzmdX4AEIIAAAAASUVORK5CYII=',
  scheme: 'image/jpeg;base64'
}

export const createDatum = async (): Promise<any> => {
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
export const createManifest = async (
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
