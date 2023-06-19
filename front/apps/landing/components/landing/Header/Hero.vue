<script setup lang="ts">
</script>

<template>
  <div
    class="pt-[52px] md:pt-[60px] mb-[40px] lg:mb-[62px] xl:mb-[90px] overflow-x-clip max-w-screen"
  >
    <LandingSection
      class="
        pt-[24px]
        flex flex-col
        items-center
        mb-[22px]
        sm:pt-[50px] sm:mb-0

        lg:items-start
        lg:relative
        lg:overflow-visible
        lg:pt-[74px]
        lg:mb-[50px]

        xl:items-start
        xl:relative
        xl:overflow-visible
        xl:pt-[107px]
        xl:mb-[65px]
      "
    >
      <h1
        class="
          z-[2]
          pb-[8px]
          relative
          font-title
          mx-auto
          text-3xl-poppins-xs text-white text-center
          max-w-[290px]
          sm:text-[48px] sm:max-w-[490px] sm:pb-[22px]
          md:font-[700]
          md:leading-[62.4px]
          md:max-w-full
          md:tracking-[0.05rem]

          lg:text-left
          lg:max-w-[410px]
          lg:mx-0
          lg:pb-[19px]
          lg:font-[600]
          lg:text-[44px]
          lg:leading-[56px]
          lg:tracking-[0.06rem]

          xl:text-left
          xl:max-w-[499px]
          xl:mx-0
          xl:pb-[22px]
          xl:font-[700]
          xl:text-[54px]
          xl:leading-[70.2px]
          xl:tracking-[0.06rem]
        "
      >
        On-chain Private And Compliant Transactions
      </h1>

      <h2
        class="
          text-white
          font-normal
          text-center text-sm-hero
          z-[2]
          relative
          mx-auto
          max-w-[290px]
          sm:max-w-[440px]
          sm:font-[400]
          sm:text-[20px]
          sm:leading-[30px]
          md:max-w-[620px]

          lg:text-left
          lg:max-w-[400px]
          lg:mx-0
          lg:text-[18px]
          lg:leading-[24px]

          xl:text-left
          xl:max-w-[499px]
          xl:mx-0
          xl:font-[400]
          xl:text-[20px]
          xl:leading-[30px]
        "
      >
        Opact Wallet allows you to perform anonymous
        transactions on the Blockchain by creating private
        accounts powered by Zero Knowledge.
      </h2>

      <div
        class="
          order-3
          w-full
          z-[2]
          space-y-[16px]
          mt-[-28px]
          sm:flex
          sm:mt-0
          sm:space-y-0
          sm:max-w-max
          sm:mx-auto
          sm:space-x-[24px]
          sm:order-2
          sm:pt-[32px]
          md:pt-[34px] md:mt-0

          lg:text-left
          lg:max-w-[499px]
          lg:mx-0
          lg:pt-[27px]

          xl:text-left
          xl:pt-[34px]
          xl:max-w-[499px]
          xl:mx-0
        "
      >
        <LandingButton
          text="Louch App"
          :with-icon="true"
          variant="hero-primary"
        />

        <LandingButton
          variant="tertiary"
          text="Documentation"
        />
      </div>

      <div
        class="
          z-[0]
          order-2
          mt-[-40px]
          overflow-y-clip
          flex
          items-center
          justify-center
          sm:order-3 sm:mt-[-16%]
          w-[466px]
          sm:w-[874px]
          md:mt-[-90px] md:translate-x-[18px]

          lg:bottom-auto
          lg:top-[-5rem]
          lg:absolute
          lg:mt-0
          lg:right-[-8rem]
          lg:w-[800px]

          xl:bottom-auto
          xl:top-[-5rem]
          xl:absolute
          xl:mt-0
          xl:right-[-9rem]
          xl:w-[970px]
        "
      >
        <figure class="rotate-[-8.05deg] lg:rotate-0">
          <nuxt-img
            src="/hero.png"
            alt="Hero illustration"
            sizes="xs:466px sm:874px lg:800px xl:970px 2xl:1057px"
          />
        </figure>
      </div>
    </LandingSection>

    <LandingSection
      class="z-[1] space-y-[16px] relative md:pb-[46px]"
    >
      <div
        class="
          flex flex-col
          sm:flex-row sm:items-center sm:space-x-[24px]
          md:mt-[-30px]
          lg:mt-0
          xl:mt-0
          lg:space-x-[18px]
          xl:space-x-[24px]
        "
      >
        <span
          class="
            text-white
            mb-[8px]
            tracking-[0.05rem]
            font-[600]
            sm:mb-0
            sm:text-lg
            sm:text-[20px]
            sm:leading-[30px]

            lg:mb-0
            lg:text-[16px]
            lg:leading-[30px]

            xl:mb-0
            xl:text-lg
            xl:text-[20px]
            xl:leading-[30px]
          "
        >
          Building on
        </span>

        <div class="flex space-x-[16px] lg:space-x-[12px] xl:space-x-[16px]">
          <LandingBlockchain chain="near" />

          <LandingBlockchain chain="kadena" />

          <LandingBlockchain chain="eth" />
        </div>
      </div>
    </LandingSection>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
