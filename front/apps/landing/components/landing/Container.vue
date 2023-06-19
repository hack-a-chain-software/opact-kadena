<template>
  <div class="p-[2px] rounded-[12px] bg-card-gradient">
    <div
      class="
        rounded-[12px]
        relative
        bg-inverted-card-gradient
        overflow-hidden
        px-[16px]
        pt-[24px]
        pb-[22px]
        md:pb-[42px] md:px-[40px] md:pt-[48px]

        lg:pt-[40px]
        lg:pb-[40px]
        lg:px-[30px]

        xl:pt-[52px]
        xl:pb-[56px]
        xl:px-[40px]
      "
    >
      <slot />
    </div>
  </div>
</template>
