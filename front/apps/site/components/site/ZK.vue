<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <Section
    class="
      pt-20
      sm:pt-[130px]
      lg:pt-[140px]
      flex flex-col
      justify-center
      items-center
    "
  >
    <div class="pb-4">
      <h2
        class="
          text-[#FAFAFA]
          font-title
          text-3xl
          font-semibold
          leading-[120%]
          sm:text-[54px]
        "
      >
        ZK Tooling
      </h2>
    </div>

    <div class="pb-10 sm:pb-[60px] text-center">
      <h3
        class="
          text-white text-lg
          font-normal
          leading-normal
          sm:text-[22px] sm:font-medium
        "
      >
        Easy to use SDKs for zero knowledge implementation
      </h3>
    </div>

    <div
      class="
        w-full
        flex flex-wrap
        items-center
        flex-col
        md:items-start md:flex-row md:justify-between
        lg:flex-nowrap
        gap-6
      "
    >
      <BlogCard
        v-for="(blog, i) in config.blog.posts"
        v-bind="blog"
        :key="`blog:post:id:${i}`"
      />
    </div>
  </Section>
</template>
