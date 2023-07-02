<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <Section
    class="
      pt-[140px]
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
          text-[54px]
          font-[600]
          leading-[120%]
        "
      >
        ZK Tooling
      </h2>
    </div>

    <div class="pb-[60px]">
      <h3
        class="
          text-white text-[22px]
          font-[500]
          leading-[150%]
        "
      >
        Easy to use SDKs for zero knowledge implementation
      </h3>
    </div>

    <div class="w-full flex justify-between">
      <Card
        v-for="(blog, i) in config.blog.posts"
        v-bind="blog"
        :key="`blog:post:id:${i}`"
      />
    </div>
  </Section>
</template>
