import { reactive } from 'vue'
import token from '~/components/deposit/Token.vue'
import amount from '~/components/deposit/Amount.vue'

const form = {
  token,
  amount,
}

export type FormType = 'token' | 'amount'

export const useDeposit = () => {
  const data = reactive<{ stepForm: FormType }>({
    stepForm: 'amount'
  })

  return {
    data,
    form
  }
}
