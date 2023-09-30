import { reactive } from 'vue'
import success from '~/components/Success.vue'
import transfer from '~/components/TransferForm.vue'

const form = {
  transfer,
  success,
}

export type FormType = 'transfer' | 'success'

export const useTransfer = () => {
  const data = reactive<{ stepForm: FormType }>({
    stepForm: 'transfer'
  })

  return {
    data,
    form
  }
}
