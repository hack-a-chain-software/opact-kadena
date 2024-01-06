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
    class="px-4 py-3 bg-gray-800 rounded-[12px]"
  >
    <DisclosureButton
      class="w-full flex justify-between items-center"
      type="button"
      @click="toggle"
    >
      <span
        :class="classes?.title"
        class="text-xxs font-medium text-font-1"
      >
        {{ title }}
      </span>

      <Icon
        name="chevron"
        class="w-6 h-6 transition-all"
        :class="open ? 'transform rotate-180' : ''"
      />
    </DisclosureButton>

    <CollapseTransition>
      <div v-show="isOpen" class="pt-4">
        <DisclosurePanel
          class="
            text-base
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
