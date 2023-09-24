<script lang="ts" setup>
const router = useRouter()
</script>

<template>
  <div
    class="
      bg-dark-blue
      h-screen
      flex flex-col
      justify-between
      relative
      overflow-hidden
      lg:overflow-auto
      lg:min-h-screen
      lg:h-auto
      lg:justify-start
      lg:gap-[48px]
      lg:pb-[80px]
    "
  >
    <div
      class="
        min-h-[64px]
        px-[76px]
        items-center
        bg-[rgba(6,_10,_15,_0.80)]
        z-[12]
        hidden
        lg:flex
      "
    >
      <button
        @click.prevent="router.push('/app')"
      >
        <Icon
          name="logo"
          class="text-white w-[163px] h-[32px]"
        />
      </button>
    </div>

    <div
      class="absolute z-[0] w-full hidden lg:block min-w-[1920px] select-none"
    >
      <img
        src="/bg-app.png"
        class="w-full w-full"
      >
    </div>

    <div class="px-4 lg:px-0 h-full overflow-x-clip relative z-[2]">
      <slot />
    </div>
  </div>
</template>

<style>
body {
  background-color: #060a0f;
}
</style>
