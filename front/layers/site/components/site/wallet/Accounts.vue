<template>
  <Container
    class="w-full mb-[60px] lg:mb-[80px]"
    cta="Learn more"
    to="/wallet"
    size="xl"
  >
    <template #before>
      <SiteFigureConnections />
    </template>

    <template #title>
      <div
        class="mb-2.5 sm:mb-3 lg:mb-7 xl:w-[493px] relative"
      >
        <div
          class="flex space-x-4 mb-2.5 sm:mb-[13px] lg:mb-6"
        >
          <Badge
            v-motion
            :delay="150"
            :initial="{ opacity: 0, x: -15 }"
            :visibleOnce="{ opacity: 1, x: 0 }"
            class="!h-[36px]"
          >
            <div class="flex items-center space-x-1.5">
              <Icon name="kadena" />

              <span> Kadena </span>
            </div>
          </Badge>
        </div>

        <div
          class="
            !leading-[30px]
            sm:!leading-[54px]
            lg:!leading-[52px] lg:max-w-[399px]
            xl:max-w-full
          "
        >
          <span> Decentralized Private Accounts </span>
        </div>
      </div>
    </template>

    <template #text>
      <span
        class="
          block
          mb-8
          lg:w-[400px]
          xl:w-[493px]
          lg:mb-10
        "
      >
        Perform anonymous transactions on the transparent
        blockchain ecosystem, all through smart contracts.
        The first private wallet with a decentralized &
        modular AML.
      </span>
    </template>
  </Container>
</template>
