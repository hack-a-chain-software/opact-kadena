<template>
  <div class="h-screen flex bg-dark-blue text-white">
    <div class="h-full w-[316px] p-8">
      <Logo class="flex justify-center mb-5" />
    </div>

    <div class="px-[100px] h-full pt-[32px]">
      <slot />
    </div>
  </div>

  <div
    class="
      absolute
      bottom-0
      z-[1]
      left-0
      right-0
      pointer-events-none
    "
  >
    <figure>
      <NuxtImg
        width="1440px"
        src="/footer-bg.png"
        class="h-[400px] w-full"
      />
    </figure>
  </div>
</template>
