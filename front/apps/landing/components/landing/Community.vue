<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <LandingContainer
    id="community"
    class="flex-1"
  >
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
          md:max-w-[640px] md:mb-[12px]
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
          gap-[24px]
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
</template>
