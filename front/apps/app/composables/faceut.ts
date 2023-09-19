import { shallowRef } from 'vue'

/**
 * @private
 */
const step = shallowRef<string>('connect')

export const useFaceutForm = () => {
  return {
    step
  }
}
