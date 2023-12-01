import { useOpactWallet } from "~/hooks/opact-wallet"

export default defineNuxtRouteMiddleware((to) => {
  const router = useRouter()

  const { account } = useOpactWallet()

  const { provider, logout } = useExtensions()

  if (provider.value) {
    logout()
  }

  if (account.value) {
    return
  }

  return router.push({
    path: '/auth',
    query: {
      next: to.path
    }
  })
})
