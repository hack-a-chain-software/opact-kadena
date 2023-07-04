<template>
  <Section
    id="contact"
    class="py-[40px] md:py-[60px] lg:py-[80px]"
  >
    <div
      class="
        p-[2px]
        relative
        rounded-[12px]
        bg-card-gradient
        overflow-hidden
      "
    >
      <div
        class="
          relative
          px-[16px]
          pt-[24px]
          pb-[22px]
          rounded-[12px]
          overflow-hidden
          bg-inverted-card-gradient
          md:pb-[42px] md:px-10 md:pt-[48px]
          lg:pt-[52px] lg:pb-[56px] lg:px-10
        "
      >
        <figure
          class="
            absolute
            left-[-4px]
            top-[-4px]
            right-[-4px]
            bottom-[-4px]
            z-[0]
            rounded-[12px]
            pointer-events-none
            select-none
          "
        >
          <nuxt-img
            src="/touch-bg.webp"
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
                md:font-semibold
                md:leading-[57px]
                md:mb-3
                lg:mb-[18px]
                lg:text-[42px]
                lg:font-semibold
                lg:leading-[57px]
              "
            >
              Get in Touch with Opact
            </h2>

            <p
              class="
                text-base-xs text-[#BDBDBD]
                mb-8
                sm:font-medium
                sm:text-xl
                sm:leading-[30px]
                sm:max-w-[600px]
                sm:mb-[43px]
                xl:max-w-full
                lg:mb-0
                lg:max-w-[554px]
                lg:text-xl
                lg:font-medium
                lg:leading-[30px]
              "
            >
              Reach out to us for Support, Partnerships, or
              Investment Opportunities.
            </p>
          </div>

          <Button
            disabled
            variant="hero-secondary"
            text="Send a Message"
            class="lg:mt-[42px] xl:mt-0"
          />
        </div>
      </div>
    </div>
  </Section>
</template>
