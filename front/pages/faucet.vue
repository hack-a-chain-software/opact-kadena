<script setup lang="ts">
import { useFaucet } from '~/hooks/faucet'

definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'Faucet'
})

const {
  data,
  form
} = useFaucet()

const handle = (step: any) => {
  if (step === 'pay' && data.token === 'token') {
    data.stepForm = step

    return
  } else if (step === 'pay' && data.token === 'nft') {
    data.stepForm = 'faucetNft'

    return
  }

  data.stepForm = step
}
</script>

<template>
  <div class="text-white pt-[46px] lg:pt-[112px] lg:flex lg:justify-center">
    <div
      class="
        py-6
        px-4
        flex-col flex
        items-center
        justify-center
        gap-6
        rounded-[12px]
        bg-gray-800
        lg:bg-transparent
      "
    >
      <div
        class="lg:hidden"
      >
        <Icon name="logo" class="h-[37px] w-[188px]" />
      </div>

      <div
        class="
          w-full
          lg:p-6
          lg:bg-gray-900
          lg:w-[546px]
          lg:border-2 lg:border-gray-600 lg:rounded-[12px]
        "
      >
        <Transition name="fade" mode="out-in">
          <component
            :is="form[data.stepForm]"
            :token="data.token"
            @token="($event: any) => data.token = $event"
            @changeStep="handle"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
