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
      select-none
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
        quality="100"
        src="/wallet/blue-hover.webp"
        class="absolute inset-0 w-full h-full z-[-1]"
      />
    </figure>

    <figure class="h-[700px] w-full absolute bottom-0">
      <nuxt-img
        quality="100"
        src="/wallet/blue.webp"
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
        sm:translate-x-[50px] sm:bottom-[-100px]
        md:translate-x-[100px] md:bottom-[-100px]
        lg:translate-x-[46px] lg:bottom-[-50px]
        xl:translate-x-[65px] xl:bottom-[-89px]
        2xl:translate-x-[80px] 2xl:bottom-[-140px]
      "
    >
      <nuxt-img
        quality="100"
        alt="Illustrative image"
        src="/wallet/figures/bring.png"
        sizes="639:290px 1023:500px 1279:350px 1439:440px 2560:500px"
      />
    </figure>
  </div>
</template>
