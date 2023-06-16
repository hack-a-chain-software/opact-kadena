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

      <div class="z-[2] relative md:pt-[12px]">
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
          "
        >
          Reach out to us for Support, Partnerships, or
          Investment Opportunities
        </p>

        <LandingButton
          variant="secondary"
          class="md:h-[51px]"
        >
          Send a Message
        </LandingButton>
      </div>
    </LandingContainer>
  </LandingSection>
</template>
