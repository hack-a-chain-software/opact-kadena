import { reactive } from 'vue'
import verify from '~/components/auth/Verify.vue'
import create from '~/components/auth/Create.vue'
import connect from '~/components/auth/Connect.vue'
import mnemonic from '~/components/auth/Mnemonic.vue'
import recovery from '~/components/auth/Recovery.vue'

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
