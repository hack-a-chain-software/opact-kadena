<template>
  <LandingSection>
    <LandingContainer>
      <figure
        class="
          absolute
          left-[-4px]
          top-[-4px]
          right-[-4px]
          bottom-[-4px]
          z-[0]
          rounded-[12px]
        "
      >
        <nuxt-img
          src="/touch-bg.png"
          class="w-full h-full"
          loading="lazy"
          alt="Hero illustration"
        />
      </figure>

      <div class="z-[2] relative md:pt-[12px] lg:pt-[0px] xl:pt-[4px] lg:flex justify-between">
        <div>
          <h2
            class="
              text-2xl-poppins
              font-title
              text-white
              mb-[8px]
              sm:text-[32px] sm:leading-[40px]
              md:text-[38px]
              md:font-[600]
              md:leading-[57px]
              md:mb-[12px]

              lg:mb-[7px]
              lg:text-[32px]
              lg:font-[600]
              lg:leading-[57px]

              xl:mb-[18px]
              xl:text-[42px]
              xl:font-[600]
              xl:leading-[57px]
            "
          >
            Get in Touch with Opact
          </h2>

          <p
            class="
              text-base-xs text-[#BDBDBD]
              mb-[32px]
              sm:font-[500]
              sm:text-[20px]
              sm:leading-[30px]
              sm:max-w-[600px]
              sm:mb-[43px]

              lg:max-w-full
              lg:mb-0

              lg:text-[16px] lg:font-[500] lg:leading-[25px]
              xl:text-[20px] xl:font-[500] xl:leading-[30px]
            "
          >
            Reach out to us for Support, Partnerships, or
            Investment Opportunities.
          </p>
        </div>

        <LandingButton
          variant="hero-secondary"
          text="Send a Message"
        />
      </div>
    </LandingContainer>
  </LandingSection>
</template>
