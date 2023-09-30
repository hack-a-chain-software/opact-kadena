import { reactive } from 'vue'
import token from '~/components/TokenForm.vue'
import deposit from '~/components/DepositForm.vue'

const form = {
  token,
  deposit,
}

export type FormType = 'token' | 'deposit'

export const useDeposit = () => {
  const data = reactive<{ stepForm: FormType }>({
    stepForm: 'deposit'
  })

  return {
    data,
    form
  }
}
