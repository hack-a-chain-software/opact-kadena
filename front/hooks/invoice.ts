import { reactive, computed } from 'vue'
import { tokens } from '~/utils/constants'
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

export const useInvoice = () => {
  const data = reactive<any>({
    amount: 0,
    error: '',
    address: '',
    show: false,
    balance: 0,
    loading: false,
    provider: null,
    commitments: null,
    depositing: false,
    showConnect: false,
    depositMessage: 'Syncing Metadata',
    showCollapsible: false,
    token: tokens[0],
    config: {
      masked: false,
      prefix: '',
      suffix: '',
      thousands: '',
      decimal: '.',
      precision: 1,
      disableNegative: false,
      min: 0,
      allowBlank: false,
      minimumNumberOfCharacters: 0,
      shouldRound: true,
      focusOnRight: false,
    }
  })

  const route = useRoute()

  const params = computed<any>(() => {
    const {
      token = '',
      amount = '',
      pubkey = ''
    } = route.query || {}

    return {
      amount,
      pubkey,
      tokenId: token
    }
  })

  const pubkey = computed(() => data.address || params.value.pubkey)

  const amount = computed(() => data.amount || params.value.amount)

  const tokenId = computed(() => params.value.tokenId || data.token)

  const token = computed(() => {
    return tokens.find(({ id }: any) => id === Number(tokenId.value)) || data.token
  })

  const buttonIsDisabled = computed(() => !pubkey.value || !amount.value || data.balance < Number(amount.value) || amount.value === '0.0')

  return {
    data,
    token,
    pubkey,
    amount,
    params,
    tokenId,
    buttonIsDisabled
  }
}

export const useInvoiceForm = () => {
  const data = reactive<{ stepForm: FormType }>({
    stepForm: 'connect'
  })

  return {
    data,
    form
  }
}
