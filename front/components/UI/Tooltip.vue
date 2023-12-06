<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string,
    icon?: string,
    direction?: string,
  }>(),
  {
    direction: '',
    text: 'You can leave the amount blank in case you want the payer to define the payment amount.',
    icon: 'information'
  }
)
</script>

<template>
  <div
    class="group z-[99999] relative"
  >
    <button>
      <Icon
        name="information"
        class="w-6 h-6 text-blue-400"
      />
    </button>

    <div
      class="
        absolute
        hidden
        mt-2
        w-max
        max-w-[320px]
        text-center
        group-hover:flex
        border border-gray-400
        bg-gray-700
        px-4 py-3
        rounded-lg
      "
      :class="direction ? `${direction}-0` : 'left-1/2 -translate-x-1/2'"
    >
      <span
        class="text-xxs text-font-1"
      >
        {{ text }}
      </span>
    </div>
  </div>
</template>
