import { useWalletStore } from '~/stores/wallet'

export default defineNuxtRouteMiddleware(() => {
  const wallet = useWalletStore()
  const router = useRouter()

  console.log('wallet.connected', wallet?.connected)
  console.log('wallet.cache.phrase', wallet?.cache)

  if ((wallet.cache && wallet.cache.phrase)) {
    return router.push({
      path: '/home'
    })
  }
})
