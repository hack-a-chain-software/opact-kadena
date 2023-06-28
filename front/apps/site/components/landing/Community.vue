<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <Container id="community" class="flex-1">
    <template #tag>
      <span
        class="block mb-[10px] sm:mb-[18px] lg:mb-[18px]"
      >
        Community
      </span>
    </template>

    <template #title>
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

    <template #text>
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

    <template #cta>
      <div
        class="flex gap-[24px] lg:flex-wrap xl:flex-nowrap"
      >
        <IconButton
          v-for="(
            { icon, title, to }, i
          ) in config.networks"
          :key="to"
          v-motion
          :to="to"
          :text="title"
          :icon="icon"
          :initial="{
            opacity: 0,
            x: -15,
            transition: {
              duration: 420,
            },
          }"
          :visible="{
            opacity: 1,
            x: 0,
            transition: {
              duration: 420,
            },
          }"
          :delay="150 * i"
        />
      </div>
    </template>
  </Container>
</template>
