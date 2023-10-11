<script setup lang="ts">
import { reactive, watch } from 'vue'
import { debounce  } from '~/utils/debounce'

const props = withDefaults(
  defineProps<{
    token: any;
    modelValue: string
  }>(),
  {
    //
  }
)
const emits = defineEmits(['update:modelValue'])

const data = reactive({
  error: '',
  warning: '',
})

const verifyAddress = debounce(async (token: any, address: any) => {
  data.error = ''

  const prefix = props.token.name === 'Kadena' ? 'coin' : 'test.opact-coin'

  try {
    const details = await getTokenDetails(address, prefix)
  } catch (e) {
    console.warn(e)
    data.error = e.message
  }
}, 1000)

watch(() => [props.token, props.modelValue], (values: any) => {
  const [
    token,
    address
  ] = values

  if (!token || !address) {
    data.error = ''

    return
  }

  verifyAddress(token, address)
})
</script>

<template>
  <div class="pt-4">
    <div class="flex justify-between pb-2">
      <span class="text-xxs font-medium text-font-1">
        Send to
      </span>
    </div>

    <div class="relative">
      <input
        :value="props.modelValue"
        @input="emits('update:modelValue', ($event?.target as any)?.value)"
        placeholder="Address..."
        class="
          p-4
          flex
          w-full
          rounded-[8px]
          justify-between
          bg-gray-800
          text-font-1
          outline-none
        "
      >
    </div>

    <Warning
      class="mt-2"
      type="error"
      v-if="data.error"
      v-model="data.error"
      label="Receiver address is not founded*"
    />
  </div>
</template>
