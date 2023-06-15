<template>
  <div
    class="
      pt-[52px]
      mb-[40px]
    "
  >
    <LandingSection
      class="pb-[317px] pt-[24px]"
    >
      <h1
        class="
          text-white
          text-center
          font-title
          pb-[8px]
          z-[2]
          relative
          text-3xl-poppins-xs
        "
      >
        On-chain Private <br/> And Compliant <br/> Transactions
      </h1>

      <h2
        class="
          text-white
          font-normal
          text-center
          text-sm-hero
          z-[2]
          relative
        "
      >
        Opact allows you to perform anonymous <br/> transactions on the Blockchain by creating <br/> private accounts powered by Zero Knowledge.
      </h2>

      <div
        class="absolute top-[130.63px] left-1/2 -translate-x-1/2 w-full max-w-[360px] z-[0]"
      >
        <figure>
          <nuxt-img
            src="/hero-illustration-mobile.png"
            width="360"
            height="552.37"
            class="
              w-full
            "
            loading="lazy"
            alt="Hero illustration"
          />
        </figure>
      </div>
    </LandingSection>

    <LandingSection
      class="z-[1] space-y-[16px] relative"
    >
      <LandingButton
        :with-icon="true"
        variant="primary"
        class="w-full h-[44px]"
      >
        <span>
          Louch App
        </span>

        <LandingAssetsArrow />
      </LandingButton>

      <LandingButton
        variant="tertiary"
        class="w-full h-[44px]"
      >
        Documentation
      </LandingButton>

      <div>
        <h3
          class="
            text-white
            mb-[8px]
          "
        >
          Building on
        </h3>

        <div
          class="flex space-x-[16px]"
        >
          <LandingBlockchain
            chain="eth"
          />

          <LandingBlockchain
            chain="near"
          />

          <LandingBlockchain
            chain="kadena"
          />
        </div>
      </div>
    </LandingSection>
  </div>
</template>
