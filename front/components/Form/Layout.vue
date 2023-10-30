<template>
  <div
    class="
      text-white
      max-w-[450px]
      lg:max-w-[500px]
      lg:h-auto
      lg:p-6
      lg:bg-gray-900
      lg:w-[546px]
      lg:mt-[150px]
      lg:border-2
      lg:border-gray-600
      mx-auto
      lg:rounded-[12px]
      min-h-screen
      lg:min-h-0
      h-full
    "
  >
    <div
      class="h-full flex flex-col"
    >
      <slot />
    </div>
  </div>
</template>
