export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const publicVars = ['gaId', 'gtmEnabled']

  publicVars.forEach((varName) => {
    if (config.public[varName] !== undefined) {
      return
    }

    console.warn(
      `the environment variable "${varName}" was not inserted.`
    )
  })
})
