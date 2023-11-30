export const copyToClipboard = async (value: string) => {
  const { $toaster } = useNuxtApp()

  try {
    await navigator.clipboard.writeText(value)

    $toaster.info({
      type: 'info',
      title: 'Link Copied'
    })
  } catch (e) {
    console.warn(e)
  }
}
