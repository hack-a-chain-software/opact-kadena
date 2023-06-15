<template>
  <LandingSection
    class="mb-[40px]"
  >
    <LandingContainer>
      <h3
        class="
          bg-opact-gradient bg-clip-text text-transparent w-max text-sm font-[500] uppercase mb-[12px]
        "
      >
        Community
      </h3>

      <h2
        class="
          text-2xl-poppins
          font-title
          text-white
          mb-[8px]
        "
      >
        Connect with the Opact community
      </h2>

      <p
        class="
          text-lg-xs
          text-[#BDBDBD]
          mb-[32px]
        "
      >
        Engage with the Opact Community
      </p>

      <div
        class="flex space-x-[24px]"
      >
        <div
          class="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center text-dark-blue"
        >
          <LandingAssetsTwitter />
        </div>

        <div
          class="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center text-dark-blue"
        >
          <LandingAssetsDiscord />
        </div>

        <div
          class="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center text-dark-blue"
        >
          <LandingAssetsGithub />
        </div>
      </div>
    </LandingContainer>
  </LandingSection>
</template>
