<script setup lang="ts">
interface NavigationItem {
  to: string;
  title: string;
}

const navigation: NavigationItem[] = [
  { title: 'Home', to: 'products' },
  { title: 'Documentation', to: 'forwhom' },
  { title: 'Privacy', to: 'legalization' },
  { title: 'Contact', to: 'comments' },
  { title: 'Security', to: 'procedure' }
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
      bg-dark-blue
    "
  >
    <div
      class="
        py-3
        px-4
        mx-auto
        w-screen
        flex
        max-w-[420px]
        justify-between

        sm:max-w-[640px]
        sm:px-8

        md:max-w-[768px]
      "
    >
      <LandingLogo />

      <LandingHeaderMenuMobile :navigation="navigation" />
    </div>
  </div>
</template>
