<script setup lang="ts">
const props = defineProps<{
  title: string;
  message?: string;
  type: 'info' | 'error';
}>()

// const {
//   isHovered,
//   isActive,
//   timer,
//   duration,
//   click,
//   close
// } = useNinjaToasterState()

// const { percent, endAt, closeIn } =
//   useNinjaToasterProgress()

const types = {
  info: {
    icon: 'Copy',
    background: 'bg-[#0F326F]'
  },
  success: {
    icon: 'Info',
    background: 'bg-[#1A4633]'
  },
  warning: {
    icon: 'Info',
    background: 'bg-[#675B2E]'
  },
  error: {
    icon: 'Info',
    background: 'bg-[#532227]'
  }
}
</script>

<template>
  <div
    class="rounded-[8px] px-4 py-3 flex w-[440px]"
    :class="[types[props.type].background]"
  >
    <div class="pr-2">
      <Icon
        :name="types[props.type].icon"
        class="w-6 h-6 text-font-1"
      />
    </div>

    <div>
      <span
        v-text="props.title"
        class="text-font-1 text-xs"
      />
    </div>

    <div class="ml-auto">
      <button
        @click="close()"
        class="text-font-1 hover:opacity-80"
      >
        <Icon name="Close" />
      </button>
    </div>
  </div>
</template>
