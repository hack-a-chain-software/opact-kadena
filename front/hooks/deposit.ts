import { reactive } from 'vue'
import token from '~/components/TokenForm.vue'
import deposit from '~/components/DepositForm.vue'
import { computeDepositParams } from '~/utils/sdk'

const form = {
  token,
  deposit
}

export type FormType = 'token' | 'deposit'

export const useDepositForm = () => {
  const data = reactive<{ stepForm: FormType }>({
    stepForm: 'deposit'
  })

  return {
    data,
    form
  }
}

export const useDeposit = () => {
  const data = reactive({
    error: '',
    amount: 0,
    balance: 0,
    provider: null,
    loading: false,
    depositing: false,
    showConnect: false,
    showCollapsible: false,
    depositMessage: 'Generating ZK Proof...',
    token: {
      icon: '/kda.png',
      name: 'Kadena',
      symbol: 'KDA'
    }
  })

  const checkFunds = async () => {
    data.showConnect = false

    if (!provider.value) {
      return
    }

    data.loading = true

    const {
      result: {
        status,
        data: coinData
      }
    } = await provider.value.coinDetails()

    data.loading = false

    if (status === 'failure') {
      return
    }

    data.balance = coinData.balance
  }

  const deposit = async (wallet) => {
    data.error = ''
    data.depositing = true

    try {
      const transactionArgs = await computeDepositParams(
        node.value,
        Number(data.amount),
        state.value.commitments,
        provider.value.account.account.publicKey
      )

      data.depositMessage = 'Await sign...'

      const tx = await provider.value.transaction(transactionArgs)

      data.depositMessage = 'Awaiting TX results...'

      const {
        result
      } = await Pact.fetch.listen(
        { listen: tx.requestKeys[0] },
        RPC
      )

      if (result.status === 'failure') {
        data.error = result.error.message

        return
      }

      router.push('/home')
      logout()
    } catch (e) {
      logout()
      console.warn(e)
      data.depositing = false
      data.depositMessage = "Computing UTXO's Values..."
    }
  }

  return {
    data,
    deposit,
    checkFunds,
  }
}
