import { shallowRef } from 'vue'

/**
 * @private
 */
const receiveStep = shallowRef<string>('create')

export const useReceiveForm = () => {
  return {
    receiveStep
  }
}
