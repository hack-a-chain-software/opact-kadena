<template>
  <LandingSection
    class="mb-[40px] overflow-hidden pt-[244px] relative"
  >
    <figure
      class="absolute top-0 left-1/2 -translate-x-1/2"
    >
      <nuxt-img
        src="/illustration-privacy.png"
        width="360"
        height="552.37"
        class="max-w-[360px]"
        loading="lazy"
        alt="Illustrative image of the marijuana plant"
      />
    </figure>

    <h3
      class="
        bg-opact-gradient bg-clip-text text-transparent w-max text-sm font-[500] uppercase mb-[12px]
      "
    >
      Privacy
    </h3>

    <div
      class="flex space-x-[13px] mb-[16px]"
    >
      <LandingBadge>
        P2P Private transactions
      </LandingBadge>

      <LandingBadge>
        DeFi Private transactions
      </LandingBadge>
    </div>

    <h2
      class="
        font-[600]
        text-2xl-poppins
        text-[30px]
        font-title
        text-white
        mb-[12px]
      "
    >
      Protect your privacy <br/> on-chain with Opact
    </h2>

    <p
      class="
        text-lg-xs
        text-[#BDBDBD]
        mb-[32px]
      "
    >
      Blockchains are transparent and everything you do on-chain is available for anyone to see. Privacy tools are mandatory for the blockchain to achieve mainstream adoption as a financial system.
    </p>

    <LandingButton
      :with-icon="true"
      variant="secondary"
      class=""
    >
      <span>
        Louch App
      </span>

      <LandingAssetsArrow />
    </LandingButton>
  </LandingSection>
</template>
