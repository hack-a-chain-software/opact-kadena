<script setup lang="ts">
const router = useRouter()

withDefaults(
  defineProps<{
    name: string,
  }>(),
  {
    name: 'Receive'
  }
)
</script>

<template>
  <div
    class="
      lg:hidden
      h-[60px]
      flex
      justify-center
      relative
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

    <UIButtonIcon
      icon="chevronLeft"
      @click.prevent="router.push('/')"
      class="absolute left-0 top-1/2 -translate-y-1/2"
    />

    <div
      class="relative z-[1]"
    >
      <h1
        class="text-font-1 text-xs"
      >
        {{ name }}
      </h1>
    </div>
  </div>
</template>
