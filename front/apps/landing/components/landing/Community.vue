<template>
  <LandingSection class="mb-[40px] md:mb-[60px]">
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

          sm:text-[32px]
          sm:leading-[40px]

          md:font-[600]
          md:text-[40px]
          md:leading-[60px]
        "
      >
        Connect with the Opact <span class="hidden md:inline">Wallet</span> community
      </h2>

      <p
        class="
          text-lg-xs text-[#BDBDBD] mb-[32px]

          sm:font-[500]
          sm:text-[20px]
          sm:leading-[30px]
          sm:mb-[38px]
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
          "
        >
          <LandingAssetsGithub />

          <div
            class="hidden sm:block"
          >
            <p
              class="text-[16px] font-[500] leading-[24px] text-dark-blue font-title"
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
          "
        >
          <LandingAssetsDiscord />

          <div
            class="hidden sm:block"
          >
            <p
              class="text-[16px] font-[500] leading-[24px] text-dark-blue font-title"
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
          "
        >
          <LandingAssetsTwitter />

          <div
            class="hidden sm:block"
          >
            <p
              class="text-[16px] font-[500] leading-[24px] text-dark-blue font-title"
            >
              Twitter
            </p>
          </div>
        </div>
      </div>
    </LandingContainer>
  </LandingSection>
</template>
