<template>
  <LandingSection
    class="
      mb-[40px]
      sm:mb-[50px]
      md:mb-[60px]
      overflow-hidden
      relative
    "
  >
    <figure class="md:mb-[18px]">
      <nuxt-img
        src="/privacy.png"
        class="
          max-w-[328px]
          h-[244px]
          sm:h-auto sm:max-w-[510px]
          md:max-w-[622px]
          mx-auto
        "
        loading="lazy"
        sizes="xs:328px sm:510px md:622px"
        alt="Illustrative image of the marijuana plant"
      />
    </figure>

    <div
      class="
        flex flex-col
        md:flex-row
        md:items-center
        md:space-x-[24px]
        md:mb-[25px]
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
      "
    >
      Protect your privacy on-chain with Opact
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
      "
    >
      Blockchains are transparent and everything you do
      on-chain is available for anyone to see. Privacy tools
      are mandatory for the blockchain to achieve mainstream
      adoption as a financial system.
    </p>

    <LandingButton
      :with-icon="true"
      variant="secondary"
      class=""
    >
      <span> Learn More </span>

      <LandingAssetsArrow />
    </LandingButton>
  </LandingSection>
</template>
