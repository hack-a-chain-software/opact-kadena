import { shallowRef } from 'vue'

/**
 * @private
 */
const step = shallowRef<string>('connect')

export const usePaymentForm = () => {
  return {
    step
  }
}
