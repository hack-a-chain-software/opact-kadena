<template>
  <Section
    id="tickets"
    class="
      pt-[125px]
      md:pt-[134px]
      lg:pt-[55px]
      xl:pt-0
      flex flex-col
      items-center
      justify-center
    "
  >
    <div class="pb-1 xl:pb-4">
      <Tag> Our Products </Tag>
    </div>

    <div class="pb-6 sm:pb-[38px] lg:pb-[60px]">
      <h2
        class="
          text-[#FAFAFA]
          font-title
          text-[32px]
          font-semibold
          leading-[120%]
          sm:text-[56px]
        "
      >
        Opact Tickets
      </h2>
    </div>

    <Container
      class="w-full mb-[60px] lg:mb-[80px]"
      cta="Learn more"
      to="/wallet"
      size="xl"
    >
      <template #before>
        <SiteFigureTickets />
      </template>

      <template #title>
        <div
          class="mb-2.5 sm:mb-3 lg:mb-7 xl:w-[493px] relative"
        >
          <div
            class="flex space-x-4 mb-2.5 sm:mb-[13px] lg:mb-6"
          >
            <Badge
              class="!h-[36px]"
            >
              <div class="flex items-center space-x-1.5">
                <Icon name="near" />

                <span>
                  Near
                </span>
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
            <span> Private and Compliant Payments </span>
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
          The first and simplest version of Opact. Send and receive payments without the need to showcase your wallet. Break the link between sender and receiver to hide your transaction from public eyes, while still being compliant with an innovative approach for AML.
        </span>
      </template>
    </Container>
  </Section>
</template>
