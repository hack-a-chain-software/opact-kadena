<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useOpactWallet } from '~/hooks/opact-wallet'

const emits = defineEmits(['changeStep'])

const props = withDefaults(
  defineProps<{
    mnemonic?: string;
  }>(),
  {
    mnemonic: ''
  }
)

const router = useRouter()
const route = useRoute()

const { connect } = useOpactWallet()

const data = reactive({
  word: ''
})

const randomNumber = computed(() => {
  return Math.floor(
    Math.random() * (12 - 1 + 1) + 1
  ) as Number
})

const create = () => {
  const isValid =
    props.mnemonic.split(' ')[
      Number(randomNumber.value) - 1
    ] === data.word

  if (!isValid) {
    return
  }

  connect(props.mnemonic)

  router.push((route.query as any).next || '/home')
}

const isDisabled = computed(() => {
  return (
    props.mnemonic.split(' ')[
      Number(randomNumber.value) - 1
    ] === data.word
  )
})
</script>

<template>
  <FormLayout>
    <FormHeader
      title="Create Wallet"
      subtitle="Verify Phrase"
      @changeStep="emits('changeStep', 'mnemonic')"
    />

    <div class="pt-4">
      <div class="pb-6">
        <p class="text-xs font-regular text-font-2 lg:">
          Enter the following word from your recovery phrase
          to complete the setup process.
        </p>
      </div>

      <div>
        <div class="pb-[8px] text-xxs font-medium">
          Word <strong v-text="randomNumber" />
        </div>

        <input
          v-model="data.word"
          :class="isDisabled && 'border-blue-400'"
          placeholder="Enter the corresponding word"
          class="
            text-xxs text-font-2
            font-medium
            placeholder:opacity-[0.9]
            h-[52px]
            w-full
            p-4
            bg-transparent
            border-[1.5px] border-gray-700
            rounded-[8px]
            outline-none
          "
        />
      </div>
    </div>

    <FormFooter
      :disabled="!isDisabled"
      @click.prevent="create()"
      label="Verify & Create Wallet"
    />
  </FormLayout>
</template>
