import token from './Token.vue'
import amount from './Amount.vue'

export const form = {
  token,
  amount
}

export type FormType = 'chain' | 'token' | 'amount'
