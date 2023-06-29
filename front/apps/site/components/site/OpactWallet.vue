<template>
  <Section
    class="flex flex-col items-center justify-center"
  >
    <div class="pb-[16px]">
      <h3
        class="
          w-max
          uppercase
          pb-[12px]
          md:pb-0
          sm:leading-[33px]
          lg:leading-[33px]
          text-sm
          sm:text-[22px]
          lg:text-[22px]
          font-[500]
          sm:font-[900]
          lg:font-[700]
          text-transparent
          bg-opact-gradient bg-clip-text
        "
      >
        Our products
      </h3>
    </div>

    <div class="pb-[60px]">
      <h2
        class="
          text-[#FAFAFA]
          font-title
          text-[56px]
          font-[600]
          leading-[120%]
        "
      >
        Opact Wallet
      </h2>
    </div>

    <Container
      class="w-full mb-[80px]"
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
            xl:absolute
            xl:top-0
            xl:right-0
            xl:w-auto
            xl:bottom-0
            xl:left-0
          "
        >
          <figure class="h-[238px] md:h-[482px]">
            <nuxt-img
              src="/wallet-color-bg.png"
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
              2xl:min-w-[1189.79px]
              2xl:top-[-236px]
              2xl:left-[535px]
            "
          >
            <nuxt-img
              src="/wallet-container.png"
              class="scale-x-[-1] lg:scale-x-[1]"
              sizes="2xl:1189.79px"
              alt="Illustrative image of the marijuana plant"
            />
          </figure>
        </div>
      </template>

      <template #title>
        <span
          class="
            block
            mb-[6px]
            md:mb-[24px]
            lg:mb-[24px]
            xl:w-[493px]
            leading-[3.1rem]
          "
        >
          Decentralized Private Accounts
        </span>
      </template>

      <template #text>
        <span
          class="
            block
            mb-[32px]
            lg:w-[400px]
            xl:w-[493px]
            lg:mb-[48px]
          "
        >
          Perform anonymous transactions on the transparent
          blockchain ecosystem, all through smart contracts.
          The first private wallet with a decentralized &
          modular AML.
        </span>
      </template>
    </Container>

    <div class="flex space-x-[32px] w-full">
      <Container
        center
        class="w-full"
        cta="Learn more"
        size="xl"
      >
        <template #after>
          <div
            class="
              z-[3]
              mt-[-48px]
              mb-[24px]
              ml-[-32px]
              translate-x-[16px]
              md:mb-0 md:ml-0 md:translate-x-0
              w-full
              h-[374px]
              absolute
              bottom-0
              left-0
              pointer-events-none
            "
          >
            <figure
              class="h-[700px] w-full absolute bottom-0"
            >
              <nuxt-img
                src="/bg-left-blue.png"
                loading="lazy"
                class="w-full h-full"
                alt="Illustrative image of the marijuana plant"
                sizes="xs:328px md:704px"
              />
            </figure>

            <figure
              class="absolute translate-x-[110px] bottom-0"
            >
              <nuxt-img
                src="/puzzle-1.png"
                class="scale-x-[-1] lg:scale-x-[1]"
                sizes="2xl:468px"
                alt="Illustrative image of the marijuana plant"
              />
            </figure>
          </div>
        </template>

        <template #title>
          <span
            class="
              block
              mb-[6px]
              md:mb-[24px]
              lg:mb-[24px]
              xl:w-[493px]
              text-center
              z-[3]
              relative
              2xl:text-[34px]
              2xl:font-[600]
              2xl:leading-[150%]
              mx-auto
            "
          >
            Bring private and compliant accounts to your
            blockchain
          </span>
        </template>

        <template #text>
          <span
            class="
              block
              mb-[32px]
              lg:w-[400px]
              xl:w-[493px]
              lg:mb-[48px]
              2xl:mb-[21px]
              text-center
              z-[3]
              relative
              2xl:text-[18px]
              2xl:font-[500]
              2xl:leading-[150%]
              mx-auto
              2xl:w-[532px]
            "
          >
            Opact Wallet can be implemented into different
            blockchain ecosystems, and our team has the
            expertise to develop it in Solidity, Rust, Ink!,
            Pact, and other languages and frameworks. If you
            want private transactions on your blockchain,
            reach out to us!
          </span>
        </template>

        <template #cta>
          <Button
            withIcon
            variant="secondary"
            text="Read more"
            class="mb-[298px]"
          />
        </template>
      </Container>

      <Container
        center
        class="w-full"
        cta="Learn more"
        size="xl"
      >
        <template #after>
          <div
            class="
              z-[3]
              mt-[-48px]
              mb-[24px]
              ml-[-32px]
              translate-x-[16px]
              md:mb-0 md:ml-0 md:translate-x-0
              w-full
              h-[374px]
              absolute
              bottom-0
              left-0
              pointer-events-none
            "
          >
            <figure
              class="h-[700px] w-full absolute bottom-0"
            >
              <nuxt-img
                src="/bg-left-blue.png"
                loading="lazy"
                class="w-full h-full"
                alt="Illustrative image of the marijuana plant"
                sizes="xs:328px md:704px"
              />
            </figure>

            <figure
              class="absolute translate-x-[110px] bottom-0"
            >
              <nuxt-img
                src="/puzzle-1.png"
                class="scale-x-[-1] lg:scale-x-[1]"
                sizes="2xl:468px"
                alt="Illustrative image of the marijuana plant"
              />
            </figure>
          </div>
        </template>

        <template #title>
          <span
            class="
              block
              mb-[6px]
              md:mb-[24px]
              lg:mb-[24px]
              xl:w-[493px]
              text-center
              z-[3]
              relative
              2xl:text-[34px]
              2xl:font-[600]
              2xl:leading-[150%]
              mx-auto
              2xl:w-full
            "
          >
            Integrate private and compliant accounts to your
            application
          </span>
        </template>

        <template #text>
          <span
            class="
              block
              mb-[32px]
              lg:w-[400px]
              xl:w-[493px]
              lg:mb-[48px]
              2xl:mb-[38px]
              text-center
              z-[3]
              relative
              2xl:text-[18px]
              2xl:font-[500]
              2xl:leading-[150%]
              mx-auto
              2xl:w-[532px]
            "
          >
            Allow the users to perform anonymous
            transactions on your dApp by integrating Opact
            Wallet, e.g., perform trades on a DEX in a
            private manner.
          </span>
        </template>

        <template #cta>
          <Button
            withIcon
            variant="secondary"
            text="Read more"
            class="mb-[310px]"
          />
        </template>
      </Container>
    </div>
  </Section>
</template>
