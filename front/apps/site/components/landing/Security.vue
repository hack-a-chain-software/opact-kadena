<template>
  <Section
    id="security"
    class="pt-[40px] md:pt-[60px] lg:pt-[80px]"
  >
    <Container
      cta="Learn more"
      size="xl"
    >
      <template #before>
        <div
          class="
            z-[2]
            mt-[-48px]
            mb-[24px]
            ml-[-32px]
            translate-x-[16px]
            md:mb-0 md:ml-0 md:translate-x-0 md:w-[704px]
            lg:absolute lg:top-0 lg:right-0 lg:w-auto
            xl:absolute xl:top-0 xl:right-0 xl:w-auto
          "
        >
          <figure class="h-[238px] md:h-[482px]">
            <nuxt-img
              src="/security-blur.webp"
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
              sm:top-[-140px]
              sm:w-[600px]
              sm:rotate-[-10deg]
              sm:translate-x-[-55%]
              md:w-[765px]
              md:translate-x-0
              md:top-[-140px]
              md:left-[-120px]
              md:rotate-[-20deg]
              lg:rotate-[-26deg]
              lg:top-[-140px]
              lg:left-[130px]
              lg:min-w-[891px]
              xl:rotate-0
              xl:top-[-130px]
              xl:left-[-10px]
              xl:min-w-[891.5px]
              2xl:min-w-[1011px]
              2xl:top-[-200px]
              2xl:left-[-90px]
            "
          >
            <nuxt-img
              src="/security.webp"
              class="scale-x-[-1] lg:scale-x-[1]"
              sizes="xs:429px sm:600px md:765px lg:891.5px xl:891.5px 2xl:1011px"
              alt="Illustrative image of the marijuana plant"
            />
          </figure>
        </div>
      </template>

      <template #tag>
        <span
          class="block mb-[12px] sm:mb-[24px] lg:mb-[24px]"
        >
          Security
        </span>
      </template>

      <template #title>
        <span
          class="
            block
            mb-[6px]
            md:mb-[24px]
            lg:mb-[24px]
            xl:w-[493px]
          "
        >
          Secure and
          <br class="hidden lg:inline xl:hidden">
          Compliant <br class="lg:hidden xl:inline">
          Privacy <br class="hidden lg:inline xl:hidden">
          with
          <span
            class="
              sm:bg-opact-gradient
              sm:bg-clip-text
              sm:text-transparent
            "
          >Opact</span>
        </span>
      </template>

      <template #text>
        <span
          class="
            block
            mb-[32px]
            lg:w-[400px]
            xl:w-[493px]
            lg:mb-[46px]
          "
        >
          Many privacy apps have been used by malicious
          actors for illicit financial activities, such as
          money laundering. Opact has been designed to block
          malicious actors while still keeping user’s
          privacy.
        </span>
      </template>
    </Container>
  </Section>
</template>
