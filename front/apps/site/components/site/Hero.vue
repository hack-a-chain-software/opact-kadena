<script setup lang="ts"></script>

<template>
  <div class="pt-[170px] md:pt-[235px] lg:pt-[203px] xl:pt-[261px] h-[595px] md:h-[880px]">
    <NuxtImg
      src="/site-bg.png"
      class="
        absolute
        top-0
        left-1/2
        z-[-1]
        w-[1364px]
        h-[880px]
        -translate-x-1/2
      "
    />

    <div
      v-motion-pop-visible-once
      class="text-white max-w-[1096px] mx-auto text-center"
    >
      <div
        class="
          mx-auto
          px-4
          md:px-0
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

            md:text-[52px]
            md:font-[700]
            md:leading-[180%]

            lg:text-[60px]
            lg:font-[700]
            lg:leading-[180%]
          "
        >
          Zero Knowledge for enhanced privacy and compliance
          on-chain
        </h1>
      </div>

      <div class="px-4 md:px-0 mx-auto max-w-[568px] lg:max-w-full mb-[36px] md:mb-[48px] xl:mb-[22px]">
        <h2 class="mx-auto max-w-[290px] md:max-w-full font-[400] text-[16px] leading-[150%] md:font-[500] md:text-[20px] md:leading-[150%] lg:font-[500] lg:text-[24px] lg:leading-[150%]">
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
