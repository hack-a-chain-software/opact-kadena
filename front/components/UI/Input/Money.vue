<script setup lang="ts">
import { Money3Component } from 'v-money3'
import { moneyConfig } from 'opact-sdk'

const props = withDefaults(
  defineProps<{
    token?: any;
    label?: string;
    placeholder?: string;
    readonly?: boolean;
    hideBalance?: boolean;
    withLabel?: boolean;
    disabled?: boolean;
    balance?: number | string;
    modelValue: string | number;
  }>(),
  {
    label: 'Enter or select amount',
    placeholder: 'ex: 12.0',
    balance: 0,
    token: null,
    readonly: false,
    disabled: false,
    withLabel: true,
    hideBalance: false
  }
)

const emits = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="">
    <div class="flex flex-col">
      <div v-if="withLabel" class="pb-2 lg:pb-4">
        <h2
          class="
            text-font-1
            text-xxs lg:text-xs
            font-medium
          "
          :class="
            props.disabled &&
            'opacity-60 cursor-not-allowed'
          "
        >
          {{ label }}
        </h2>
      </div>

      <div class="flex justify-between items-center">
        <Money3Component
          :max="balance"
          :placeholder="placeholder"
          :readonly="readonly"
          :disabled="props.disabled"
          :model-value="props.modelValue"
          v-bind="moneyConfig"
          :class="
            Number(props.modelValue) <= 0 &&
            'text-[#C6454B]/80'
          "
          class="
            h-[39px]
            bg-transparent
            text-xl
            w-full
            px-0
            font-semibold
            text-font-2
            leading-[140%]
            !outline-none
            !border-none
            focus:ring-0
            disabled:opacity-60 disabled:cursor-not-allowed
          "
          @update:modelValue="
            emits('update:modelValue', $event)
          "
        />
      </div>
    </div>

    <button
      v-if="
        !props.disabled && props.balance && !hideBalance
      "
      :key="props.balance"
      @click.prevent="
        emits('update:modelValue', props.balance)
      "
    >
      <span
        class="text-xxxs hover:underline"
        :class="
          Number(props.balance) > 0
            ? 'text-green-500'
            : 'text-red-500'
        "
        v-text="
          `Balance: ${props.balance} ${
            props?.token?.symbol || ''
          }`
        "
      />
    </button>

    <!-- <TokenAmounts
      :disabled="props.disabled"
      @selected="emits('update:modelValue', $event)"
    /> -->
  </div>
</template>
