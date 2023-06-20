<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <LandingSection
    class="
      mb-[40px]
      md:mb-[60px]
      lg:mb-[70px]
      xl:mb-[80px]
      lg:!px-0
    "
  >
    <LandingContainer>
      <template v-slot:tag>
        <span
          class="block mb-[10px] sm:mb-[18px] lg:mb-[18px]"
        >
          Community
        </span>
      </template>

      <template v-slot:title>
        <span
          class="
            block
            mb-[6px]
            lg:max-w-full lg:mb-[10px]
            xl:mb-[6px]
            2xl:max-w-[455px]
          "
        >
          Connect with the Opact
          <span class="hidden md:inline">Wallet</span>
          community
        </span>
      </template>

      <template v-slot:text>
        <span
          class="
            block
            mb-[32px]
            sm:mb-[38px]
            lg:mb-[55px]
            xl:mb-[58px]
          "
        >
          Engage with the Opact Community
        </span>
      </template>

      <template v-slot:cta>
        <div
          class="
            flex
            space-x-[24px]
            lg:space-x-0
            xl:space-x-[24px]
            lg:flex-wrap
            xl:flex-nowrap
          "
        >
          <LandingIconButton
            :to="to"
            :text="title"
            :icon="icon"
            :key="to"
            v-for="{ icon, title, to } in config.community"
          />
        </div>
      </template>
    </LandingContainer>
  </LandingSection>
</template>
