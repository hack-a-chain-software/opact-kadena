<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <Section
    class="
      pt-[80px]
      md:pt-[130px]
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
          md:font-title
          md:text-[54px]
          md:font-[600]
          md:leading-[120%]
        "
      >
        ZK Tooling
      </h2>
    </div>

    <div class="pb-[40px] md:pb-[60px] text-center">
      <h3
        class="
          text-white text-[18px]
          font-[400]
          leading-[150%]
          md:text-[22px] md:font-[500] md:leading-[150%]
        "
      >
        Easy to use SDKs for zero knowledge implementation
      </h3>
    </div>

    <div
      class="
        w-full
        flex
        justify-between
        flex-wrap
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
