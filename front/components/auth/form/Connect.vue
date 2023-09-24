<script setup>
import { reactive } from 'vue'

const data = reactive({
  show: false
})

const emits = defineEmits(['changeStep'])
</script>

<template>
  <div class="flex flex-col lg:flex-row lg:items-start h-full pt-[56px] pb-[80px] lg:pt-[0] lg:mt-[-64px] lg:px-[60px]">
    <div class="lg:hidden flex items-center justify-center h-[42px]">
      <Logo class="flex justify-center mb-5" />
    </div>

    <div
      class="
        flex
        items-center
        justify-center
        w-full
        max-h-[410px]
        lg:max-h-full
        lg:z-[-1]
        lg:relative
        lg:h-[880px]
        lg:max-w-[60%]
        lg:overflow-y-clip
      "
    >
      <figure class="">
        <img
          src="/auth-bg.png"
          alt="Hero illustration"
          quality="100"
          class="min-w-[608px] h-[507px] lg:min-w-[1057px] lg:min-h-[880px] lg:h-[880px]"
          sizes="xs:861px xxl:1057px"
        >
      </figure>
    </div>

    <div
      class="flex-col lg:mt-[300px] lg:mr-[5%] lg:min-w-[424px]"
    >
      <div class="flex flex-col space-y-[16px] max-w-[400px]">
        <h2 class="text-lg font-medium text-font-1">
          Your private address
        </h2>

        <p class="text-xs text-font-2 font-regular">
          Choose how you want to connect. Web3 like you never
          imagined.
        </p>
      </div>

      <div class="flex flex-col space-y-[16px] pt-[32px]">
        <button
          class="
            flex
            items-center
            justify-center
            bg-blue-gradient
            h-[44px]
            py-3
            px-4
            rounded-[12px]
            relative
          "
          @click.prevent="data.show = true"
        >
          <span class="text-font-1"> Create Wallet </span>
        </button>

        <button
          class="
            flex
            items-center
            justify-center
            h-[44px]
            py-[11px]
            px-4
            rounded-[12px]
            text-font-1
            border border-font-1
          "
          @click.prevent="emits('changeStep', 'recovery')"
        >
          <span class="text-font-1"> Recover Wallet </span>
        </button>
      </div>
    </div>

    <AuthGetStartedModal
      :show="data.show"
      @close="data.show = false"
      @create="emits('changeStep', 'create')"
    />
  </div>
</template>
