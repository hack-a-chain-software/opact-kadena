<script setup lang="ts">
defineProps<{
  title: string;
  text: string;
  button: string;
  color?: string;
  figure?: string;
}>()

const figureClasses = {
  hexa: 'lg:bottom-[-45px] lg:right-[-55px] xl:bottom-[-110px] xl:right-[-70px] 2xl:bottom-[-90px] 2xl:right-[-47px]',
  gear: 'lg:bottom-[-50px] lg:right-[-70px] xl:bottom-[-95px] xl:right-[-100px] 2xl:bottom-[-90px] 2xl:right-[-47px]',
  square:
    'lg:bottom-[-61px] lg:right-[-55px] xl:bottom-[-120px] xl:right-[-135px] 2xl:bottom-[-110px] 2xl:right-[-90px]'
} as any
</script>

<template>
  <div class="lg:w-[285px] xl:w-[371px] 2xl:w-[424px]">
    <div
      class="
        p-[2px]
        rounded-xl
        bg-card-gradient
        h-[244px]
        relative
        overflow-hidden
      "
    >
      <div
        class="
          bg-inverted-card-gradient
          rounded-xl
          h-full
          w-full
          px-[20px]
          pb-[32px]
          flex
          items-end
          z-[4]
        "
      >
        <div class="absolute inset-0 flex items-end">
          <figure>
            <NuxtImg
              class="w-full h-full"
              :src="`/blog/${color}.png`"
            />
          </figure>

          <figure
            class="absolute"
            :class="figureClasses[figure as any]"
          >
            <NuxtImg
              class="w-full h-full"
              sizes="lg:272px xl:312px 2xl:344px"
              :src="`/blog/figures/${figure}.png`"
            />
          </figure>
        </div>

        <div class="z-[2]">
          <h3
            class="
              text-white
              font-title
              text-[24px]
              leading-[150%]
              font-[600]
              max-w-[280px]
            "
          >
            {{ title }}
          </h3>
        </div>
      </div>
    </div>

    <div class="pt-[16px] flex flex-col px-[20px]">
      <div class="pb-[20px]">
        <p
          class="
            text-[#BDBDBD] text-[16px]
            font-[500]
            leading-[120%]
          "
        >
          {{ text }}
        </p>
      </div>

      <div>
        <Button :text="button" variant="secondary" />
      </div>
    </div>
  </div>
</template>
