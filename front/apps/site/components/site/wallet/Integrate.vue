<template>
  <Container
    center
    class="w-full"
    cta="Learn more"
    size="xl"
  >
    <template #after>
      <SiteFigurePurple />
    </template>

    <template #title>
      <span
        class="
          block
          mb-[18px]
          sm:mb-2.5
          lg:mb-4
          xl:w-[493px]
          text-center
          z-[3]
          relative
          pt-2
          sm:pt-0
          sm:text-[40px]
          sm:font-semibold
          sm:leading-normal
          lg:text-[29px]
          2xl:text-[34px]
          mx-auto
          2xl:w-full
        "
      >
        Integrate private and compliant accounts to your
        application
      </span>
    </template>

    <template #text>
      <span
        class="
          block
          mb-[22px]
          lg:w-[340px]
          xl:w-[493px]
          sm:mb-[42px]
          lg:mb-[116px]
          xl:mb-[58px]
          2xl:mb-[38px]
          text-center
          z-[4]
          relative
          px-4
          sm:px-0
          text-lg
          font-medium
          leading-normal
          mx-auto
          2xl:w-[532px]
        "
      >
        Allow the users to perform anonymous transactions on
        your dApp by integrating Opact Wallet, e.g., perform
        trades on a DEX in a private manner.
      </span>
    </template>

    <template #cta>
      <Button
        with-icon
        variant="secondary"
        text="Read more"
        class="
          mb-[190px]
          lg:mb-[228px]
          xl:mb-[307px]
          2xl:mb-[313px]
        "
      />
    </template>
  </Container>
</template>
