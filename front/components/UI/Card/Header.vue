<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    withBack?: boolean;
    description?: string;
  }>(),
  {
    title: '',
    description: '',
    withBack: false
  }
)

const emit = defineEmits(['back'])
</script>

<template>
  <div
    class="flex flex-col gap-2"
  >
    <div class="flex items-center space-x-2">
      <div v-if="withBack">
        <UIButtonIcon
          icon="chevronLeft"
          @click.prevent="emit('back')"
        />
      </div>

      <div>
        <h1
          class="
            text-md
            lg:text-lg
            font-[500]
            leading-[19.6px] lg:leading-[33.6px]
            text-font-1
          "
        >
          {{ title }}
        </h1>
      </div>
    </div>

    <div
      v-if="description"
    >
      <span
        class="text-[18px] text-font-2"
      >
        {{ description }}
      </span>
    </div>
  </div>
</template>
