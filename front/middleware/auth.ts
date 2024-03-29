import { useWalletStore } from '~/stores/wallet'

export default defineNuxtRouteMiddleware((to) => {
  const router = useRouter()
  const wallet = useWalletStore()

  const appConfig = useRuntimeConfig()

  if (wallet.cache && wallet.cache.phrase) {
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

  return router.push({
    path: '/auth',
    query: {
      next: to.path
    }
  })
})
