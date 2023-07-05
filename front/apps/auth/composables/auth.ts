export const useAuthCurrentStep = () =>
  useState<string>('auth-current-step', () => 'connect')

export const useAuthStorage = (
  { authWalletKey } = {
    authWalletKey: 'opact-wallet:cache'
  }
) => {
  const cache = useCookie<any>(authWalletKey)

  const store = (newWallet: any) => {
    console.log(newWallet.mnemonic, 'newqepwqkopdwqkpo')
    cache.value = {
      phrase: newWallet.mnemonic.phrase,
      password: newWallet.mnemonic.password,
      wordlist: newWallet.mnemonic.wordlist
    }
  }

  const clear = () => {
    cache.value = null
  }

  return { store, clear, cache }
}
