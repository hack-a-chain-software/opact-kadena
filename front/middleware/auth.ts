import { useWalletStore } from '~/stores/wallet'

export default defineNuxtRouteMiddleware((to) => {
  const wallet = useWalletStore()
  const router = useRouter()

  if (wallet.cache && wallet.cache.phrase) {
    return
  }

  return router.push({
    path: '/auth',
    query: {
      next: to.path
    }
  })
})
