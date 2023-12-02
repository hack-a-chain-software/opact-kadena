import { useAuthStorage } from '~/hooks/auth-storage'

export default defineNuxtRouteMiddleware((to) => {
  const router = useRouter()

  const { cache } = useAuthStorage()

  console.log('cache', cache)

  if (cache) {
    return
  }

  return router.push({
    path: '/auth',
    query: {
      next: to.path
    }
  })
})
