<template>
  <header
    class="left-0 top-0 w-full z-[10] pb-10 absolute"
    @mouseout="handleMenuState()"
  >
    <nav
      class="
        mb-[8px]
        flex flex-col
        items-center
        justify-center
      "
      @mouseout.stop
    >
      <div
        class="
          w-full
          px-[16px]
          sm:px-[32px]
          lg:px-[30px]
          py-[12px]
          lg:py-[18px]
          flex
          justify-between
          bg-[rgba(16,_20,_24,_0.88)]
          backdrop-blur-[4px]
          lg:bg-dark-blue/[0.42]
          lg:backdrop-blur-[6px]
          lg:mb-[8px]
        "
      >
        <DynamicLogo />

        <NavLinks />

        <!-- <Button
          disabled
          with-icon
          variant="nav"
          text="Coming soon"
          class="hidden lg:block !h-[36px]"
        /> -->

        <div />

        <NavMobileMenu />
      </div>

      <NavMenu />
    </nav>
  </header>
</template>
