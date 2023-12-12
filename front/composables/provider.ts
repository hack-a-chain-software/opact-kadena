import { computed } from 'vue'

const useProvider = () =>
  useState<any>('extensions:provider', () => null)

export const useExtensions = () => {
  const provider = useProvider()

  const login = async (newProvider: any, callback: any) => {
    console.log('newProvider.id', newProvider.id)
    if (
      provider.value &&
      provider.value.id === newProvider.id
    ) {
      return callback()
    }

    const _provider = newProvider()

    try {
      await _provider.init()
      await _provider.connect(callback)

      provider.value = newProvider
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
  }

  const isConnected = computed(() => !!provider.value)

  return {
    login,
    logout,
    provider,
    isConnected
  }
}
