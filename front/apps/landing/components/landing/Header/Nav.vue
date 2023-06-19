<script setup lang="ts">
interface NavigationItem {
  to: string;
  title: string;
}

const navigation: NavigationItem[] = [
  { title: 'Home', to: 'products' },
  { title: 'Privacy', to: 'legalization' },
  { title: 'Security', to: 'procedure' },
  { title: 'Documentation', to: 'forwhom' },
  { title: 'Contact', to: 'comments' }
]
</script>

<template>
  <div
    class="
      fixed
      top-0
      left-0
      right-0
      z-[999]
      bg-[rgba(16,_20,_24,_0.88)]
      backdrop-blur-[4px]
      lg:bg-dark-blue/[0.42] lg:backdrop-blur-[6px]
    "
  >
    <div
      class="
        py-3
        px-4
        mx-auto
        w-screen
        flex
        justify-between
        max-w-[420px]
        sm:max-w-[640px] sm:px-8
        md:max-w-[768px]
        lg:max-w-[1024px]
        lg:h-[64px]
        lg:px-[48px]
        lg:items-center
        xl:max-w-[1280px]
        xl:h-[80px]
        xl:px-[60px]
        xl:items-center
      "
    >
      <LandingLogo />

      <LandingHeaderMenu :navigation="navigation" />

      <LandingHeaderMenuMobile :navigation="navigation" />
    </div>
  </div>
</template>
