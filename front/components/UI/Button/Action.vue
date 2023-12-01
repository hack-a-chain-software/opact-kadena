<script lang="ts" setup>
withDefaults(
  defineProps<{
    icon?: string;
    label?: string;
    disabled?: boolean;
  }>(),
  {
    icon: '',
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
      py-3.5
      px-6
      text-font-1
      bg-gray-800
      rounded-lg
      gap-2
      w-full
      hover:opacity-[0.8]
      flex
      items-center
      justify-center
    "
    @click.prevent="handleClick"
  >
    <Icon :name="icon" class="w-6 h-6" />

    <span
      v-text="label"
      class="text-xs font-[500] leading-[140%]"
    />
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
