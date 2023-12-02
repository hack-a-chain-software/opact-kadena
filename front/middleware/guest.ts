import { useAuthStorage } from '~/hooks/auth-storage'

export default defineNuxtRouteMiddleware(() => {
  const router = useRouter()
  const { cache } = useAuthStorage()

  console.log('cache')

  if (cache) {
    return router.push({
      path: '/home'
    })
  }
})
