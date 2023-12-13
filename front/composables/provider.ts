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

    console.log('_provider.isConnected', _provider.isConnected)

    if (_provider.isConnected) {
      await callback()

      provider.value = _provider

      return
    }

    try {
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
