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

      <div
        class="
          z-[2]
          relative
          md:pt-[12px]
          lg:pt-[8px]
          xl:pt-[4px]
          lg:flex
          justify-between
        "
      >
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
              lg:mb-[18px]
              lg:text-[42px]
              lg:font-[600]
              lg:leading-[57px]
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
              xl:max-w-full
              lg:mb-0
              lg:max-w-[554px]
              lg:text-[20px] lg:font-[500] lg:leading-[30px]
            "
          >
            Reach out to us for Support, Partnerships, or
            Investment Opportunities.
          </p>
        </div>

        <LandingButton
          variant="hero-secondary"
          text="Send a Message"
          class="lg:mt-[42px] xl:mt-0"
        />
      </div>
    </LandingContainer>
  </LandingSection>
</template>
