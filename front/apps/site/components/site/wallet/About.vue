<template>
  <Container
    center
    class="w-full"
    cta="Learn more"
    size="xl"
  >
    <template #after>
      <SiteFigureBlue />
    </template>

    <template #title>
      <span
        class="
          block
          mb-[16px]
          sm:mb-[24px]
          lg:mb-[16px]
          xl:w-[493px]
          text-center
          pt-[6px]
          sm:pt-0
          z-[3]
          relative
          lg:text-[32px] lg:font-[600] lg:leading-[150%]
          2xl:text-[34px]
          mx-auto
        "
      >
        Bring private and compliant accounts to your
        blockchain
      </span>
    </template>

    <template #text>
      <span
        class="
          block
          mb-[24px]
          lg:mb-[21px]
          text-center
          z-[10]
          relative
          lg:text-[18px] lg:font-[500] lg:leading-[150%]
          mx-auto
          2xl:w-[532px]
        "
      >
        Opact Wallet can be implemented into different
        blockchain ecosystems, and our team has the
        expertise to develop it in Solidity, Rust, Ink!,
        Pact, and other languages and frameworks. If you
        want private transactions on your blockchain,
        reach out to us!
      </span>
    </template>

    <template #cta>
      <Button
        with-icon
        variant="secondary"
        text="Read more"
        class="
          mb-[195px]
          lg:mb-[230px]
          xl:mb-[281px]
          2xl:mb-[302px]
        "
      />
    </template>
  </Container>
</template>
