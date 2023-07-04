<template>
  <Container
    center
    class="
      w-full
      h-[604px]
      sm:h-[700px]
      md:h-[760px]
      lg:h-[752px]
      xl:h-[700px]
    "
    cta="Learn more"
    size="xl"
    to="#contact"
  >
    <template #after>
      <SiteFigureBlue />
    </template>

    <template #cta>
      <Button
        disabled
        with-icon
        variant="secondary"
        text="Read more"
      />
    </template>
  </Container>
</template>
