import pay from './Pay.vue'
import success from './Success.vue'
import connect from './Connect.vue'
import provider from './Provider.vue'

export const form = {
  pay,
  connect,
  success,
  provider
}

export type FormType = 'pay' | 'connect' | 'success'
