<template>
  <LandingSection class="mb-[40px] md:mb-[60px]">
    <LandingContainer>
      <h3
        class="
          bg-opact-gradient bg-clip-text
          text-transparent
          w-max
          text-sm
          font-[500]
          uppercase
          mb-[10px]

          sm:font-[900]
          sm:text-[18px]
          sm:leading-[27px]
          sm:mb-[18px]
        "
      >
        Documentation
      </h3>

      <h2
        class="
          text-2xl-poppins
          font-title
          text-white
          mb-[8px]

          sm:text-[32px]
          sm:leading-[40px]

          md:font-[600]
          md:text-[40px]
          md:leading-[60px]
        "
      >
        Refer to our docs to understand how it all works:
      </h2>

      <p
        class="
          text-lg-xs text-[#BDBDBD] mb-[30px]

          sm:font-[500]
          sm:text-[20px]
          sm:leading-[30px]
          sm:mb-[41px]
        "
      >
        Explore the inner workings of Opact.
      </p>

      <LandingButton
        :with-icon="true"
        variant="secondary"
        class=""
      >
        <span> Opact Documentation </span>

        <LandingAssetsArrow />
      </LandingButton>
    </LandingContainer>
  </LandingSection>
</template>
