import { useWalletStore } from '~/stores/wallet'

export default defineNuxtRouteMiddleware(() => {
  const router = useRouter()
  const wallet = useWalletStore()

  if (wallet.connected ||
    (wallet.cache && wallet.cache.phrase)
  ) {
    return router.push({
      path: '/home'
    })
  }

  return router.push({
    path: '/auth'
  })
})
