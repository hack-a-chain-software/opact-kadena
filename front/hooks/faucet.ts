import { reactive } from 'vue'
import pay from '~/components/faucet/Pay.vue'
import success from '~/components/Success.vue'
import provider from '~/components/Provider.vue'
import connect from '~/components/faucet/Connect.vue'

const form = {
  pay,
  connect,
  success,
  provider
}

export type FormType = 'connect' | 'pay' | 'provider' | 'success' | 'await'

export const useFaucet = () => {
  const data = reactive<{ stepForm: FormType }>({
    stepForm: 'connect'
  })

  return {
    data,
    form
  }
}
