import { computed } from 'vue'

const useProvider = () =>
  useState<any>('extensions:provider', () => null)

export const useExtensions = () => {
  const provider = useProvider()

  const login = async (newProvider: any, callback: any) => {
    // const { store } = useAuthStorage()

    try {
      await newProvider.connect(callback)

      provider.value = newProvider

      // store({
      //   providers: [{ chainKey, adapterKey }]
      // })
    } catch (e) {
      console.log(e)
    }
  }

  const logout = async () => {
    if (!provider.value) {
      return
    }

    await provider.value.disconnect()

    provider.value = null

    const { clear } = useAuthStorage()

    clear(['providers'])
  }

  const isConnected = computed(() => !!provider.value)

  return {
    login,
    logout,
    provider,
    isConnected
  }
}
