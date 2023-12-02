import { useAuthStorage } from '~/hooks/auth-storage'

export default defineNuxtRouteMiddleware((to) => {
  const router = useRouter()

  const { cache } = useAuthStorage()

  if (cache.value) {
    return
  }

  return router.push({
    path: '/auth',
    query: {
      next: to.path
    }
  })
})
