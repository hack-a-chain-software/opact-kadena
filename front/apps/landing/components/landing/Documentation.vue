<template>
  <LandingSection class="mb-[40px] md:mb-[60px] lg:!px-0">
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
          lg:mb-[8px]
          lg:text-[18px]
          lg:leading-[33px]
          lg:font-[700]
          xl:font-[900]
          xl:text-[18px]
          xl:leading-[27px]
          xl:mb-[18px]
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
          sm:text-[32px] sm:leading-[40px]
          md:font-[600] md:text-[40px] md:leading-[60px]
          lg:font-[600]
          lg:text-[24px]
          lg:leading-[40px]
          lg:max-w-[350px]
          lg:mb-[4px]
          xl:font-[600]
          xl:text-[32px]
          xl:leading-[48px]
          xl:max-w-full
          xl:mb-[8px]
        "
      >
        Refer to our docs to understand how it all works:
      </h2>

      <p
        class="
          text-lg-xs text-[#BDBDBD]
          mb-[30px]
          sm:font-[500]
          sm:text-[20px]
          sm:leading-[30px]
          sm:mb-[41px]
          xl:mb-[56px]
          lg:text-[16px] lg:font-[500] lg:leading-[25px]
          xl:text-[20px] xl:font-[500] xl:leading-[30px]
        "
      >
        Explore the inner workings of Opact.
      </p>

      <LandingButton
        :with-icon="true"
        variant="secondary"
        text="Opact Documentation"
      />
    </LandingContainer>
  </LandingSection>
</template>
