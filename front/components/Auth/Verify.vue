<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useWalletStore } from '~/stores/wallet'

const wallet = useWalletStore()

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

  console.log('isValid', isValid)
  console.log('props.mnemnonic', props.mnemonic)

  if (!isValid) {
    return
  }

  console.log('1')

  wallet.connect(props.mnemonic)

  console.log('2')

  console.log('route.query', route.query)
  console.log('route.query.next', route.query.next)

  router.push((route.query as any).next || '/home')

  console.log('3')
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
  <UIFormLayout>
    <UIFormHeader
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

    <UIFormFooter
      :disabled="!isDisabled"
      @click.prevent="create()"
      label="Verify & Create Wallet"
    />
  </UIFormLayout>
</template>
