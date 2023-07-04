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
      pointer-events-none select-none
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
        class="absolute h-full w-full z-[-1]"
      />
    </figure>

    <figure class="h-[700px] w-full absolute bottom-0">
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
        sm:translate-x-[50px] sm:bottom-[-96px]
        md:translate-x-[110px] md:bottom-[-96px]
        lg:translate-x-[48px] lg:bottom-[-63px]
        xl:translate-x-[70px] xl:bottom-[-65px]
        2xl:translate-x-[85px] 2xl:bottom-[-94px]
      "
    >
      <nuxt-img
        sizes="639:302px 1023:500px 1279:350px 1439:430px 2560:468px"
        src="/wallet/figures/integrate.png"
        alt="Illustrative image"
        class="2xl:w-[468px]"
      />
    </figure>
  </div>
</template>
