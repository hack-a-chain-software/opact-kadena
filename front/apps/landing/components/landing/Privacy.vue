<template>
  <LandingSection
    class="
      mb-[40px]
      sm:mb-[50px]
      md:mb-[60px]
      overflow-hidden
      relative
      lg:flex
      lg:mb-[84px]
      lg:flex-row-reverse
      lg:justify-between
      xl:flex
      xl:mb-[84px]
      xl:flex-row-reverse
      xl:justify-between
      2xl:mb-[30px]
    "
  >
    <figure class="md:mb-[18px] lg:mr-[-80px] xl:mr-0">
      <nuxt-img
        src="/privacy.png"
        class="
          max-w-[328px]
          h-[244px]
          sm:h-auto sm:max-w-[510px]
          md:max-w-[622px]
          mx-auto
          lg:h-[354px]
          lg:translate-y-[50px]
          lg:translate-x-[-30px]
          xl:h-auto
          xl:max-w-[520px]
          xl:translate-y-[0px]
          xl:translate-x-[-30px]
          2xl:max-w-[648px]
        "
        loading="lazy"
        sizes="xs:328px sm:510px md:622px lg:502px 2xl:648px"
        alt="Illustrative image of the marijuana plant"
      />
    </figure>

    <div class="flex-1">
      <div
        class="
          flex flex-col
          md:flex-row
          md:items-center
          md:space-x-[24px]
          md:mb-[25px]
          lg:mb-[28px]
          xl:mb-[25px]
        "
      >
        <h3
          class="
            bg-opact-gradient bg-clip-text
            text-transparent
            w-max
            text-sm
            font-[500]
            uppercase
            mb-[12px]
            md:mb-0
            sm:leading-[33px] sm:text-[22px] sm:font-[900]
            lg:text-[22px] lg:leading-[33px] lg:font-[700]
          "
        >
          Privacy
        </h3>

        <div
          class="
            flex
            space-x-[13px]
            mb-[16px]
            md:mb-0 md:space-x-[8px]
          "
        >
          <LandingBadge>
            P2P Private transactions
          </LandingBadge>

          <LandingBadge>
            DeFi Private transactions
          </LandingBadge>
        </div>
      </div>

      <h2
        class="
          font-[600]
          text-2xl-poppins text-[30px]
          font-title
          text-white
          tracking-[-0.05rem]
          mb-[12px]
          max-w-[330px]
          sm:mb-[20px]
          sm:max-w-full
          sm:tracking-normal
          sm:text-4xl-poppins-md
          lg:font-[600]
          lg:text-[48px]
          lg:leading-[57.6px]
          lg:mb-[22px]
          lg:max-w-[441px]
          xl:max-w-auto
          xl:font-[600]
          xl:text-[50px]
          xl:leading-[60px]
          xl:mb-[23px]
          xl:tracking-normal
          2xl:font-[600]
          2xl:text-[54px]
          2xl:leading-[64.8px]
          2xl:mb-[23px]
          2xl:tracking-normal
          2xl:min-w-[600px]
        "
      >
        Protect your
        <br class="hidden lg:inline xl:hidden" />
        privacy on-chain with Opact
        <span class="hidden md:inline">Wallet</span>
      </h2>

      <p
        class="
          text-lg-xs text-[#BDBDBD]
          mb-[32px]
          sm:text-[20px]
          sm:leading-[30px]
          sm:font-[500]
          sm:mb-[42px]
          lg:tracking-[0.005rem]
          lg:mb-[48px]
          lg:max-w-[441px]
          xl:max-w-auto
          xl:tracking-[0.005rem]
          xl:mb-[47px]
          xl:text-[20px]
          xl:leading-[30px]
          xl:font-[500]
          lg:text-[20px] lg:leading-[30px] lg:font-[500]
          2xl:mb-[50px] 2xl:min-w-[600px]
        "
      >
        Blockchains are transparent and everything you do
        on-chain is available for anyone to see. Privacy
        tools are mandatory for the blockchain to achieve
        mainstream adoption as a financial system.
      </p>

      <LandingButton
        :with-icon="true"
        variant="secondary"
        text="Learn more"
        class="lg:h-[32px] xl:h-[39px]"
      />
    </div>
  </LandingSection>
</template>
