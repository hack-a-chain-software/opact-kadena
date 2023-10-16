<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    icon?: string;
    label?: string;
    loading?: boolean;
    disabled?: boolean;
  }>(),
  {
    icon: '',
    label: '',
    loading: false,
    disabled: false
  }
)

const emit = defineEmits(['click'])

const handleClick = (event: any) => {
  if (props.loading) {
    return
  }

  emit('click', event)
}
</script>

<template>
  <button
    :disabled="disabled"
    class="
      ozk-button
      w-full
      flex
      items-center
      justify-center
      group
      px-4
      py-[15px]
      rounded-[12px]
      relative
      bg-transparent
      hover:opacity-80
      border-[2px] border-gray-600
      disabled:cursor-not-allowed
      active:bg-blue-gradient-2
    "
    @click.prevent="handleClick"
  >
    <div>
      <span
        v-text="label"
        class="
          text-font-1 text-sm
          font-[500]
          leading-[140%]
        "
      />
    </div>

    <div v-if="icon" class="absolute right-5">
      <Icon :name="icon" class="w-6 h-6" />
    </div>

    <div v-if="loading" class="absolute right-5">
      <Icon
        name="spinner"
        class="w-6 h-6 animate-spin text-white"
      />
    </div>
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
