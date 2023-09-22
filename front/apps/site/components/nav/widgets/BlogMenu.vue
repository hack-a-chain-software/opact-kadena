<script setup lang="ts">
const config = useAppConfig()

const articles: any[] = [
  {
    image: '/zk-solution.png',
    title: 'Zero Knowledge as a solution for blockchain performance',
    src: 'https://blog.opact.io/zero-knowledge-as-a-solution-for-blockchain-performance/'
  },
  {
    image: '/zk-everybody.png',
    title: 'Zero Knowledge: Why is Everybody So Excited About It?',
    src: 'https://blog.opact.io/zero-knowledge-why-is-everybody-so-excited-about-it/'
  },
  {
    image: '/opact-shaping.png',
    title: 'Opact: shaping the future of blockchain with zero-knowledge technology',
    src: 'https://blog.opact.io/opact-reshaping-the-future-of-blockchain-with-zero-knowledge-technology/'
  },
  {
    image: '/zk-privacy.png',
    title: 'Zero Knowledge as a solution for on-chain privacy',
    src: 'https://blog.opact.io/zero-knowledge-as-a-solution-for-privacy-on-chain/'
  }
]
</script>

<template>
  <div
    class="
      flex
      w-[868px]
      h-[317px]
      px-[30px]
      py-[16px]
      flex-col
      space-y-[24px]
    "
  >
    <div class="grid grid-cols-2 gap-6">
      <NuxtLink
        v-for="({ src, title }, n) in articles"
        :key="'blog-post-n-' + n"
        :to="src"
        target="_blank"
        class="flex w-full h-[104px] overflow-hidden p-3 space-x-[16px]"
      >
        <div
          class="rounded-[8px] h-[80px] min-w-[120px] bg-[#072540] flex items-center justify-center"
        >
          <img
            src="/mini-logo.svg"
            class="h-12"
          >
        </div>

        <div
          class="space-y-[8px] flex flex-col justify-center"
        >
          <h3
            class="
              font-[700]
              text-[14px]
              text-[#BDBDBD]
              leading-[120%]
            "
          >
            Article
          </h3>

          <h2
            class="
              font-[500]
              text-[16px]
              text-white
              leading-[120%]
            "
            v-text="title"
          />
        </div>
      </NuxtLink>
    </div>

    <div class="flex space-x-[24px]">
      <NuxtLink
        target="_blank"
        :to="config.blog.ctaTo"
        class="cursor-pointer hover:opacity-[0.8] space-x-[8px] text-[#BDBDBD]"
      >
        <span
          class="font-title text-[14px] font-500 leading-[150%]"
        > Blog </span>

        <Icon name="arrow" class="w-[18px] h-[18px]" />
      </NuxtLink>

      <div
        class="h-full w-[1px] bg-[#BDBDBD]"
      />

      <NuxtLink
        target="_blank"
        :to="config.blog.ctaTo"
        class="cursor-pointer text-[#BDBDBD] hover:opacity-[0.8] space-x-[8px]"
      >
        <span
          class="font-title text-[14px] font-500 leading-[150%]"
        > Documentation </span>

        <Icon name="arrow" class="w-[18px] h-[18px]" />
      </NuxtLink>
    </div>
  </div>
</template>
