<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <Section
    class="
      pt-[80px]
      sm:pt-[130px]
      lg:pt-[140px]
      flex flex-col
      justify-center
      items-center
    "
  >
    <div class="pb-[16px]">
      <h2
        class="
          text-[#FAFAFA]
          font-title
          text-[30px]
          font-[600]
          leading-[120%]
          sm:font-title
          sm:text-[54px]
          sm:font-[600]
          sm:leading-[120%]
        "
      >
        ZK Tooling
      </h2>
    </div>

    <div class="pb-[40px] sm:pb-[60px] text-center">
      <h3
        class="
          text-white text-[18px]
          font-[400]
          leading-[150%]
          sm:text-[22px] sm:font-[500] sm:leading-[150%]
        "
      >
        Easy to use SDKs for zero knowledge implementation
      </h3>
    </div>

    <div
      class="
        w-full
        flex
        flex-wrap
        items-center
        flex-col
        md:items-start
        md:flex-row
        md:justify-between
        lg:flex-nowrap
        gap-[24px]
      "
    >
      <Card
        v-for="(blog, i) in config.blog.posts"
        v-bind="blog"
        :key="`blog:post:id:${i}`"
      />
    </div>
  </Section>
</template>
