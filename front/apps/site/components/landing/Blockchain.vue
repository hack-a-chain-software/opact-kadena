<script setup lang="ts">
defineProps<{
  icon: string;
  name: string;
}>()
</script>

<template>
  <div
    class="
      group
      hover:w-[200px]
      px-[12px]
      max-w-max
      cursor-pointer
      h-[40px]
      w-[40px]
      overflow-hidden
      rounded-full
      flex
      items-center
      border border-white
      sm:h-[48px] sm:w-[48px]
      opact-blockchain
    "
  >
    <Icon
      :name="icon"
      class="
        opact-blockchain__icon
        shrink-0
        w-[24px]
        md:w-[20px] md:h-[20px]
        mr-[8px]
      "
    />

    <span
      class="
        opact-blockchain__text
        w-0
        flex
        max-w-max
        group-hover:w-[78px]
        text-[16px]
        font-[500]
        leading-[24px]
        text-white
        relative
        overflow-hidden
      "
    >
      {{ name }}
    </span>
  </div>
</template>

<style scoped>
.opact-blockchain__text {
  transition: width 0.42s ease-out;
}
.opact-blockchain {
  transition-delay: 0.42s;
}
.opact-blockchain:hover {
  transition-delay: 0s;
}
</style>
