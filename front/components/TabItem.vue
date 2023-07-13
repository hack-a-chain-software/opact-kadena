<script setup lang="ts">
const props = defineProps<{
  chain: string;
  id: string;
  name: string;
  icon: string;
  provider: any;
  disabled: boolean;
}>()

const extension = useExtensions()

// eslint-disable-next-line vue/no-setup-props-destructure
const { account } = props.provider

const { step } = useForm()

const loginCallback = () => {
  step.value = 'message'
}
</script>

<template>
  <button
    :disabled="props.disabled"
    :class="[
      'w-full rounded-xl text-white p-3 text-left',
      'border-[#ffffffcc] border-[1px] flex justify-between items-center space-x-[4px] cursor-default',
      disabled && '!opacity-[0.9] !cursor-not-allowed',
      !account && 'hover:opacity-[0.8] !cursor-pointer ',
    ]"
    @click.prevent="
      extension.login(props.provider, loginCallback)
    "
  >
    <div class="flex items-center">
      <Icon :name="props.icon" class="w-[32px]" />

      <span v-text="props.name" />
    </div>

    <div v-if="props.disabled">
      <span> Disabled </span>
    </div>

    <div
      v-if="account"
      class="flex items-center space-x-[12px]"
    >
      <div>
        <span> Connected </span>
      </div>

      <button
        class="hover:opacity-80"
        @click.prevent.stop="extension.logout()"
      >
        <Icon name="logout" />
      </button>
    </div>
  </button>
</template>
