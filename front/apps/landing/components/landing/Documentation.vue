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
        Documentation
      </h3>

      <h2
        class="
          text-2xl-poppins
          font-title
          text-white
          mb-[8px]
        "
      >
        Refer to our docs to understand how it all works:
      </h2>

      <p
        class="
          text-lg-xs
          text-[#BDBDBD]
          mb-[32px]
        "
      >
        Explore the inner workings of Opact.
      </p>

      <LandingButton
        :with-icon="true"
        variant="secondary"
        class=""
      >
        <span>
          Opact Documentation
        </span>

        <LandingAssetsArrow />
      </LandingButton>
    </LandingContainer>
  </LandingSection>
</template>
