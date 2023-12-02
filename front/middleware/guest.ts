import { useWalletStore } from '~/stores/wallet'

export default defineNuxtRouteMiddleware(() => {
  const wallet = useWalletStore()
  const router = useRouter()

  console.log('wallet.connected', wallet.connect)
  console.log('wallet.cache.phrase', wallet.cache.phrase)

  if (
    wallet.connected ||
    (wallet.cache && wallet.cache.phrase)
  ) {
    return router.push({
      path: '/home'
    })
  }
})
