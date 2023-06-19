<template>
  <LandingSection
    class="
      mb-[40px]
      md:mb-[60px]
      lg:mb-[70px]
      xl:mb-[80px]
      lg:!px-0
    "
  >
    <LandingContainer>
      <h3
        class="
          bg-opact-gradient bg-clip-text
          text-transparent
          w-max
          text-sm
          font-[500]
          uppercase
          mb-[10px]
          sm:text-[18px]
          sm:font-[900]
          sm:leading-[27px]
          sm:mb-[18px]
          lg:text-[18px]
          lg:leading-[33px]
          lg:font-[700]
          lg:mb-[4px]
          xl:font-[900]
          xl:text-[18px]
          xl:leading-[27px]
          xl:mb-[18px]
        "
      >
        Community
      </h3>

      <h2
        class="
          text-2xl-poppins
          font-title
          text-white
          mb-[6px]
          sm:text-[32px] sm:leading-[40px]
          md:font-[600] md:text-[40px] md:leading-[60px]
          lg:font-[600]
          lg:text-[24px]
          lg:leading-[40px]
          lg:max-w-[350px]
          lg:mb-[8px]
          xl:text-[32px]
          xl:leading-[48px]
          xl:max-w-full
          xl:mb-[6px]
        "
      >
        Connect with the Opact
        <span class="hidden md:inline">Wallet</span>
        community
      </h2>

      <p
        class="
          text-lg-xs text-[#BDBDBD]
          mb-[32px]
          sm:font-[500]
          sm:text-[20px]
          sm:leading-[30px]
          sm:mb-[38px]
          lg:mb-[42px]
          xl:mb-[58px]
          lg:text-[16px] lg:font-[500] lg:leading-[25px]
          xl:text-[20px] xl:font-[500] xl:leading-[30px]
        "
      >
        Engage with the Opact Community
      </p>

      <div class="flex space-x-[24px]">
        <div
          class="
            w-[40px]
            h-[40px]
            bg-white
            rounded-full
            flex
            items-center
            justify-center
            text-dark-blue
            sm:w-auto
            sm:pl-[16px]
            sm:pr-[24px]
            sm:space-x-[8px]
            lg:h-[30px]
            xl:h-[40px]
            lg:pl-[10px] lg:pr-[18px] lg:space-x-[8px]
            xl:pl-[16px] xl:pr-[24px] xl:space-x-[8px]
          "
        >
          <LandingAssetsGithub />

          <div class="hidden sm:block">
            <p
              class="
                text-[16px]
                font-[500]
                leading-[24px]
                text-dark-blue
                font-title
                lg:text-[14px]
                lg:font-[500]
                lg:leading-[24px]
                xl:text-[16px]
                xl:font-[500]
                xl:leading-[24px]
              "
            >
              Github
            </p>
          </div>
        </div>

        <div
          class="
            w-[40px]
            h-[40px]
            bg-white
            rounded-full
            flex
            items-center
            justify-center
            text-dark-blue
            sm:w-auto
            sm:pl-[16px]
            sm:pr-[24px]
            sm:space-x-[8px]
            lg:h-[30px]
            xl:h-[40px]
            lg:pl-[10px] lg:pr-[18px] lg:space-x-[8px]
            xl:pl-[16px] xl:pr-[24px] xl:space-x-[8px]
          "
        >
          <LandingAssetsDiscord />

          <div class="hidden sm:block">
            <p
              class="
                text-[16px]
                font-[500]
                leading-[24px]
                text-dark-blue
                font-title
                lg:text-[14px]
                lg:font-[500]
                lg:leading-[24px]
                xl:text-[16px]
                xl:font-[500]
                xl:leading-[24px]
              "
            >
              Discord
            </p>
          </div>
        </div>

        <div
          class="
            w-[40px]
            h-[40px]
            bg-white
            rounded-full
            flex
            items-center
            justify-center
            text-dark-blue
            sm:w-auto
            sm:pl-[16px]
            sm:pr-[24px]
            sm:space-x-[8px]
            lg:h-[30px]
            xl:h-[40px]
            lg:pl-[10px] lg:pr-[18px] lg:space-x-[8px]
            xl:pl-[16px] xl:pr-[24px] xl:space-x-[8px]
          "
        >
          <LandingAssetsTwitter />

          <div class="hidden sm:block">
            <p
              class="
                text-[16px]
                font-[500]
                leading-[24px]
                text-dark-blue
                font-title
                lg:text-[14px]
                lg:font-[500]
                lg:leading-[24px]
                xl:text-[16px]
                xl:font-[500]
                xl:leading-[24px]
              "
            >
              Twitter
            </p>
          </div>
        </div>
      </div>
    </LandingContainer>
  </LandingSection>
</template>
