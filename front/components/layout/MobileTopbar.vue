<script setup lang="ts">
</script>

<template>
  <div
    class="
      lg:hidden
      h-[60px]
      flex
      justify-between
      items-center
    "
  >
    <div
      class="
        absolute
        top-0
        left-0
        w-full
        flex
        items-end
        justify-center
        h-[138px]
        overflow-visible
        z-[0]
        select-none
        pointer-events-none
      "
    >
      <div
        class="
          w-[328px]
          h-[200px]
          bg-[#7549D1]
          relative
          bottom-[100px]
          rounded-[100%]
          blur-[100px]
        "
      />
    </div>

    <div class="relative z-[1]">
      <img src="/images/logo.png"/>
    </div>

    <div class="relative z-[1]">
      <HomeAccount/>
    </div>
  </div>
</template>
