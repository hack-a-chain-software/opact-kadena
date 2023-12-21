<script setup lang="ts">
defineProps<{
  to: string;
  text: string;
  title: string;
  button: string;
  color?: string;
  figure?: string;
}>()

const figureClasses = {
  hexa: 'bottom-[-45px] right-[-55px] lg:bottom-[-45px] lg:right-[-55px] xl:bottom-[-110px] xl:right-[-70px] 2xl:bottom-[-90px] 2xl:right-[-47px]',
  gear: 'bottom-[-45px] right-[-55px] lg:bottom-[-50px] lg:right-[-70px] xl:bottom-[-95px] xl:right-[-100px] 2xl:bottom-[-90px] 2xl:right-[-47px]',
  square:
    'bottom-[-45px] right-[-55px] lg:bottom-[-61px] lg:right-[-55px] xl:bottom-[-105px] xl:right-[-110px] 2xl:bottom-[-110px] 2xl:right-[-90px]'
} as any

const redirect = (
  path = 'https://tickets.opact.io',
  target = '_blank'
) => window.open(path, target)
</script>

<template>
  <div
    class="
      w-[328px]
      sm:w-[340px]
      lg:w-[285px]
      xl:w-[371px]
      2xl:w-[424px]
    "
  >
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
          pb-8
          flex
          items-end
          z-[4]
        "
      >
        <div
          class="
            absolute
            inset-0
            flex
            items-end
            pointer-events-none
            select-none
          "
        >
          <figure>
            <NuxtImg
              class="w-full h-full"
              :src="`/blog/${color}.webp`"
            />
          </figure>

          <figure
            class="absolute"
            :class="figureClasses[figure as any]"
          >
            <NuxtImg
              class="w-full h-full"
              sizes="1023:284px 1279:272px 1439:340px 2560:344px"
              :src="`/blog/figures/${figure}.png`"
            />
          </figure>
        </div>

        <div class="z-[2]">
          <h3
            class="
              text-white
              font-title
              text-2xl
              leading-normal
              font-semibold
              max-w-[280px]
            "
          >
            {{ title }}
          </h3>
        </div>
      </div>
    </div>

    <div class="pt-[16px] flex flex-col md:px-[20px]">
      <div class="pb-[20px]">
        <p
          class="
            text-[#BDBDBD] text-base
            font-medium
            min-h-[76.78px]
            leading-[120%]
          "
        >
          {{ text }}
        </p>
      </div>

      <div>
        <UIButton
          :text="button"
          @click="redirect(to, '_self')"
          variant="secondary"
        />
      </div>
    </div>
  </div>
</template>
