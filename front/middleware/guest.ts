import { useOpactWallet } from '~/hooks/opact-wallet'

export default defineNuxtRouteMiddleware(() => {
  const router = useRouter()

  const { account } = useOpactWallet()

  if (account.value) {
    return router.push({
      path: '/home'
    })
  }
})
