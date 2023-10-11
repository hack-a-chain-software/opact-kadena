import { reactive } from 'vue'
import token from '~/components/TokenForm.vue'
import deposit from '~/components/Deposit/Token.vue'

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
