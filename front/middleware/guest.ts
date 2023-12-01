// import { useOpactWallet } from '~/hooks/opact-wallet'

export default defineNuxtRouteMiddleware(() => {
  const router = useRouter()

  // const { account } = useOpactWallet()

  // if (!account.value) {
  //   return
  // }

  return router.push({
    path: '/home'
  })

  // return router.push({
  //   path: '/auth'
  // })
})
