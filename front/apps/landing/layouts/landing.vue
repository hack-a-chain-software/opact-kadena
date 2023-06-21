<template>
  <div class="scrollbar scrollbar-thumb-red-600 scrollbar-track-red-600">
    <header>
      <LandingHeaderNav />

      <LandingHeaderHero />
    </header>
    <slot />

    <LandingFooter />
  </div>
</template>

<style>
body {
  background-color: #060a0f;
}

body::-webkit-scrollbar {
  -webkit-appearance: none !important;
  width: 4px !important;
}

body::-webkit-scrollbar-thumb {
  border-radius: 4px !important;
  background-color: rgba(250,250,250,.2) !important;
  -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5) !important;
}
</style>
