import { reactive } from 'vue'
import deposit from '~/components/transfer/Deposit.vue'
import success from '~/components/transfer/Success.vue'
import progress from '~/components/transfer/Progress.vue'

const form = {
  deposit,
  success,
  progress,
}

export type FormType = 'token' | 'amount'

export const useTransfer = () => {
  const data = reactive<{ stepForm: FormType }>({
    stepForm: 'deposit'
  })

  return {
    data,
    form
  }
}
