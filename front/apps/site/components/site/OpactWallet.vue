<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <Section
    class="
      pt-[55px]
      xl:pt-0
      flex flex-col
      items-center
      justify-center
    "
  >
    <div class="pb-1 xl:pb-[16px]">
      <h3
        class="
          w-max
          uppercase
          pb-[12px]
          xl:pb-[3px]
          2xl:pb-0
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
              src="/wallet/blue-inverted.png"
              loading="lazy"
              class="w-full h-full"
              alt="Illustrative image"
              sizes="xs:328px md:704px"
            />
          </figure>

          <figure
            class="
              absolute
              z-[2]
              w-full
              rotate-[28deg]
              lg:max-w-[800px]
              lg:top-[-20px]
              lg:left-[330px]
              xl:rotate-[17deg]
              xl:max-w-[960px]
              xl:top-[-146px]
              xl:left-[430px]
              2xl:rotate-0
              2xl:max-w-[1189.79px]
              2xl:top-[-240px]
              2xl:left-[490px]
            "
          >
            <nuxt-img
              src="/wallet/figures/connections.png"
              class="scale-x-[-1] lg:scale-x-[1]"
              sizes="2xl:1189.79px"
              alt="Illustrative image"
            />
          </figure>
        </div>
      </template>

      <template #title>
        <div
          class="
            mb-[6px]
            md:mb-[24px]
            lg:mb-[8px]
            xl:w-[493px]
            relative
          "
        >
          <div class="flex space-x-[16px] mb-[24px]">
            <Badge
              v-for="({ name, icon }, i) in config.chains"
              :delay="150 * (i + 1)"
              :key="`opact-wallet:chain:${name}`"
              v-motion
              :initial="{ opacity: 0, x: -15 }"
              :visibleOnce="{ opacity: 1, x: 0 }"
              class="!h-[36px]"
            >
              <div class="flex items-center space-x-[6px]">
                <Icon :name="icon" />

                <span>
                  {{ name }}
                </span>
              </div>
            </Badge>
          </div>

          <div class="lg:max-w-[399px] xl:max-w-full">
            <span> Decentralized Private Accounts </span>
          </div>
        </div>
      </template>

      <template #text>
        <span
          class="
            block
            mb-[32px]
            lg:w-[400px]
            xl:w-[493px]
            lg:mb-[40px]
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
                src="/wallet/blue.png"
                loading="lazy"
                class="w-full h-full"
                alt="Illustrative image"
                sizes="xs:328px md:704px"
              />
            </figure>

            <figure
              class="
                absolute
                lg:translate-x-[46px] lg:bottom-[-40px]
                xl:translate-x-[70px] xl:bottom-[-70px]
                2xl:translate-x-[93px] 2xl:bottom-[-119px]
              "
            >
              <NuxtImg
                alt="Illustrative image"
                src="/wallet/figures/bring.png"
                sizes="xl:342px 2xl:416px xxl:480px"
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
              lg:mb-[16px]
              xl:w-[493px]
              text-center
              z-[3]
              relative
              lg:text-[32px] lg:font-[600] lg:leading-[150%]
              xl:text-[32px] xl:font-[600] xl:leading-[150%]
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
              lg:mb-[21px]
              text-center
              z-[3]
              relative
              lg:text-[18px] lg:font-[500] lg:leading-[150%]
              xl:text-[18px] xl:font-[500] xl:leading-[150%]
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
            with-icon
            variant="secondary"
            text="Read more"
            class="
              lg:mb-[230px]
              xl:mb-[281px]
              2xl:mb-[302px]
            "
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
                src="/wallet/blue.png"
                loading="lazy"
                class="w-full h-full"
                alt="Illustrative image"
                sizes="xs:328px md:704px"
              />
            </figure>

            <figure
              class="
                absolute
                lg:translate-x-[48px] lg:bottom-[-63px]
                xl:translate-x-[70px] xl:bottom-[-65px]
                2xl:translate-x-[93px] 2xl:bottom-[-90px]
              "
            >
              <nuxt-img
                sizes="xl:342px 2xl:416px xxl:480px"
                src="/wallet/figures/integrate.png"
                alt="Illustrative image"
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
              lg:mb-[16px]
              xl:w-[493px]
              text-center
              z-[3]
              relative
              lg:text-[29px] lg:font-[600] lg:leading-[150%]
              xl:text-[29px] xl:font-[600] xl:leading-[150%]
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
              lg:w-[340px]
              xl:w-[493px]
              lg:mb-[116px]
              xl:mb-[58px]
              2xl:mb-[38px]
              text-center
              z-[3]
              relative
              lg:text-[18px] lg:font-[500] lg:leading-[150%]
              xl:text-[18px] xl:font-[500] xl:leading-[150%]
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
            with-icon
            variant="secondary"
            text="Read more"
            class="mb-[228px] xl:mb-[307px] 2xl:mb-[313px]"
          />
        </template>
      </Container>
    </div>
  </Section>
</template>
