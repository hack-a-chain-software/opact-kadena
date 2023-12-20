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

  const clear = () => {
    cache.value = null
  }

  return { store, clear, cache }
}
