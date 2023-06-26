import { useWalletStore } from '~/apps/wallet/stores/wallet'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useWalletStore()
  const router = useRouter()

  if (!auth.loggedIn) {
    return router.push({
      path: '/auth/login',
      query: {
        next: to.path
      }
    })
  }
})
