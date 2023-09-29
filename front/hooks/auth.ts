import { reactive } from 'vue'
import { form, FormType } from '~/components/auth/form'

interface UseAuthInterface {
  mnemonic: string;
  stepForm: FormType;
}

export const useAuth = () => {
  const data = reactive<UseAuthInterface>({
    mnemonic: '',
    stepForm: 'connect'
  })

  return {
    data,
    form
  }
}
