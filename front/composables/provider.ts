import { computed } from 'vue'

const useProvider = () =>
  useState<any>('extensions:provider', () => null)

export const useExtensions = () => {
  const provider = useProvider()

  const login = async (newProvider: any, callback: any) => {
    const _provider = newProvider()

    if (
      provider.value &&
      provider.value.id === _provider.id
    ) {
      return callback()
    }

    try {
      await _provider.init()
      await _provider.connect(callback)

      provider.value = _provider
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
