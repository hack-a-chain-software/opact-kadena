import { reactive } from 'vue'
import pay from '~/components/faucet/Pay.vue'
// import await from '~/components/faucet/Await.vue'
import connect from '~/components/faucet/Connect.vue'
import success from '~/components/faucet/Success.vue'
import provider from '~/components/faucet/Provider.vue'

const form = {
  pay,
  // await,
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
