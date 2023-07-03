<script setup lang="ts"></script>

<template>
  <div
    class="
      pt-[170px]
      sm:pt-[235px]
      lg:pt-[203px]
      xl:pt-[261px]
      h-[595px]
      sm:h-[880px]
      w-full
      overflow-x-clip
      relative
    "
  >
    <SiteFigureHero />

    <div
      v-motion-pop-visible-once
      class="text-white max-w-[1096px] mx-auto text-center"
    >
      <div
        class="
          mx-auto
          px-4
          sm:px-0
          lg:max-w-[867px]
          xl:max-w-full
          mb-[24px]
          text-center
        "
      >
        <h1
          class="
            font-title
            text-[32px]
            font-[700]
            leading-[130%]
            tracking-[0.64px]
            sm:text-[52px] sm:leading-[180%]
            lg:text-[60px]
          "
        >
          Zero Knowledge for enhanced privacy and compliance
          on-chain
        </h1>
      </div>

      <div
        class="
          px-4
          sm:px-0
          mx-auto
          max-w-[568px]
          lg:max-w-full
          mb-[36px]
          sm:mb-[48px]
          xl:mb-[22px]
        "
      >
        <h2
          class="
            mx-auto
            max-w-[290px]
            sm:max-w-full
            font-[400]
            text-[16px]
            leading-[150%]
            sm:font-[500] sm:text-[20px]
            lg:text-[24px]
          "
        >
          Try out our ZK products or implement cutting edge
          ZK tech for your business.
        </h2>
      </div>

      <div>
        <Button
          variant="hero-secondary"
          text="Meet our solutions"
        />
      </div>
    </div>
  </div>
</template>
