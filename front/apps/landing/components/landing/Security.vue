<template>
  <LandingSection class="mb-[40px] md:mb-[60px] lg:mb-[65px] xl:mb-[80px]">
    <LandingContainer
      class="relative"
    >
      <div
        class="
          mt-[-48px]
          mb-[24px]
          ml-[-32px]
          translate-x-[16px]
          md:mb-0 md:ml-0 md:translate-x-0 md:w-[704px]

          lg:absolute
          lg:top-0
          lg:right-0
          lg:w-auto

          xl:absolute
          xl:top-0
          xl:right-0
          xl:w-auto
        "
      >
        <figure class="h-[238px] md:h-[482px]">
          <nuxt-img
            src="/security-blur.png"
            loading="lazy"
            class="w-full h-full"
            alt="Illustrative image of the marijuana plant"
            sizes="xs:328px md:704px"
          />
        </figure>

        <figure
          class="
            absolute
            top-[-70px]
            left-1/2
            translate-x-[-60%]
            rotate-[-21.72deg]
            min-w-[429px]
            w-full
            z-[2]
            sm:top-[-160px] sm:w-[580px]
            md:w-[950px]
            md:translate-x-0
            md:top-[-170px]
            md:left-[-100px]

            lg:rotate-0
            lg:top-[-105px]
            lg:left-[130px]
            lg:max-w-[740px]

            xl:rotate-0
            xl:top-[-140px]
            xl:left-[0px]
            xl:max-w-[891px]
          "
        >
          <nuxt-img
            src="/security.png"
            class="scale-x-[-1] lg:scale-x-[1]"
            sizes="xs:429px md:765px lg:700px xl:891px"
            alt="Illustrative image of the marijuana plant"
          />
        </figure>
      </div>

      <h3
        class="
          bg-opact-gradient bg-clip-text
          text-transparent
          w-max
          text-sm
          font-[500]
          uppercase
          mb-[12px]
          sm:font-[900]
          sm:text-[22px]
          sm:leading-[33px]
          sm:mb-[24px]

          lg:text-[18px]
          lg:leading-[33px]
          lg:font-[700]
          lg:mb-[12px]

          xl:font-[900]
          xl:text-[22px]
          xl:leading-[33px]
          xl:mb-[24px]
        "
      >
        Security
      </h3>

      <h2
        class="
          mb-[6px]
          font-title
          text-white
          font-[500]
          tracking-[-0.05rem]
          leading-[36px]
          text-[24px]
          sm:text-[32px] sm:leading-[40px]
          md:tracking-normal
          md:font-[600]
          md:text-[42px]
          md:leading-[63px]
          md:mb-[24px]

          lg:tracking-normal
          lg:font-[600]
          lg:text-[34px]
          lg:leading-[54px]
          lg:mb-[12px]

          xl:tracking-normal
          xl:font-[600]
          xl:text-[42px]
          xl:leading-[63px]
          xl:mb-[24px]

          lg:w-[493px]
          xl:w-[493px]
        "
      >
        Secure and Compliant <br>
        Privacy with
        <span
          class="
            sm:bg-opact-gradient
            sm:bg-clip-text
            sm:text-transparent
          "
        >Opact</span>
      </h2>

      <p
        class="
          text-[#BDBDBD]
          mb-[32px]
          leading-[24px]
          text-[16px]
          sm:text-[20px] sm:font-[500] sm:leading-[30px]

          lg:w-[380px]
          lg:mb-[37px]
          lg:text-[16px] lg:font-[500] lg:leading-[25px]

          xl:w-[493px]
          xl:mb-[46px]
          xl:text-[20px] xl:font-[500] xl:leading-[30px]
        "
      >
        Many privacy apps have been used by malicious actors
        for illicit financial activities, such as money
        laundering. Opact has been designed to block
        malicious actors while still keeping user’s privacy.
      </p>

      <LandingButton
        :with-icon="true"
        variant="secondary"
        text="Learn more"
      />
    </LandingContainer>
  </LandingSection>
</template>
