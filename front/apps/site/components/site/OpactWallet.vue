<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <Section
    class="
      pt-[125px]
      lg:pt-[55px]
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
          pb-[4px]
          lg:pb-[12px]
          xl:pb-[3px]
          2xl:pb-0
          sm:leading-[33px]
          lg:leading-[33px]
          sm:text-[22px]
          lg:text-[22px]
          font-[900]
          text-[16px]
          sm:font-[900]
          lg:font-[700]
          text-transparent
          bg-opact-gradient bg-clip-text
        "
      >
        Our products
      </h3>
    </div>

    <div class="pb-[24px] sm:pb-[38px] lg:pb-[60px]">
      <h2
        class="
          text-[#FAFAFA]
          font-title
          text-[32px]
          font-[600]
          leading-[120%]
          sm:text-[56px] sm:font-[600] sm:leading-[120%]
        "
      >
        Opact Wallet
      </h2>
    </div>

    <Container
      class="w-full mb-[60px] lg:mb-[80px]"
      cta="Learn more"
      size="xl"
    >
      <template #before>
        <div
          class="
            z-[2]
            mt-[-48px]
            mb-[68px]
            ml-[-32px]
            translate-x-[16px]
            sm:mb-[10px]
            sm:ml-0
            sm:translate-x-0
            sm:w-[704px]
            lg:absolute lg:top-0 lg:right-0 lg:w-auto
            xl:absolute
            xl:top-0
            xl:right-0
            xl:w-auto
            xl:bottom-0
            xl:left-0
          "
        >
          <figure class="h-[238px] sm:h-[482px]">
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
              scale-x-[-1]
              lg:scale-x-[1]
              rotate-[-30deg]
              top-[-110px]
              left-[-120px]
              min-w-[600px]
              sm:rotate-[-20deg]
              sm:top-[-240px]
              sm:left-[-140px]
              sm:min-w-[1000px]
              md:rotate-[-14deg]
              md:top-[-300px]
              md:left-[-240px]
              md:min-w-[1200px]
              lg:min-w-[800px]
              lg:top-[-20px]
              lg:left-[330px]
              lg:rotate-[28deg]
              xl:rotate-[17deg]
              xl:min-w-[960px]
              xl:top-[-146px]
              xl:left-[430px]
              2xl:rotate-0
              2xl:min-w-[1189.79px]
              2xl:top-[-240px]
              2xl:left-[490px]
            "
          >
            <nuxt-img
              src="/wallet/figures/connections.png"
              class="scale-x-[-1] lg:scale-x-[1]"
              sizes="sm:600px lg:1200px 2xl:1189.79px"
              alt="Illustrative image"
            />
          </figure>
        </div>
      </template>

      <template #title>
        <div
          class="
            mb-[10px]
            sm:mb-[12px]
            lg:mb-[28px]
            xl:w-[493px]
            relative
          "
        >
          <div
            class="
              flex
              space-x-[16px]
              mb-[10px]
              sm:mb-[13px]
              lg:mb-[24px]
            "
          >
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

          <div
            class="
              !leading-[30px]
              sm:!leading-[54px]
              lg:!leading-[52px] lg:max-w-[399px]
              xl:max-w-full
            "
          >
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

    <div
      class="
        flex-col
        lg:flex-row
        space-y-[40px]
        sm:space-y-[60px]
        flex
        lg:space-y-0 lg:space-x-[32px]
        w-full
      "
    >
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
              sm:mb-0 sm:ml-0 sm:translate-x-0
              w-full
              h-full
              absolute
              bottom-0
              left-0
              pointer-events-none
            "
          >
            <figure
              class="opacity-0 group-hover/container:opacity-100 transition-all duration-700"
            >
              <nuxt-img
                src="/wallet/blue-hover.png"
                class="absolute inset-0 w-full h-full z-[-1]"
              />
            </figure>

            <figure
              class="h-[700px] w-full absolute bottom-0"
            >
              <nuxt-img
                src="/wallet/blue.png"
                loading="lazy"
                class="w-full h-full"
                alt="Illustrative image"
                sizes="xs:704px sm:704px"
              />
            </figure>

            <figure
              class="
                absolute
                translate-x-[23px]
                bottom-[-70px]
                sm:translate-x-[108px] sm:bottom-[-100px]
                lg:translate-x-[46px] lg:bottom-[-40px]
                xl:translate-x-[70px] xl:bottom-[-70px]
                2xl:translate-x-[93px] 2xl:bottom-[-119px]
              "
            >
              <NuxtImg
                alt="Illustrative image"
                src="/wallet/figures/bring.png"
                sizes="sm:279px lg:490px xl:342px 2xl:416px xxl:480px"
              />
            </figure>
          </div>
        </template>

        <template #title>
          <span
            class="
              block
              mb-[16px]
              sm:mb-[24px]
              lg:mb-[16px]
              xl:w-[493px]
              text-center
              pt-[6px]
              sm:pt-0
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
              mb-[24px]
              lg:mb-[21px]
              text-center
              z-[10]
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
              mb-[195px]
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
              sm:mb-0 sm:ml-0 sm:translate-x-0
              w-full
              h-full
              absolute
              bottom-0
              left-0
              pointer-events-none
            "
          >
            <figure
              class="opacity-0 group-hover/container:opacity-100 transition-all duration-700"
            >
              <nuxt-img
                src="/wallet/purple-hover.png"
                class="absolute inset-0 z-[-1]"
              />
            </figure>

            <figure
              class="h-[700px] w-full absolute bottom-0"
            >
              <nuxt-img
                src="/wallet/purple.png"
                loading="lazy"
                class="w-full h-full"
                alt="Illustrative image"
                sizes="xs:328px sm:704px"
              />
            </figure>

            <figure
              class="
                absolute
                translate-x-[20px]
                bottom-[-60px]
                sm:translate-x-[130px] sm:bottom-[-96px]
                lg:translate-x-[48px] lg:bottom-[-63px]
                xl:translate-x-[70px] xl:bottom-[-65px]
                2xl:translate-x-[93px] 2xl:bottom-[-90px]
              "
            >
              <nuxt-img
                sizes="md:290px lg:490px xl:342px 2xl:416px xxl:480px"
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
              mb-[18px]
              sm:mb-[10px]
              lg:mb-[16px]
              xl:w-[493px]
              text-center
              z-[3]
              relative
              pt-[8px]
              sm:pt-0
              sm:text-[40px]
              sm:font-[600]
              sm:leading-[150%]
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
              mb-[22px]
              lg:w-[340px]
              xl:w-[493px]
              sm:mb-[42px]
              lg:mb-[116px]
              xl:mb-[58px]
              2xl:mb-[38px]
              text-center
              z-[4]
              relative
              px-4
              sm:px-0
              text-[18px]
              font-[500]
              leading-[150%]
              sm:text-[18px] sm:font-[500] sm:leading-[150%]
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
            class="
              mb-[190px]
              lg:mb-[228px]
              xl:mb-[307px]
              2xl:mb-[313px]
            "
          />
        </template>
      </Container>
    </div>
  </Section>
</template>
