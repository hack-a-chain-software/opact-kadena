import { reactive } from 'vue'
import { form, FormType } from '~/components/deposit/form'

export const useDeposit = () => {
  const data = reactive<{ stepForm: FormType }>({
    stepForm: 'amount'
  })

  return {
    data,
    form
  }
}
