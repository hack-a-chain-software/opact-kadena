<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string;
    icon: string;
    disabled?: boolean;
  }>(),
  {
    disabled: true,
    text: '',
    icon: ''
  }
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
      sm:w-auto sm:pl-[16px] sm:pr-[16px] sm:space-x-[8px]
      lg:pl-[16px] lg:pr-[16px] lg:space-x-[8px] lg:h-[40px]
      relative
      overflow-hidden
      cursor-not-allowed
    "
    :class="!disabled && 'hover:text-white opact-icon-button group'"
  >
    <Icon :name="icon" class="w-5 h-5 relative z-[1]" />

    <div class="hidden sm:block z-[1]">
      <p
        class="
          text-base
          font-medium
          leading-[24px]
          text-current
          font-title
          lg:text-[14px] lg:font-medium lg:leading-[24px]
          xl:text-base xl:font-medium xl:leading-[24px]
        "
      >
        {{ text }}
      </p>
    </div>

    <Icon
      name="arrow"
      class="
        w-0
        z-[2]
        h-[20px]
        relative
        rotate-[45deg]
        duration-[0.3s]
        translate-y-[-5%]
        md:group-hover:w-[20px]
      "
    />
  </div>
</template>

<style scoped>
.opact-icon-button:hover::after {
  right: -2px;
  transition: right 0.3s ease-out;
}
.opact-icon-button::after {
  left: -40px;
  z-index: 0;
  content: '';
  height: 100%;
  position: absolute;
  bottom: 0;
  top: 0;
  min-width: 40px;
  right: 100%;
  border-radius: 100px;
  background: linear-gradient(
    264.6deg,
    #ad51ff 12.18%,
    #1a92ff 91.42%
  );
}
</style>
