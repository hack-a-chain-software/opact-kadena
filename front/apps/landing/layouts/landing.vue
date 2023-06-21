<template>
  <div>
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
  width: 8px !important;
}

body::-webkit-scrollbar-thumb {
  border-radius: 20px !important;
  background-color: #202327CC !important;
  -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5) !important;
}
</style>
