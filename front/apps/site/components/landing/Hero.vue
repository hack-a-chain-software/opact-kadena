<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <div
    class="
      max-w-screen
      overflow-x-clip
      pt-[52px]
      md:pt-[60px]
      h-[790px]
      sm:h-[1097.2px]
      lg:h-[717px]
      xl:h-[807.57px]
      2xl:h-[880px]
    "
  >
    <Section
      class="
        flex flex-col
        lg:relative lg:overflow-visible
        items-center
        lg:items-start
        xl:items-start
        mb-[22px]
        sm:mb-0
        md:mb-0
        lg:mb-10
        xl:mb-[65px]
        pt-[24px]
        sm:pt-[50px]
        lg:pt-[108px]
        xl:pt-[107px]
        2xl:pt-[102px]
      "
    >
      <h1
        v-text="config.wallet.title"
        class="
          relative
          z-[2]
          -xs
          mx-auto
          lg:mx-0
          xl:mx-0
          text-white text-center
          lg:text-left
          font-title
          xl:font-[700]
          lg:font-semibold
          pb-[8px]
          sm:pb-[22px]
          xl:pb-[22px]
          lg:pb-[26px]
          md:leading-[62.4px]
          lg:leading-[65px]
          xl:leading-[70.2px]
          md:tracking-[0.05rem]
          lg:tracking-[0.09rem]
          xl:tracking-[0.06rem]
          text-3xl-poppins-xs
          sm:text-[48px]
          md:font-[700]
          lg:text-[50px]
          xl:text-[54px]
          max-w-[290px]
          sm:max-w-[490px]
          md:max-w-full
          lg:max-w-[410px]
          xl:max-w-[499px]
        "
      />

      <h2
        class="
          relative
          z-[2]
          mx-auto
          lg:mx-0
          sm:text-xl
          lg:text-xl
          sm:leading-[30px]
          lg:leading-[30px]
          text-sm-hero text-white text-center
          lg:text-left
          max-w-[290px]
          sm:max-w-[440px]
          md:max-w-[620px]
          lg:max-w-[450px]
          xl:max-w-[499px]
        "
        v-text="config.wallet.subtitle"
      />

      <div
        class="
          lg:text-left
          sm:flex
          z-[2]
          w-full
          order-3
          sm:order-2
          mt-[-28px]
          sm:mt-0 sm:mx-auto
          lg:mx-0
          sm:space-x-6
          space-y-4
          sm:space-y-0 sm:max-w-max
          lg:max-w-[499px]
          xl:max-w-[499px]
          sm:pt-[32px]
          md:pt-[34px]
          lg:pt-[31px]
          xl:pt-[34px]
        "
      >
        <Button
          text="Lauch App"
          :with-icon="true"
          variant="hero-primary"
          class="w-full lg:w-auto max-w-full md:max-w-max"
        />

        <Button
          variant="tertiary"
          text="Documentation"
          class="w-full lg:w-auto max-w-full md:max-w-max"
        />
      </div>

      <div
        class="
          lg:top-[-4rem]
          z-[0]
          sm:order-3
          order-2
          lg:absolute lg:bottom-auto
          flex
          items-center
          justify-center
          translate-x-[12px]
          md:translate-x-[22px]
          mt-[-40px]
          sm:mt-[-16%]
          md:mt-[-84px]
          lg:mt-0
          select-none
          pointer-events-none
          overflow-y-clip
          lg:right-[-10rem]
          xl:right-[-9rem]
          2xl:right-[-8rem]
          w-[466px]
          sm:w-[874px]
          lg:w-[861px]
          xl:w-[970px]
          2xl:w-[1057px]
          h-[387.95px]
          sm:h-[716.81px]
          lg:h-[717px]
          xl:h-[807.57px]
          2xl:h-[880px]
        "
      >
        <figure class="rotate-[-8.05deg] lg:rotate-0">
          <nuxt-img
            src="/hero.webp"
            alt="Hero illustration"
            sizes="md:466px lg:874px xl:861px xxl:1057px"
          />
        </figure>
      </div>
    </Section>

    <Section class="z-[1] space-y-4 relative">
      <div
        class="
          sm:space-x-6
          md:mt-[-30px]
          lg:mt-0
          flex flex-col
          sm:flex-row sm:items-center
        "
      >
        <span
          class="
            text-white
            mb-[8px]
            sm:mb-0
            font-semibold
            tracking-[0.05rem]
            lg:text-xl lg:leading-[30px]
            xl:text-xl xl:leading-[30px]
            sm:text-lg sm:text-xl sm:leading-[30px]
          "
        >
          Building on
        </span>

        <div
          class="
            flex
            space-x-4
            lg:space-x-[18px]
            xl:space-x-4
          "
        >
          <LandingBlockchain
            :icon="icon"
            :name="name"
            :key="`landing-blockchain-label-${name}`"
            v-for="{ icon, name } in config.chains"
          />
        </div>
      </div>
    </Section>
  </div>
</template>
