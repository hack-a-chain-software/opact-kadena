import { reactive } from 'vue'
import verify from '~/components/Auth/Verify.vue'
import create from '~/components/Auth/Create.vue'
import connect from '~/components/Auth/Connect.vue'
import mnemonic from '~/components/Auth/Mnemonic.vue'
import recovery from '~/components/Auth/Recovery.vue'

const form = {
  verify,
  create,
  connect,
  mnemonic,
  recovery
}

export type FormType =
  | 'create'
  | 'connect'
  | 'recovery'
  | 'mnemonic'
  | 'verify';

interface UseAuthInterface {
  mnemonic: string;
  stepForm: FormType;
}

export const useAuthForm = () => {
  const data = reactive<UseAuthInterface>({
    mnemonic: '',
    stepForm: 'connect'
  })

  return {
    data,
    form
  }
}
