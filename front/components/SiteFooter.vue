<template>
  <div class="relative pt-[250px]">
    <div
      class="
        opact-footer
        flex flex-col
        items-center
        justify-center
        space-y-[12px]
        pb-4
        pt-[50px]
        relative
        z-[2]
        bg-dark-blue
      "
    >
      <Icon
        name="opactLogo"
        class="h-8 w-[100px] md:h-[50px] md:w-[155.72px]"
      />

      <p
        class="
          text-xs-poppins
          font-normal
          text-white
          sm:font-normal sm:leading-[24px] sm:text-base
          lg:text-[13px]
          xl:text-base
        "
      >
        © 2023 Opact. All rights reserved.
      </p>
    </div>

    <div class="absolute bottom-0 z-[1] left-0 right-0">
      <figure>
        <NuxtImg
          width="1440px"
          src="/footer-bg.png"
          class="h-[400px] w-full"
        />
      </figure>
    </div>
  </div>

  <div class="w-full h-[2px] bg-opact-gradient" />
</template>
