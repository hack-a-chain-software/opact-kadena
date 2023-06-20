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
  background-color: #060A0F;
}
</style>
