<template>
  <div class="h-8 p-[1px] rounded-[8px] bg-opact-gradient">
    <div
      class="
        h-full
        text-xs text-white
        px-[12px]
        rounded-[8px]
        bg-dark-blue
        flex
        items-center
        justify-center
        sm:text-[14px]
        sm:font-medium
        sm:leading-[20px]
        sm:tracking-[0.1px]
        sm:px-[16px]
      "
    >
      <slot />
    </div>
  </div>
</template>
