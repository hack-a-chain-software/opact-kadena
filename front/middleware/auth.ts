import { useWalletStore } from '~/stores/wallet'

export default defineNuxtRouteMiddleware((to) => {
  const router = useRouter()
  const wallet = useWalletStore()

  const appConfig = useRuntimeConfig()

  if (wallet.cache && wallet.cache.phrase) {
    if (
      to.path.includes('nft') &&
      appConfig.public.nftDisabled
    ) {
      return router.push({
        path: '/home'
      })
    }

    if (
      to.path.includes('faucet') &&
      appConfig.public.faucetDisabled
    ) {
      return router.push({
        path: '/home'
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
