<template>
  <div class="absolute left-0 top-0 w-full z-[1]">
    <div
      class="
        py-3
        px-4
        mx-auto
        w-full
        flex
        justify-between
        max-w-[1900px]
        sm:px-8
        lg:h-[80px] lg:px-[30px] lg:items-center
        xl:items-center
      "
    >
      <DynamicLogo />

      <HeaderMenu />

      <HeaderMenuMobile />
    </div>
  </div>
</template>
