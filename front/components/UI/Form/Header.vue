<script setup lang="ts">
const emits = defineEmits(['changeStep'])

withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
  }>(),
  {
    title: '',
    subtitle: ''
  }
)

const back = () => {
  emits('changeStep', 'connect')
}
</script>

<template>
  <div
    class="
      w-full
      py-4
      h-[56px]
      flex
      justify-center
      relative
      items-center
      lg:hidden
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
      "
    >
      <div
        class="
          min-w-[328px]
          max-w-[328px] max-h-[200px]
          min-h-[200px]
          bg-[#7549D1]
          relative
          bottom-[108px]
          rounded-[100%]
          blur-[100px]
        "
      />
    </div>

    <button
      class="
        flex
        items-center
        space-x-[4px]
        h-6
        absolute
        top-4
        left-0
        z-[2]
      "
      @click.prevent="back()"
    >
      <Icon name="chevronLeft" class="h-6 w-6" />
    </button>

    <div class="relative z-[2]">
      <h1
        class="text-xs text-font-1 font-medium"
        v-text="title"
      />
    </div>

    <div
      class="
        absolute
        right-0
        top-3
        flex
        justify-center
        z-[2]
      "
    >
      <img src="/mini-logo.svg" class="w-[30px] h-[30px]" />
    </div>
  </div>

  <div class="pt-8 lg:pt-0 flex lg:space-x-4 items-center">
    <UIButtonInline
      icon="chevronLeft"
      class="hidden lg:flex"
      @click.prevent="back()"
    />

    <h2
      class="
        text-font-1 text-md
        font-medium
        lg:text-lg lg:leading-[33.6px] lg:font-[500]
      "
      v-text="subtitle"
    />
  </div>
</template>
