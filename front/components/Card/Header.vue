<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    withBack?: boolean;
  }>(),
  {
    title: '',
    withBack: false
  }
)

const emit = defineEmits(['back'])
</script>

<template>
  <div class="flex items-center space-x-2">
    <div v-if="withBack">
      <ButtonIcon
        icon="chevronLeft"
        @click.prevent="emit('back')"
      />
    </div>

    <div>
      <h1
        class="
          text-lg
          font-[500]
          leading-[33.6px]
          text-font-1
        "
      >
        {{ title }}
      </h1>
    </div>
  </div>
</template>
