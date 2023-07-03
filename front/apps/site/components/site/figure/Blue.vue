<template>
  <div
    class="
      z-[3]
      left-0
      w-full
      h-full
      absolute
      bottom-0
      pointer-events-none
    "
  >
    <figure
      class="
        opacity-0
        duration-700
        transition-all
        group-hover/container:opacity-100
      "
    >
      <nuxt-img
        src="/wallet/blue-hover.png"
        class="absolute inset-0 w-full h-full z-[-1]"
      />
    </figure>

    <figure class="h-[700px] w-full absolute bottom-0">
      <nuxt-img
        src="/wallet/blue.png"
        loading="lazy"
        class="w-full h-full"
        alt="Illustrative image"
        sizes="xxl:704px"
      />
    </figure>

    <figure
      class="
        absolute
        translate-x-[23px]
        bottom-[-70px]
        sm:translate-x-[108px] sm:bottom-[-100px]
        lg:translate-x-[46px] lg:bottom-[-40px]
        xl:translate-x-[70px] xl:bottom-[-70px]
        2xl:translate-x-[93px] 2xl:bottom-[-119px]
      "
    >
      <nuxt-img
        alt="Illustrative image"
        src="/wallet/figures/bring.png"
        sizes="sm:279px lg:490px xl:342px 2xl:468px"
      />
    </figure>
  </div>
</template>
