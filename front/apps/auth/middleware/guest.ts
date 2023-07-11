import { useWalletStore } from '~/apps/auth/stores/wallet'

export default defineNuxtRouteMiddleware(() => {
  const wallet = useWalletStore()
  const router = useRouter()

  if (wallet.connected || (wallet.cache && wallet.cache.phrase)) {
    return router.push({
      path: '/app'
    })
  }
})
