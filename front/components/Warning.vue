<script setup lang="ts">
withDefaults(
  defineProps<{
    desc?: string
    type: string;
    label: string;
  }>(),
  {
    desc: '',
    type: 'error'
  }
)

const types = {
  error: {
    border: 'border-[#C6454B]',
    background: 'bg-[#251319]'
  },
  warning: {
    border: 'border-[#F8D45C]',
    background: 'bg-[#2D2A1C]'
  }
}
</script>

<template>
  <div
    class="px-4 py-2 border rounded-[8px] relative z-[0]"
    :class="[types[type].border, types[type].background]"
  >
    <div>
      <span
        v-text="label"
        class="text-font-1 text-xxs font-[600]"
      />
    </div>

    <div
      v-if="desc"
    >
      <span
        v-text="desc"
        class="text-font-1 text-xxs font-[500]"
      />
    </div>
  </div>
</template>
