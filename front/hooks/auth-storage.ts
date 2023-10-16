export const useAuthStorage = (
  { authWalletKey } = {
    authWalletKey: 'opact-wallet:cache'
  }
) => {
  const cache = useCookie<any>(authWalletKey)

  const store = (payload: any) => {
    cache.value = {
      ...cache.value,
      ...payload
    }
  }

  const clear = (keys: string[]) => {
    const entries = Object.entries(cache.value)

    const filtered = entries.filter(
      ([key]) => !keys.includes(key)
    )

    cache.value = Object.fromEntries(filtered)
  }

  return { store, clear, cache }
}
