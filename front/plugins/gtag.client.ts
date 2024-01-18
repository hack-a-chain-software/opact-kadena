import { createGtm } from '@gtm-support/vue-gtm'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  if (!config.public.GTM_ENABLED) {
    return
  }

  nuxtApp.vueApp.use(
    createGtm({
      id: config.public.GA_ID,
      enabled: config.public.GTM_ENABLED,
      defer: true,
      compatibility: true
    }),
    nuxtApp.$router as any
  )
})
