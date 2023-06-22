<script setup lang="ts">
const config = useAppConfig()

const moveTo = (id: string) => {
  const element = document.getElementById(id)

  if (!element) {
    return
  }

  const bodyRect = document.body.getBoundingClientRect()

  const elemRect = element.getBoundingClientRect()

  const offset = elemRect.top - bodyRect.top

  scrollTo({
    top: offset - 100,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div
    class="hidden lg:flex lg:space-x-[40px] items-center"
  >
    <template
      v-for="item in config.routes"
      :key="item.title"
    >
      <NuxtLink
        class="
          lg:font-[200] lg:text-[16px] lg:leading-[24px]
          font-title
          text-white
          hover:opacity-80
        "
        role="button"
        @click="moveTo(item.to)"
      >
        {{ item.title }}
      </NuxtLink>
    </template>

    <LandingButton
      withIcon
      variant="nav"
      text="Louch App"
      class="!h-[36px]"
    />
  </div>
</template>
