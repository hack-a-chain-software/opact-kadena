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
      lg:rounded-[12px]
      min-h-screen
      lg:min-h-0
    "
  >
    <div>
      <slot />
    </div>

    <div>
      <slot name="footer" />
    </div>
  </div>
</template>
