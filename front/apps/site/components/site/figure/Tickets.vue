<template>
  <div
    class="
      z-[0]
      -mt-12
      mb-[68px]
      sm:mb-2.5
      ml-[-32px]
      sm:ml-0
      translate-x-[16px]
      sm:translate-x-0 sm:w-[704px]
      lg:absolute lg:top-0 lg:right-0 lg:w-auto
      xl:bottom-0 xl:left-0
      pointer-events-none
      select-none
    "
  >
    <figure class="h-[238px] sm:h-[482px]">
      <nuxt-img
        quality="100"
        src="/tickets/purple-inverted.png"
        loading="lazy"
        class="w-full h-full"
        alt="Illustrative image"
        sizes="xs:328px lg:704px"
      />
    </figure>

    <figure
      class="
        absolute
        rotate-[20deg]
        lg:rotate-[-5deg]
        xl:rotate-0
        top-[-12.5rem]
        sm:top-[-18rem]
        md:top-[-20rem]
        translate-x-[-2rem]
        sm:translate-x-[-5rem]
        lg:translate-x-[18rem]
        xl:translate-x-[25rem]
        2xl:translate-x-[33rem]
      "
    >
      <nuxt-img
        quality="100"
        src="/tickets/hero.webp"
        class="relative min-w-[800px] sm:min-w-[1200px]"
        sizes="639:800px 2560:1200px"
        alt="Illustrative image"
      />
    </figure>
  </div>
</template>
