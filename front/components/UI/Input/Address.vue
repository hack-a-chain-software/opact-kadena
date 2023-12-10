<script setup lang="ts">
import { validatePubkey, separateHex } from 'opact-sdk'
import { reactive, watch } from 'vue'
import { debounce } from '~/utils/debounce'

const props = withDefaults(
  defineProps<{
    token: any;
    label?: string;
    modelValue: string;
    readonly?: boolean;
  }>(),
  {
    readonly: false,
    label: 'Send to'
  }
)
const emits = defineEmits([
  'update:modelValue',
  'isValidAddress'
])

const data = reactive({
  warning: '',
  isValid: false,
  isLoading: false,
  isKAccount: false,
  isOZKAccount: false,
  isRegistered: false
})

const handleInput = (event: any) => {
  emits('update:modelValue', event.target.value)
}

const verifyAddress = debounce(async (_, address: any) => {
  data.isLoading = true

  const prefix =
    props.token.name === 'Kadena'
      ? 'coin'
      : 'test.opact-coin'

  if (address.startsWith('OZK')) {
    data.isOZKAccount = true

    try {
      const {
        babyjubPubkey
      } = separateHex(address)

      const isValidOpactAddress = validatePubkey(BigInt(babyjubPubkey))

      if (isValidOpactAddress) {
        data.isValid = true

        emits('isValidAddress', true)
      }
    } catch (e) {
      data.isRegistered = true

      console.warn(e)
    } finally {
      data.isLoading = false
    }

    return
  }

  try {
    await getTokenDetails(address, prefix)

    data.isValid = true

    emits('isValidAddress', true)
  } catch (e) {
    console.warn(e)

    if (address.startsWith('K:')) {
      data.isKAccount = true

      emits('isValidAddress', true)

      return
    }

    data.isRegistered = true
  } finally {
    data.isLoading = false
  }
}, 1000)

watch(
  () => [props.token, props.modelValue],
  (values: any) => {
    const [token, address] = values

    data.isValid = false
    data.isKAccount = false
    data.isOZKAccount = false
    data.isRegistered = false

    emits('isValidAddress', false)

    // TODO: validate if opact pubkey is in curve
    if (
      !token ||
      !address ||
      (address && address.length < 3)
    ) {
      return
    }

    verifyAddress(token, address)
  }, {
    immediate: true
  }
)
</script>

<template>
  <div>
    <div class="flex items-center gap-2 pb-4 relative z-[2]">
      <span
        class="text-xs font-medium text-font-1"
        v-text="props.label"
      />

      <UITooltip/>
    </div>

    <div
      v-if="data.isLoading"
      class="
        relative
        p-4
        w-full
        h-[58px]
        rounded-[8px]
        flex
        items-center
        justify-center
        bg-gray-800
        z-[1]
      "
    >
      <Icon
        name="spinner"
        class="animate-spin text-white ml-[12px]"
      />
    </div>

    <div v-else class="relative z-[1]">
      <input
        :readonly="readonly"
        :value="props.modelValue"
        @input="handleInput"
        placeholder="Address..."
        :class="data.isValid && '!border-blue-400'"
        class="
          p-4
          flex
          w-full
          rounded-[8px]
          border
          text-xs
          break-words
          border-transparent
          justify-between
          bg-gray-800
          text-font-1
          outline-none
        "
      />
    </div>

    <UIWarning
      class="mt-4"
      type="warning"
      v-show="data.isRegistered && !data.isOZKAccount"
      v-motion-slide-visible-top
      label="Receiver address is not registered"
      desc="Opact can register a Single-Key Account to proceed with your transfer."
    />

    <UIWarning
      class="mt-4"
      type="warning"
      v-show="data.isKAccount"
      v-motion-slide-visible-top
      label="Single-Key Account"
      desc="The address is not registered, but we will register this account for you."
    />

    <UIWarning
      class="mt-4"
      type="warning"
      v-motion-slide-visible-top
      label="Invalid Opact address"
      v-show="data.isRegistered && data.isOZKAccount"
      desc="The address sent is not valid. Please check the address and try again."
    />
  </div>
</template>
