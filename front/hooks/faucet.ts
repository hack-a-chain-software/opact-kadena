import { reactive } from 'vue'
import pay from '~/components/faucet/Pay.vue'
import success from '~/components/Success.vue'
import provider from '~/components/Provider.vue'
import connect from '~/components/faucet/Connect.vue'
import faucetNft from '~/components/faucet/Nft.vue'

const form = {
  pay,
  connect,
  success,
  provider,
  faucetNft
}

export type FormType =
  | 'connect'
  | 'pay'
  | 'provider'
  | 'success'
  | 'await';

export const useFaucet = () => {
  const data = reactive<{
    stepForm: FormType;
    token: string;
  }>({
    token: 'token',
    stepForm: 'connect'
  })

  return {
    data,
    form
  }
}
