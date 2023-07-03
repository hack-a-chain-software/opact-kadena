<template>
  <Section
    class="
      pt-[125px]
      lg:pt-[55px]
      xl:pt-0
      flex flex-col
      items-center
      justify-center
    "
  >
    <div class="pb-1 xl:pb-[16px]">
      <Tag>
        Our Products
      </Tag>
    </div>

    <div class="pb-[24px] sm:pb-[38px] lg:pb-[60px]">
      <h2
        class="
          text-[#FAFAFA]
          font-title
          text-[32px]
          font-[600]
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
        space-y-[40px]
        sm:space-y-[60px]
        flex
        lg:space-y-0 lg:space-x-[32px]
        w-full
      "
    >
      <SiteWalletAbout />

      <SiteWalletIntegrate />
    </div>
  </Section>
</template>
