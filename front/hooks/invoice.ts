import { reactive, computed } from 'vue'
import pay from '~/components/invoice/Pay.vue'
import success from '~/components/Success.vue'
import provider from '~/components/Provider.vue'
import connect from '~/components/invoice/Connect.vue'

const form = {
  pay,
  connect,
  success,
  provider
}

export type FormType = 'create' | 'connect' | 'recovery' | 'mnemonic' | 'verify'

export const RPC =
  process.env.NODE_ENV !== 'development'
    ? 'https://bpsd19dro1.execute-api.us-east-2.amazonaws.com/getdata'
    : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:5000/getdata'

export const useReceiver = () => {
  const data = reactive<any>({
    amount: '',
    error: '',
    address: '',
    balance: 0,
    loading: false,
    provider: null,
    commitments: null,
    depositing: false,
    showConnect: false,
    depositMessage: 'Loading Metadata',
    showCollapsible: false,
    token: {
      id: 1,
      icon: '/kda.png',
      name: 'Kadena',
      symbol: 'KDA'
    }
  })

  const route = useRoute()

  const params = computed<any>(() => {
    const [
      tokenId = '',
      amount = '',
      pubkey = ''
    ] = window.atob(route.params.params).split('-') || []


    return {
      tokenId,
      amount,
      pubkey
    }
  })

  const pubkey = computed(() => data.address || params.value.pubkey)

  const amount = computed(() => data.amount || params.value.amount)

  const tokenId = computed(() => 1 || params.value.tokenId)

  const buttonIsDisabled = computed(() => !pubkey.value || !amount.value)

  return {
    data,
    pubkey,
    amount,
    params,
    tokenId,
    buttonIsDisabled
  }
}

export const useReceiverForm = () => {
  const data = reactive<{ stepForm: FormType }>({
    stepForm: 'connect'
  })

  return {
    data,
    form
  }
}
