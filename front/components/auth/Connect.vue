<script setup>
import { reactive } from 'vue'

const data = reactive({
  show: false
})

const emits = defineEmits(['changeStep'])
</script>

<template>
  <div
    class="
      flex flex-col lg:flex-row lg:items-start pt-[56px] pb-[80px] lg:pt-[0] lg:px-0 lg:max-w-full lg:overflow-x-clip h-full
      lg:grid lg:grid-cols-[minmax(auto,820px)_424px] lg:w-full lg:justify-center
    "
  >
    <div class="lg:hidden flex items-center justify-center h-[42px]">
      <Logo class="flex justify-center mb-5" />
    </div>

    <div
      class="lg:hidden"
    >
      <figure class="">
        <img
          src="/auth-bg.png"
          alt="Hero illustration"
          quality="100"
          class="w-full 2xl: max-w-[1057px]"
          sizes=""
        >
      </figure>
    </div>

    <div
      class="relative hidden lg:block"
    >
      <figure class="
        absolute
        left-0 top-0
        lg:left-[-10%]
        select-none pointer-events-none z-[0]"
      >
        <img
          src="/auth-bg.png"
          alt="Hero illustration"
          quality="100"
          class="min-w-[665px] lg:max-w-[130%] xl:max-w-[1057px] pointer-events-none"
          sizes=""
        >
      </figure>
    </div>

    <div
      class="flex-col lg:mr-[0%] lg:w-full lg:flex lg:items-center relative z-[1] lg:mt-[min(50%,calc((100vh-350px)/2))] lg:p-[32px]"
    >
      <div
        class="lg:max-w-[360px]"
      >
        <div class="flex flex-col space-y-[16px] max-w-[400px]">
          <h2 class="text-lg font-medium text-font-1 lg:text-xl lg:font-[600]">
            Your private address
          </h2>

          <p class="text-xs text-font-2 font-regular">
            Choose how you want to connect. Web3 like you never
            imagined.
          </p>
        </div>

        <div class="flex flex-col space-y-[16px] pt-[32px]">

          <ButtonInline
            label="Create Wallet"
            @click.prevent="data.show = true"
          />

          <ButtonOutline
            label="Recover Wallet"
            @click.prevent="emits('changeStep', 'recovery')"
          />
        </div>
      </div>
    </div>

    <AuthGetStartedModal
      :show="data.show"
      @close="data.show = false"
      @create="emits('changeStep', 'create')"
    />
  </div>
</template>
