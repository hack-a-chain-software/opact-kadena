<template>
  <LandingSection class="mb-[40px]">
    <LandingContainer>
      <figure
        class="absolute top-0 left-1/2 -translate-x-1/2"
      >
        <nuxt-img
          src="/security.png"
          width="328"
          height="238"
          class="max-w-[328px]"
          loading="lazy"
          alt="Illustrative image of the marijuana plant"
        />
      </figure>

      <h3
        class="
          bg-opact-gradient bg-clip-text
          text-transparent
          w-max
          text-sm
          font-[500]
          uppercase
          mb-[12px]
          pt-[214px]
        "
      >
        Security
      </h3>

      <h2
        class="
          font-[500]
          text-2xl-poppins
          font-title
          text-white
          mb-[12px]
        "
      >
        Secure and Compliant <br />
        Privacy with Opact
      </h2>

      <p class="text-lg-xs text-[#BDBDBD] mb-[32px]">
        Blockchains are transparent and everything you do
        on-chain is available for anyone to see. Privacy
        tools are mandatory for the blockchain to achieve
        mainstream adoption as a financial system.
      </p>

      <LandingButton
        :with-icon="true"
        variant="secondary"
        class=""
      >
        <span> Louch App </span>

        <LandingAssetsArrow />
      </LandingButton>
    </LandingContainer>
  </LandingSection>
</template>
