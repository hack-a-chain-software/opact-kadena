<script setup lang="ts">
interface NavigationItem {
  to: string;
  title: string;
}

const navigation: NavigationItem[] = [
  { title: 'Privacy', to: 'privacy' },
  { title: 'Security', to: 'security' },
  { title: 'Documentation', to: 'documentation' },
  { title: 'Contact', to: 'contact' }
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
        max-w-[1900px]
        sm:px-8
        lg:h-[80px] lg:px-[30px]
        lg:items-center
        xl:items-center
      "
    >
      <LandingLogo />

      <LandingHeaderMenu :navigation="navigation" />

      <LandingHeaderMenuMobile :navigation="navigation" />
    </div>
  </div>
</template>
