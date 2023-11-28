<template>
  <Container
    center
    class="
      w-full
      h-[568px]
      sm:h-[740px]
      md:h-[757px]
      lg:h-[752px]
      xl:h-[700px]
    "
    cta="Learn more"
    size="xl"
    to="#contact"
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
          2xl:mb-[47px]
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
        text="Talk to our team"
        href="#contact"
      />
    </template>
  </Container>
</template>
