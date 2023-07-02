<script lang="ts" setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/vue'

import { ref, toRefs, watch } from 'vue'
import { BaseRoute } from '~/config'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    title: string;
    subroutes: BaseRoute[];
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
  <Disclosure v-slot="{ open }" as="div">
    <div>
      <DisclosureButton
        type="button"
        @click="toggle"
        class="flex items-center"
      >
        <span
          class="
            text-white
            font-tile
            text-[18px]
            font-[500]
            leading-[150%]
            opacity-[0.8999999761581421]
          "
        >
          {{ title }}
        </span>

        <Icon
          name="chevron"
          class="transition-all ml-[8px] w-4 h-4"
          :class="open && 'rotate-180'"
        />
      </DisclosureButton>
    </div>

    <CollapsibleTransition>
      <div v-show="isOpen" class="px-4 pt-2">
        <DisclosurePanel
          class="
            text-base
            leading-5
            text-gray-100
            grid grid-cols-2
            max-w-[504px]
            gap-y-[16px] gap-x-[24px]
          "
          static
        >
          <div v-for="sub in subroutes" :key="sub.key">
            <span
              class="
                font-title
                text-[16px]
                font-[500]
                leading-[150%]
                opacity-[0.8999999761581421]
              "
            >
              {{ sub.label }}
            </span>
          </div>
        </DisclosurePanel>
      </div>
    </CollapsibleTransition>
  </Disclosure>
</template>
