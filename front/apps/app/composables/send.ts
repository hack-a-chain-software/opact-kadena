import { shallowRef } from 'vue'

/**
 * @private
 */
const step = shallowRef<string>('deposit')

export const useSendForm = () => {
  return {
    step
  }
}
