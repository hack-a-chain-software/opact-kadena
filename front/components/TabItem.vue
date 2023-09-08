<script setup lang="ts">
import { useExtensions } from '~/.nuxt/imports'
const props = defineProps<{
  chain?: string;
  name: string;
  icon: string;
  provider: any;
  disabled: boolean;
}>()

const extension = useExtensions()

// eslint-disable-next-line vue/no-setup-props-destructure
const { account } = props.provider

const emit = defineEmits(['connected'])

const loginCallback = () => {
  emit('connected')
}
</script>

<template>
  <button
    :disabled="props.disabled"
    :class="[
      'h-[52px] w-full text-white text-left rounded-[8px] bg-gray-700',
      'flex justify-between items-center space-x-[4px] cursor-default px-4',
      !account && 'hover:opacity-[0.8] !cursor-pointer ',
      account && 'border border-blue-300',
    ]"
    @click.prevent="
      extension.login(props.provider, loginCallback)
    "
  >
    <div class="flex items-center gap-2">
      <Icon :name="props.icon" class="w-9 h-9" />

      <span
        v-text="props.name"
        class="text-xs font-regular text-font-1"
      />
    </div>

    <button
      v-if="account"
      class="text-xxxs text-blue-300"
      @click.prevent="extension.logout()"
    >
      <span> Connected </span>
    </button>
  </button>
</template>
