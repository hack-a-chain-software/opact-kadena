<template>
  <LandingSection>
    <LandingContainer>
      <figure
        class="absolute inset-0 z-[0]"
      >
        <nuxt-img
          src="/touch-bg.png"
          class="
            w-full
            h-full
          "
          loading="lazy"
          alt="Hero illustration"
        />
      </figure>

      <div
        class="z-[2] relative"
      >
        <h2
          class="
            text-2xl-poppins
            font-title
            text-white
            mb-[8px]
          "
        >
          Get in Touch with Opact
        </h2>

        <p
          class="
            text-base-xs
            text-[#BDBDBD]
            mb-[32px]
          "
        >
          Reach out to us for Support, Partnerships, or Investment Opportunities
        </p>

        <LandingButton
          variant="secondary"
        >
          Send a Message
        </LandingButton>
      </div>
    </LandingContainer>
  </LandingSection>
</template>
