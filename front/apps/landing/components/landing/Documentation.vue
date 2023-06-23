<template>
  <LandingContainer
    cta="Opact Documentation"
    id="documentation"
    class="flex-1"
  >
    <template v-slot:tag>
      <span
        class="block mb-[10px] sm:mb-[18px] lg:mb-[18px]"
      >
        Documentation
      </span>
    </template>

    <template v-slot:title>
      <span
        class="
          block
          mb-[8px]
          lg:max-[501px] lg:mb-[8px]
          xl:max-w-full
        "
      >
        Refer to our docs to understand how it all works:
      </span>
    </template>

    <template v-slot:text>
      <span
        class="
          block
          mb-[30px]
          sm:mb-[41px]
          xl:mb-[56px]
          lg:mb-[120px]
        "
      >
        Explore the inner workings of Opact.
      </span>
    </template>
  </LandingContainer>
</template>
