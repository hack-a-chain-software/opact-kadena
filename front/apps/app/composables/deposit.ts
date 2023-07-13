import { shallowRef } from 'vue'

export interface Form {
  foo: string;
  step?: string;
}

const baseForm = {
  foo: 'chain'
}

/**
 * @private
 */
const form = shallowRef<Form>({ ...baseForm })

const step = shallowRef<string>('chain')

export const useForm = () => {
  const setForm = (_form: Partial<Form>) => {
    form.value = {
      ...form.value,
      ..._form
    }
  }

  const setStep = (_step: string) => {
    step.value = _step
  }

  return {
    form,
    step,
    setForm,
    setStep
  }
}
