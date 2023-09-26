import chain from './Chain.vue'
import token from './Token.vue'
import amount from './Amount.vue'
import message from './Message.vue'
import awaiting from './Await.vue'
import success from './Success.vue'

export const form = {
  chain,
  awaiting,
  token,
  amount,
  message,
  success
}

export type FormType = 'chain' | 'awaiting' | 'token' | 'amount' | 'message' | 'success'
