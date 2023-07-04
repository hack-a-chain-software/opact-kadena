import { createGtm } from '@gtm-support/vue-gtm'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  if (!config.public.gtmEnabled) {
    return
  }

  nuxtApp.vueApp.use(
    createGtm({
      id: config.public.gaId,
      enabled: config.public.gtmEnabled,
      defer: true,
      compatibility: true
    }),
    nuxtApp.$router as any
  )
})
