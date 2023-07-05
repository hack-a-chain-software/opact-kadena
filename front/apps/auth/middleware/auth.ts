import { useWalletStore } from '~/apps/auth/stores/wallet'

export default defineNuxtRouteMiddleware((to) => {
  const wallet = useWalletStore()
  const router = useRouter()

  if (wallet.cache) {
    return
  }

  if (!wallet.connected) {
    return router.push({
      path: '/auth',
      query: {
        next: to.path
      }
    })
  }
})
