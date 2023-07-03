<template>
  <div
    class="
      z-[3]
      sm:mb-0 sm:ml-0 sm:translate-x-0
      w-full
      h-full
      absolute
      bottom-0
      left-0
      pointer-events-none
    "
  >
    <figure
      class="
        opacity-0
        group-hover/container:opacity-100
        transition-all
        duration-700
      "
    >
      <nuxt-img
        src="/wallet/purple-hover.png"
        class="absolute inset-0 z-[-1]"
      />
    </figure>

    <figure
      class="h-[700px] w-full absolute bottom-0"
    >
      <nuxt-img
        src="/wallet/purple.png"
        loading="lazy"
        class="w-full h-full"
        alt="Illustrative image"
        sizes="xs:328px sm:704px"
      />
    </figure>

    <figure
      class="
        absolute
        translate-x-[20px]
        bottom-[-60px]
        sm:translate-x-[130px] sm:bottom-[-96px]
        lg:translate-x-[48px] lg:bottom-[-63px]
        xl:translate-x-[70px] xl:bottom-[-65px]
        2xl:translate-x-[93px] 2xl:bottom-[-90px]
      "
    >
      <nuxt-img
        sizes="md:290px lg:490px xl:342px xxl:416px xxxl:480px"
        src="/wallet/figures/integrate.png"
        alt="Illustrative image"
      />
    </figure>
  </div>
</template>
