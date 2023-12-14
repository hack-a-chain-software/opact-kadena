import { useWalletStore } from '~/stores/wallet'

export default defineNuxtRouteMiddleware(() => {
  const router = useRouter()
  const wallet = useWalletStore()

  console.log('wallet.connected', wallet.cache, wallet.connected)

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
