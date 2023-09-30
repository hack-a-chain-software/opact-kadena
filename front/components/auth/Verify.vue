<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useWalletStore } from '~/stores/wallet'

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

const wallet = useWalletStore()

const data = reactive({
  word: ''
})

const randomNumber = computed(() => {
  return Math.floor(
    Math.random() * (12 - 1 + 1) + 1
  ) as Number
})

const create = async () => {
  const isValid = props.mnemonic.split(' ')[Number(randomNumber.value) - 1] === data.word

  if (!isValid) {
    return
  }

  await wallet.found(props.mnemonic)

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
  <div
    class="text-white max-w-[450px]
      lg:h-auto
      lg:p-6
      lg:bg-gray-900
      lg:w-[546px]
      lg:border-2 lg:border-gray-600 lg:rounded-[12px]"
  >
    <div
      class="
        w-full
        py-4
        flex
        justify-center
        relative
        items-center
        lg:hidden
      "
    >
      <button
        class="
          flex
          items-center
          space-x-[4px]
          h-6
          absolute
          top-4
          left-0
        "
        @click.prevent="emits('changeStep', 'connect')"
      >
        <span class="text-blue-400 text-xxs font-medium">
          Restart
        </span>
      </button>

      <div>
        <h1 class="text-xs text-font-1 font-medium">
          Create Wallet
        </h1>
      </div>
    </div>

    <div class="pt-[32px] lg:pt-0">
      <div>
        <h2 class="text-md text-font-1 font-medium">
          Verify Phrase
        </h2>
      </div>

      <div class="pt-[16px] pb-[32px]">
        <p class="text-xs font-regular text-font-2">
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
        >
      </div>

      <div class="pt-[397px] lg:pt-[56px]">
        <button
          :disabled="!isDisabled"
          class="
            w-full
            flex
            items-center
            justify-center
            h-[44px]
            py-3
            px-4
            rounded-[12px]
            relative
            disabled:cursor-not-allowed
          "
          :class="
            !isDisabled ? 'bg-gray-700' : 'bg-blue-gradient'
          "
          @click.prevent="create()"
        >
          <span class="text-font-1"> Create Wallet </span>
        </button>
      </div>
    </div>
  </div>
</template>
