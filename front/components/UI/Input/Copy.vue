<script setup lang="ts">
const { $toaster } = useNuxtApp() as any

const props = withDefaults(
  defineProps<{
    label?: string;
    value?: string;
  }>(),
  {
    value: '',
    label: ''
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
    <div>
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
    </div>

    <div>
      <button
        class="
          p-4
          rounded-[8px]
          bg-gray-700
          flex
          items-center
          justify-between
          gap-4
          w-full
          group
        "
        @click.prevent="copyToClipboard()"
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
            v-text="props.value"
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
