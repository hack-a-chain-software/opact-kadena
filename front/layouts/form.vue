<template>
  <div
    class="
      bg-dark-blue
      h-screen
      flex flex-col
      justify-between
    "
  >
    <div class="px-4 h-full overflow-x-clip">
      <slot />
    </div>
  </div>
</template>

<style>
body {
  background-color: #060a0f;
}
</style>
