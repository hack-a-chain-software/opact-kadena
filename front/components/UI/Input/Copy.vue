<script setup lang="ts">
const { $toaster } = useNuxtApp() as any

const props = withDefaults(
  defineProps<{
    label?: string;
    value?: string;
    placeholder?: string;
    tooltipText?: string;
    bg?: string;
    border?: string;
  }>(),
  {
    value: '',
    label: '',
    tooltipText: '',
    placeholder: '',
    bg: 'bg-gray-700',
    border: 'border-transparent'
  }
)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.value)

    $toaster.info({
      type: 'info',
      title: 'Address Copied'
    })
  } catch (e) {
    console.warn(e)
  }
}
</script>

<template>
  <div class="ozk-address flex flex-col space-y-2 lg:space-y-4">
    <div
      v-if="label"
      class="flex items-center gap-2"
    >
      <h2
        class="
          text-font-1
          leading-[19.6px] lg:leading-[22.4px]
          text-xxs lg:text-xs
          font-[500] lg:font-[400]
        "
      >
        {{ props.label }}
      </h2>

      <UITooltip
        v-if="props.tooltipText"
        :text="props.tooltipText"
      />
    </div>

    <div>
      <button
        class="
          p-4
          rounded-[8px]
          flex
          items-center
          justify-between
          gap-4
          w-full
          group
          border
        "
        @click.prevent="copyToClipboard()"
        :class="[props.bg, props.border]"
      >
        <div
          class="
            w-[calc(100%-40px)]
            text-left
            truncate
            text-white
          "
        >
          <span
            class="
              text-xxs lg:text-xs text-font-1
              truncate font-[500] lg:font-[400]
              group-active:text-blue-400
            "
            v-text="props.placeholder || props.value"
          />
        </div>

        <div
          class="
            w-6
            h-6
            text-font-1
            group-active:text-blue-400
          "
        >
          <Icon name="copy" class="w-6 h-6" />
        </div>
      </button>
    </div>
  </div>
</template>
