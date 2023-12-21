<template>
  <UISection
    id="security"
    class="
      pt-[60px]
      lg:pt-[124px]
      xl:pt-[15px]
      2xl:pt-[40px]
      md:pt-[60px]
    "
  >
    <UIContainer
      cta="Check out the docs"
      to="https://docs.tickets.opact.io/"
      size="xl"
    >
      <template #before>
        <div
          class="
            z-[2]
            -mt-12
            mb-6
            ml-[-32px]
            translate-x-[16px]
            md:mb-0 md:ml-0 md:translate-x-0 md:w-[704px]
            lg:absolute lg:top-0 lg:right-0 lg:w-auto
            xl:absolute xl:top-0 xl:right-0 xl:w-auto
            pointer-events-none
            select-none
          "
        >
          <figure class="h-[238px] md:h-[482px]">
            <nuxt-img
              quality="100"
              src="/tickets/blur.png"
              loading="lazy"
              class="w-full h-full"
              alt="Illustrative image"
              sizes="xs:328px md:704px"
            />
          </figure>

          <figure
            class="
              absolute
              shrink-0
              top-[-8rem]
              left-[-4rem]
              sm:top-[-12rem] sm:left-[3rem]
              md:top-[-21rem] md:left-[-8rem]
              rotate-[60deg]
              lg:left-auto
              lg:rotate-[-235deg]
              lg:top-[-18rem]
              lg:right-[-10rem]
              xl:rotate-0 xl:top-[-10rem] xl:right-[-9rem]
              2xl:top-[-10rem] 2xl:right-[-40px]
            "
          >
            <nuxt-img
              quality="100"
              sizes="639:501px 767:600px 1024:1023px"
              src="/tickets/security.png"
              alt="Illustrative image"
              class="shrink-0 min-w-max"
            />
          </figure>
        </div>
      </template>

      <template #tag>
        <span class="block mb-3 sm:mb-6"> Security </span>
      </template>
      <template #title>
        <span
          class="
            text-[24px]
            font-[500]
            leading-[36px]
            tracking-[-0.72px]
            block
            mb-[6px]
            md:mb-6
            lg:w-[400px]
            xl:w-[656px]
            md:!text-[42px] md:!leading-[63px]
          "
        >
          Protect your transactions from the eyes of
          eavesdroppers and still be compliant
        </span>
      </template>

      <template #text>
        <span
          class="
            block
            mb-8
            leading-[30px]
            lg:w-[400px]
            xl:w-[650px]
            2xl:w-[656px]
            lg:mb-[46px]
          "
        >
          Opact Tickets breaks the link between deposit and
          withdrawal, making transactions difficult to
          trace, while still keeping compliance with AML
          rules in a decentralized manner.
        </span>
      </template>
    </UIContainer>
  </UISection>
</template>
