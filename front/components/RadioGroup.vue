<script setup>
import { ref } from 'vue'
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption
} from '@headlessui/vue'

const plans = [
  {
    title: 'Secure Passphrase',
    text: 'Generate and safely store a unique passphrase.'
  },
  {
    disabled: true,
    title: 'Ledger Hardware Wallet',
    text: 'Secure your account with a Ledger hardware device.'
  }
]

const selected = ref(plans[0])
</script>

<template>
  <RadioGroup v-model="selected">
    <RadioGroupLabel
class="sr-only"
      >Server size</RadioGroupLabel
    >
    <div class="space-y-[10px]">
      <RadioGroupOption
        as="template"
        v-for="plan in plans"
        :key="plan.name"
        :value="plan"
        :disabled="plan.disabled"
        v-slot="{ active, checked, disabled }"
      >
        <div
          :class="[
            active
              ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
              : '',
            checked
              ? 'bg-white'
              : 'bg-inverted-card-gradient',
            disabled && '!cursor-not-allowed opacity-80',
          ]"
          class="
            relative
            flex
            cursor-pointer
            rounded-lg
            px-5
            py-4
            shadow-md
            focus:outline-none
          "
        >
          <div
            class="flex w-full items-center justify-between"
          >
            <div class="flex items-center">
              <div class="text-sm">
                <RadioGroupLabel
                  as="p"
                  :class="
                    checked
                      ? 'text-dark-blue'
                      : 'text-white'
                  "
                  class="
                    font-title
                    text-lg
                    leading-normal
                    font-semibold
                    max-w-[280px]
                  "
                >
                  {{ plan.title }}
                </RadioGroupLabel>

                <RadioGroupDescription
                  as="span"
                  :class="
                    checked
                      ? 'text-dark-blue'
                      : 'text-[#BDBDBD]'
                  "
                  class="inline"
                >
                  {{ plan.text }}
                </RadioGroupDescription>
              </div>
            </div>
            <div
              v-show="checked"
              class="shrink-0 text-dark-blue"
            >
              <svg
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="12"
                  fill="#060A0F"
                  fill-opacity="0.2"
                />
                <path
                  d="M7 13l3 3 7-7"
                  stroke="#060A0F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
