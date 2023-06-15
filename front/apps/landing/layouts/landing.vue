<template>
  <div
    class="flex-1 bg-dark-blue"
  >
    <header>
      <LandingHeaderNav />

      <LandingHeaderHero />
    </header>
    <slot />

    <LandingFooter />
  </div>
</template>
