<template>
  <header
    class="left-0 top-0 w-full z-[10] pb-10 absolute"
    @mouseout="toggleMenuDropdown()"
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
          px-4
          mb-[8px]
          mx-auto
          w-full
          flex
          justify-between
          max-w-[1900px]
          sm:px-8
          lg:h-[80px] lg:px-[30px] lg:items-center
          xl:items-center
          bg-[rgba(16,_20,_24,_0.88)]
          backdrop-blur-[4px]
          lg:bg-dark-blue/[0.42] lg:backdrop-blur-[6px]
        "
      >
        <DynamicLogo />

        <HeaderMenu />

        <Button
          with-icon
          variant="nav"
          text="Lauch App"
          class="!h-[36px]"
        />
      </div>

      <HeaderDropdown />
    </nav>
  </header>
</template>
