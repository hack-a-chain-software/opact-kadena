import { useAuthStorage } from '~/hooks/auth-storage'

export default defineNuxtRouteMiddleware((to) => {
  const router = useRouter()
  const { cache } = useAuthStorage()
  const appConfig = useRuntimeConfig()

  console.log('cache', cache)

  if (!!cache.value) {
    if (
      to.path.includes('nft') &&
      appConfig.public.NFT_DISABLED
    ) {
      return router.push({
        path: '/'
      })
    }

    if (
      to.path.includes('faucet') &&
      appConfig.public.FAUCET_DISABLED
    ) {
      return router.push({
        path: '/'
      })
    }

    return
  }

  if (!cache.value) {
    return router.push({
      path: '/auth',
      query: {
        next: to.path
      }
    })
  }
})
