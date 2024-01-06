<script lang="ts" setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/vue'

import { ref, toRefs, watch } from 'vue'
import CollapseTransition from './CollapseTransition.vue'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    title: string;
    content?: string;
    classes?: {
      wrapper?: string;
      button?: string;
      title?: string;
      panel?: string;
    };
  }>(),
  {
    modelValue: false
  }
)

const emit = defineEmits([
  'update:modelValue',
  'change',
  'toggle',
  'open',
  'close'
])

const { modelValue } = toRefs(props)
const isOpen = ref(modelValue.value)

watch(modelValue, (val) => {
  isOpen.value = val
})

watch(isOpen, (val) => {
  emit('update:modelValue', val)
  emit('change', val)

  if (val) {
    emit('open')
  } else {
    emit('close')
  }
})

function toggle () {
  emit('toggle')
  isOpen.value = !isOpen.value
}
</script>

<template>
  <Disclosure
    v-slot="{ open }"
    as="div"
    class="
      rounded-xxl
      border border-gray-300
      bg-gray-200
      w-full
      h-max
    "
  >
    <div>
      <DisclosureButton
        class="
          p-4
          w-full
          text-left text-green-500 text-base
          leading-4
          h-full
          flex
          items-center
          justify-between
          space-x-2
          md:leading-[18px]
        "
        type="button"
        @click="toggle"
        :class="classes?.button"
      >
        <span :class="classes?.title">
          {{ title }}
        </span>

        <figure class="shrink-0">
          <img
            class="min-w-7"
            src="/svgs/right.svg"
            :class="open ? 'transform rotate-90' : ''"
            alt="Arrow icon indicating opening/closing"
            width="12"
            height="12"
            loading="lazy"
          />
        </figure>
      </DisclosureButton>
    </div>

    <CollapseTransition>
      <div v-show="isOpen" class="px-4 pb-4">
        <DisclosurePanel
          class="
            text-sm
            leading-5
            text-gray-100
            cursor-pointer
          "
          static
          :class="classes?.panel"
          @click="toggle"
        >
          <slot>
            <span v-html="content" />
          </slot>
        </DisclosurePanel>
      </div>
    </CollapseTransition>
  </Disclosure>
</template>
