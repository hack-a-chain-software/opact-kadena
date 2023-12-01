import { useWalletStore } from '~/store/wallet'

export default defineNuxtRouteMiddleware((to) => {
  const wallet = useWalletStore()
  const router = useRouter()
  const { provider, logout } = useExtensions()

  if (provider.value) {
    logout()
  }

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
