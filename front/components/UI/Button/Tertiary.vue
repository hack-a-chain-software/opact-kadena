<script lang="ts" setup>
withDefaults(
  defineProps<{
    label?: string;
    disabled?: boolean;
  }>(),
  {
    label: '',
    disabled: false
  }
)

const emit = defineEmits(['click'])

const handleClick = (event: any) => {
  emit('click', event)
}
</script>

<template>
  <button
    :disabled="disabled"
    class="
      ozk-button-action
      py-4 lg:py-3
      px-4
      text-font-1
      bg-gray-700
      rounded-lg
      gap-2
      w-full
      hover:opacity-[0.8]
      flex
      relative
      group
      items-center
      justify-between
      disabled:opacity-[0.7]
      disabled:cursor-not-allowed
    "
    @click.prevent="handleClick"
  >
    <span
      v-text="label"
      class="text-xs lg:text-sm font-[500] leading-[140%]"
    />

    <Icon name="chevron" class="rotate-[-90deg] w-4 h-4" />

    <span
      v-if="disabled"
      class="group-hover:visible invisible absolute top-2.5 right-12 text-xs lg:text-sm font-[500] leading-[140%] opacity-[0.5]"
    >
      coming soon
    </span>
  </button>
</template>

<style scoped>
.ozk-button {
  background-size: 300% 100%;
  transition: all 0.4s ease-in-out;
}

.ozk-button:hover {
  background-position: 100% 0;
}
</style>
