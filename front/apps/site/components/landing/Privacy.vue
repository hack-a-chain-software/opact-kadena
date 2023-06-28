<template>
  <Section
    id="privacy"
    class="
      pt-[40px]
      md:pt-[30px]
      lg:pt-[115px]
      xl:pt-[33.52px]
      2xl:pt-[38px]
      relative
      overflow-hidden
      lg:flex lg:flex-row-reverse lg:justify-between
    "
  >
    <figure
      class="
        md:mb-[39px]
        lg:mb-[18px] lg:mr-[-80px]
        xl:mr-0
      "
    >
      <nuxt-img
        loading="lazy"
        src="/privacy.webp"
        alt="Illustrative image"
        sizes="xs:328px sm:510px md:622px lg:435px 2xl:602px"
        class="
          h-[244px]
          sm:h-auto
          mx-auto
          lg:translate-y-[55px]
          xl:translate-y-[20px]
          lg:translate-x-[-80px]
          xl:translate-x-[-30px]
          2xl:translate-x-[-30px]
          max-w-[328px]
          sm:max-w-[510px]
          md:max-w-[622px]
          lg:max-w-[435px]
          xl:max-w-[520px]
          2xl:max-w-[602px]
        "
      />
    </figure>

    <div class="flex-1">
      <div
        class="
          md:space-x-[24px] md:mb-[25px]
          lg:mb-[28px]
          xl:mb-[25px]
          flex flex-col
          md:flex-row md:items-center
        "
      >
        <h3
          v-motion
          :initial="{ opacity: 0, x: -15 }"
          :visibleOnce="{ opacity: 1, x: 0 }"
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
          Privacy
        </h3>

        <div
          class="
            flex
            mb-[16px]
            md:mb-0
            space-x-[13px]
            md:space-x-[8px]
          "
        >
          <Badge
            v-motion
            :initial="{ opacity: 0, x: -15 }"
            :visible-once="{ opacity: 1, x: 0 }"
            :delay="150"
          >
            P2P Private transactions
          </Badge>

          <Badge
            v-motion
            :initial="{ opacity: 0, x: -15 }"
            :visible-once="{ opacity: 1, x: 0 }"
            :delay="300"
          >
            DeFi Private transactions
          </Badge>
        </div>
      </div>

      <h2
        v-motion
        class="
          font-title
          text-white
          font-[600]
          xl:min-w-[569px]
          2xl:min-w-[600px]
          sm:tracking-normal
          tracking-[-0.05rem]
          max-w-[330px]
          sm:max-w-full
          lg:max-w-[441px] lg:leading-[57.6px]
          xl:leading-[60px]
          2xl:leading-[64.8px]
          mb-[12px]
          sm:mb-[20px]
          lg:mb-[22px]
          xl:mb-[23px]
          2xl:mb-[23px]
          text-2xl-poppins text-[30px]
          sm:text-4xl-poppins-md
          lg:text-[48px]
          xl:text-[50px]
          2xl:text-[54px]
        "
        :initial="{
          opacity: 0,
          x: -15,
          transition: {
            duration: 420,
          },
        }"
        :visibleOnce="{
          opacity: 1,
          x: 0,
          transition: {
            duration: 420,
          },
        }"
        :delay="600"
      >
        Protect your
        <br class="hidden lg:inline xl:hidden" />
        privacy on-chain with Opact
        <span class="hidden md:inline">Wallet</span>
      </h2>

      <p
        v-motion
        :initial="{
          opacity: 0,
          x: -15,
          transition: {
            duration: 420,
          },
        }"
        :visibleOnce="{
          opacity: 1,
          x: 0,
          transition: {
            duration: 420,
          },
        }"
        :delay="700"
        class="
          text-[#BDBDBD]
          sm:font-[500]
          lg:tracking-[0.005rem] lg:max-w-[441px]
          xl:max-w-auto xl:min-w-[570px]
          2xl:min-w-[570px]
          sm:leading-[30px]
          lg:leading-[30px]
          xl:leading-[30px]
          text-lg-xs
          sm:text-[20px]
          lg:text-[20px]
          xl:text-[20px]
          mb-[32px]
          sm:mb-[42px]
          lg:mb-[48px]
          xl:mb-[47px]
          2xl:mb-[50px]
        "
      >
        Blockchains are transparent and everything you do
        on-chain is available for anyone to see. Privacy
        tools are mandatory for the blockchain to achieve
        mainstream adoption as a financial system.
      </p>

      <Button
        v-motion
        :delay="800"
        :with-icon="true"
        text="Learn more"
        variant="secondary"
        class="lg:h-[32px] xl:h-[39px]"
        :initial="{
          opacity: 0,
          x: -15,
          transition: {
            duration: 420,
          },
        }"
        :visible-once="{
          opacity: 1,
          x: 0,
          transition: {
            duration: 420,
          },
        }"
      />
    </div>
  </Section>
</template>
