import { useWalletStore } from '~/stores/wallet'

export default defineNuxtRouteMiddleware((to) => {
  const router = useRouter()
  const wallet = useWalletStore()

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
