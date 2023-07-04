<template>
  <Section
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
        Opact Wallet
      </h2>
    </div>

    <SiteWalletAccounts />

    <div
      class="
        flex-col
        lg:flex-row
        space-y-10
        sm:space-y-[60px]
        flex
        lg:space-y-0 lg:space-x-8
        w-full
      "
    >
      <SiteWalletAbout />

      <SiteWalletIntegrate />
    </div>
  </Section>
</template>
