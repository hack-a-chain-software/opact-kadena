import { computed } from 'vue'
import { getWalletFromMnemonic } from 'opact-sdk'
import { useStateStorage } from '~/hooks/state-starage'

const useOpactWalletAccount = () =>
  useState<any>('opact:wallet:account', () => null)

export const useOpactWallet = () => {
  const account = useOpactWalletAccount()

  const router = useRouter()

  // Storage
  const { clear: clearStateStorage } = useStateStorage()
  const {
    cache,
    store,
    clear: clearWalletStorage
  } = useAuthStorage()

  const persistAuth = (mnemonic: any) => {
    const newCache = {
      phrase: mnemonic
    }

    store(newCache)
  }

  const connected = computed(() => !!account.value)

  const connect = (mnemonic: string) => {
    if (!mnemonic) {
      throw new Error('Needs mnemonic to connect')
    }

    const newAccount = getWalletFromMnemonic(mnemonic)

    persistAuth(mnemonic)

    account.value = newAccount
  }

  if (cache.value && !account.value) {
    connect(cache.value.phrase)
  }

  const logout = async () => {
    await clearStateStorage()
    await clearWalletStorage(['phrase'])

    account.value = null

    router.push({
      path: '/auth'
    })
  }

  return {
    account,
    connected,

    // methods
    logout,
    connect,
    persistAuth
  }
}
