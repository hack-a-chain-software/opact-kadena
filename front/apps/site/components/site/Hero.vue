<script setup lang="ts"></script>

<template>
  <div class="pt-[203px] xl:pt-[261px] h-[880px]">
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
          lg:max-w-[867px]
          xl:max-w-full
          mb-[24px]
          text-center
        "
      >
        <h1
          class="
            text-[60px]
            font-title font-[700]
            leading-[180%]
          "
        >
          Zero Knowledge for enhanced privacy and compliance
          on-chain
        </h1>
      </div>

      <div class="mb-[48px] xl:mb-[22px]">
        <h2 class="font-[500] text-[24px] leading-[150%]">
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
