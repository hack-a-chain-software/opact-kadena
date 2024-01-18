<script setup lang="ts">
import { reactive } from 'vue'

const props = defineProps<{
  chain?: string;
  name: string;
  icon: string;
  provider: any;
  disabled: boolean;
  isConnected?: any;
  isInstalled?: any;
  isCorrectNetwork?: any;
}>()

const data = reactive({
  enabled: true,
  correctNetwork: true
})

const extension = useExtensions()

const account = null

const emit = defineEmits(['connected'])

const loginCallback = () => {
  emit('connected')
}

watch(
  () => [props.isInstalled, props.isCorrectNetwork],
  async ([checkIsInstalled, checkNetwork]) => {
    if (!checkNetwork || !checkIsInstalled) {
      return
    }

    data.enabled = checkIsInstalled()
    data.correctNetwork = await checkNetwork()
  },
  { immediate: true }
)
</script>

<template>
  <button
    :disabled="props.disabled || !data.enabled || !data.correctNetwork"
    :class="[
      'h-[72px] w-full text-white text-left rounded-[8px] bg-gray-700 relative',
      'flex justify-between items-center space-x-3 cursor-default p-4 disabled:opacity-[0.7] disabled:!cursor-not-allowed',
      !account && 'hover:opacity-[0.8] cursor-pointer',
      account && 'border border-blue-300',
    ]"
    @click.prevent="
      extension.login(props.provider, loginCallback)
    "
  >
    <div class="flex items-center gap-3">
      <img :src="props.icon" class="w-8 h-8" />

      <span
        v-text="props.name"
        class="text-sm font-[500] font-regular text-font-1"
      />
    </div>

    <span
      v-if="!data.enabled || !data.correctNetwork"
      class="text-white absolute top-4.5 right-12 text-xs lg:text-xs font-[400] leading-[140%] opacity-[0.5] z-[9999]"
    >
      Not available
    </span>

    <Icon
      name="chevron"
      class="w-5 h-5 rotate-[-90deg] text-font-2"
    />
  </button>
</template>
