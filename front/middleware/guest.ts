import { useAuthStorage } from '~/hooks/auth-storage'

export default defineNuxtRouteMiddleware(() => {
  const router = useRouter()
  const { cache } = useAuthStorage()

  if (!!cache) {
    return router.push({
      path: '/home'
    })
  }
})
