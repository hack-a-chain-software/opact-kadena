<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption
} from '@headlessui/vue'

const txTypes = [
  {
    value: 'internal',
    title: 'Opact Wallet',
    subtitle: 'Only create external link'
  },
  {
    value: 'external',
    title: 'Regular Wallet',
    subtitle: 'You can make deposit here'
  }
]

const emit = defineEmits(['selected'])

withDefaults(
  defineProps<{
    selected: any;
  }>(),
  {
    selected: null
  }
)
</script>

<template>
  <div
    class="
      flex flex-col
      items-start
      justify-start
      space-y-4
    "
  >
    <div>
      <span
        class="
          text-font-1
          text-xxs lg:text-xs
          font-[500] lg:font-[400]
          leading-[19.6px] lg:leading-[22.4px]
        "
      >
        Select your receiving method:
      </span>
    </div>

    <div class="mx-auto w-full">
      <RadioGroup
        :modelValue="selected"
        @update:modelValue="emit('selected', $event)"
      >
        <div class="flex gap-4 flex-col lg:flex-row">
          <RadioGroupOption
            v-for="txType in txTypes"
            :key="txType.value"
            v-slot="{ checked }"
            as="template"
            :value="txType.value"
          >
            <div
              :class="[
                checked
                  ? ' !border-blue-400'
                  : 'opacity-50',
              ]"
              class="
                relative
                w-full
                flex
                cursor-pointer
                rounded-lg
                p-4
                focus:outline-none
                bg-gray-800
                border border-transparent
              "
            >
              <div
                class="
                  flex
                  w-full
                  items-center
                  justify-between
                "
              >
                <div class="flex items-center">
                  <div class="flex flex-col space-y-2">
                    <RadioGroupLabel
                      as="p"
                      class="
                        text-font-1
                        text-xs lg:text-sm
                        font-[400] lg:font-[500]
                        leading-[22.4px] lg:leading-[25.2px]
                      "
                    >
                      {{ txType.title }}
                    </RadioGroupLabel>

                    <RadioGroupDescription
                      as="span"
                      class="inline text-font-2 text-xxs"
                    >
                      {{ txType.subtitle }}
                    </RadioGroupDescription>
                  </div>
                </div>

                <div class="shrink-0 text-white">
                  <Icon
                    v-if="!checked"
                    name="Radio"
                    class="h-6 w-6"
                  />

                  <Icon
                    v-else
                    name="RadioActive"
                    class="h-6 w-6 text-blue-400"
                  />
                </div>
              </div>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
  </div>
</template>
