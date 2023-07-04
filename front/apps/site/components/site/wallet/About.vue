<template>
  <Container
    center
    class="w-full h-[604px] sm:h-[700px] md:h-[760px] lg:h-[752px] xl:h-[700px]"
    cta="Learn more"
    size="xl"
    to="#contact"
  >
    <template #after>
      <SiteFigureBlue />
    </template>

    <template #title>
      <span
        class="
          block
          mb-4
          sm:mb-6
          lg:mb-4
          xl:w-[493px]
          text-center
          pt-[6px]
          sm:pt-0
          z-[3]
          relative
          lg:text-[32px] lg:font-semibold lg:leading-normal
          2xl:text-[34px]
          2xl:pt-0
          xl:pt-1
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
          mb-6
          lg:max-w-[340px]
          xl:max-w-full
          lg:mb-[21px]
          2xl:mb-[28px]
          text-center
          z-[8]
          relative
          lg:text-lg lg:font-medium lg:leading-normal
          mx-auto
          2xl:w-[532px]
        "
      >
        Opact Wallet can be implemented into different
        blockchain ecosystems, and our team has the
        expertise to develop it in Solidity, Rust, Ink!,
        Pact, and other languages and frameworks. If you
        want private transactions on your blockchain, reach
        out to us!
      </span>
    </template>

    <template #cta>
      <Button
        with-icon
        variant="secondary"
        text="Read more"
      />
    </template>
  </Container>
</template>
