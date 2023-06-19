<script setup lang="ts">

interface NavigationItem {
  to: string;
  title: string;
}

defineProps<{
  navigation: NavigationItem[];
}>()

const moveTo = (id: string) => {
  const element = document.getElementById(id)

  if (!element) {
    return
  }

  const bodyRect = document.body.getBoundingClientRect()

  const elemRect = element.getBoundingClientRect()

  const offset = elemRect.top - bodyRect.top

  scrollTo({
    top: offset - 74,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div
    class="hidden lg:flex lg:space-x-[26px] xl:space-x-[38px] items-center"
  >
    <template
      v-for="item in navigation"
      :key="item.title"
    >
      <NuxtLink
        class="
          xl:font-[400]
          xl:text-[16px]
          xl:leading-[24px]
          font-title
          text-white

          lg:font-[400]
          lg:text-[14px]
        "
        role="button"
        @click="moveTo(item.to)"
      >
        {{ item.title }}
      </NuxtLink>
    </template>

    <LandingButton
      withIcon
      text="Louch App"
    />

    <!-- <div
      class="lg:w-[122px] lg:h-[28px] xl:h-[32px] xl:w-[156px] bg-white rounded-full flex items-center justify-center"
    >
      <span> Louch App </span>
    </div> -->
  </div>
</template>
