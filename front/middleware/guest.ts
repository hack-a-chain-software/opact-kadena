import { useAuthStorage } from '~/hooks/auth-storage'

export default defineNuxtRouteMiddleware(() => {
  const router = useRouter()
  const { cache } = useAuthStorage()

  if (cache.value) {
    return router.push({
      path: '/'
    })
  }
})
