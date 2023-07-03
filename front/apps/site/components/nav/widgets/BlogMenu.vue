<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <div
    class="
      flex
      w-[800px]
      h-[232]
      px-[30px]
      py-5
      flex-col
      space-y-[12px]
    "
  >
    <div class="flex justify-between">
      <div
        v-for="n in 3"
        :key="'blog-post-n-' + n"
        class="flex flex-col max-w-[230px]"
      >
        <div
          class="
            px-[20px]
            py-[12px]
            bg-card-gradient
            rounded-lg
          "
        >
          <h2 class="mb-[16px]">Near ZK tools</h2>

          <div class="mb-[12px]">
            <p
              class="
                text-[#BDBDBD] text-[16px]
                font-[500]
                leading-[120%]
              "
            >
              The first and only ZK infrastructure to ever
              go to NEAR Mainnet is now available to you.
            </p>
          </div>

          <div>
            <Button
              variant="secondary"
              text="know the tools"
              to="https://opact.ghost.io/opact-reshaping-the-future-of-blockchain-with-zero-knowledge-technology/"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <a target="_blank" :href="config.blog.ctaTo" class="ml-auto cursor-pointer hover:opacity-[0.8]">
        <span> Learn about ZK for free on our blog </span>

        <Icon name="arrow" />
      </a>
    </div>
  </div>
</template>
