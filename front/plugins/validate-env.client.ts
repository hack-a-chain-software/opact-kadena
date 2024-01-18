export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const publicVars = ['GA_ID', 'GTM_ENABLED']

  publicVars.forEach((varName) => {
    if (config.public[varName] !== undefined) {
      return
    }

    console.warn(
      `the environment variable "${varName}" was not inserted.`
    )
  })
})
