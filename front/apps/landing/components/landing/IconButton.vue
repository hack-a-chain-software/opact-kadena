<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string,
    icon: string
  }>(),
  {
    text: '',
    icon: '',
  },
)
</script>

<template>
  <div
    class="
      w-10
      h-10
      bg-white
      rounded-full
      flex
      items-center
      justify-center
      text-dark-blue
      sm:w-auto
      sm:pl-[16px]
      sm:pr-[24px]
      sm:space-x-[8px]
      lg:pl-[16px]
      lg:pr-[24px]
      lg:space-x-[8px]
      lg:h-[40px]
    "
  >
    <Icon
      name="discord"
    />

    <div class="hidden sm:block">
      <p
        class="
          text-[16px]
          font-[500]
          leading-[24px]
          text-dark-blue
          font-title
          lg:text-[14px]
          lg:font-[500]
          lg:leading-[24px]
          xl:text-[16px]
          xl:font-[500]
          xl:leading-[24px]
        "
      >
        {{ text }}
      </p>
    </div>
  </div>
</template>
