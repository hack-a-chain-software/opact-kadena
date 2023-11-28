export default defineNuxtRouteMiddleware((to) => {
  const router = useRouter()

  const { account } = useOpactWallet()

  console.log('account.value', account.value)

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
