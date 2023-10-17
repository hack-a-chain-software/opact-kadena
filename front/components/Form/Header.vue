<script setup lang="ts">
const emits = defineEmits(['changeStep'])

withDefaults(
  defineProps<{
    title?: string;
    subtitle: string;
  }>(),
  {
    title: ''
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
      flex
      justify-center
      relative
      items-center
      lg:hidden
    "
  >
    <button
      class="
        flex
        items-center
        space-x-[4px]
        h-6
        absolute
        top-4
        left-0
      "
      @click.prevent="back()"
    >
      <Icon name="chevronLeft" class="h-6 w-6" />
    </button>

    <div>
      <h1
        class="text-xs text-font-1 font-medium"
        v-text="title"
      />
    </div>
  </div>

  <div class="pt-8 lg:pt-0 flex lg:space-x-4 items-center">
    <ButtonIcon
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
