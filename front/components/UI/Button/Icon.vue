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
    @click.prevent="handleClick"
    class="
      flex
      items-center
      justify-center
      h-8
      w-8
      rounded-full
      hover:bg-gray-600
    "
  >
    <div>
      <Icon :name="icon" class="h-6 w-6" />
    </div>
  </button>
</template>
