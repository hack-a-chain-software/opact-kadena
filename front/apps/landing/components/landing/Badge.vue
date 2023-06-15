<template>
  <div
    class="
      h-[32px]
      p-[1px]
      rounded-[8px]
      bg-opact-gradient
    "
  >
    <div
      class="
        h-full
        text-xs text-white
        px-[12px]
        rounded-[8px]
        bg-dark-blue
        flex items-center justify-center
      "
    >
      <slot />
    </div>
  </div>
</template>
