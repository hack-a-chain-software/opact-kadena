<script setup>
const emits = defineEmits(['changeStep'])
</script>

<template>
  <div
    class="
      w-full
      flex flex-col
      lg:flex-row lg:items-start
      bg-dark-blue
      max-w-[640px]
      mx-auto
      pt-[56px]
      pb-[32px]
      lg:pt-[0] lg:px-0 lg:max-w-full lg:overflow-x-clip
      h-full
      lg:grid
      lg:grid-cols-[minmax(auto,820px)_424px]
      lg:w-full
      lg:justify-center
    "
  >
    <div
      class="
        lg:hidden
        flex
        items-center
        justify-center
        h-[42px]
      "
    >
      <Logo class="flex justify-center mb-5" />
    </div>

    <div class="lg:hidden">
      <figure class="flex justify-center items-center">
        <img
          src="/images/auth/hero.webp"
          alt="Hero illustration"
          quality="100"
          class="min-w-[608px] max-w-[608px]"
        />
      </figure>
    </div>

    <div
      class="
        relative
        hidden
        lg:flex
        overflow-visible
        w-full
        relative
      "
    >
      <figure
        class="
          absolute
          left-0
          top-0
          left-1/2
          -translate-x-1/2
          select-none
          pointer-events-none
          z-[0]
        "
      >
        <img
          src="/images/auth/hero.webp"
          alt="Hero illustration"
          quality="100"
          class="
            min-w-[1057px]
            lg:max-w-[130%]
            xl:max-w-[1057px]
            pointer-events-none
          "
        />
      </figure>
    </div>

    <div
      class="
        flex-col
        lg:mr-[0%] lg:w-full lg:flex lg:items-center
        relative
        z-[1]
        lg:mt-[min(50%,calc((100vh-350px)/2))] lg:p-[32px]
      "
    >
      <div class="lg:max-w-[360px]">
        <div
          class="flex flex-col space-y-[16px] max-w-[400px]"
        >
          <h2
            class="
              text-lg
              font-medium
              text-font-1
              lg:text-xl lg:font-[500]
            "
          >
            Your private account on the Kadena Blockchain
          </h2>

          <p
            class="
              text-xs text-font-2
              font-regular
              lg:font-xs lg:font-[400] lg:leading-[140%]
            "
          >
            With Opact Wallet you can store your funds and
            perform transactions with privacy and security.
            Start now!
          </p>
        </div>

        <div class="flex flex-col space-y-[16px] pt-[32px]">
          <UIButtonInline
            class="h-[44px]"
            label="Create Wallet"
            @click.prevent="emits('changeStep', 'create')"
          />

          <UIButtonOutline
            class="h-[44px]"
            label="Recover Wallet"
            @click.prevent="emits('changeStep', 'recovery')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
