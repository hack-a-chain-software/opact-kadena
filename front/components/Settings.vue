<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'

const wallet = useWalletStore()
const { account } = storeToRefs(wallet)

withDefaults(
  defineProps<{
    show: boolean;
  }>(),
  {
    show: false
  }
)

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

const logout = () => {
  wallet.logout()
}
</script>

<template>
  <UiModalRoot
    :show="show"
    @close="close()"
    title="Settings"
  >
    <UIInputCopy
      label="Wallet Address"
      :value="account?.address"
    />

    <div class="space-y-1">
      <div>
        <span
          class="
            lg:text-sm
            text-font-2
            lg:text-font-1
            text-xxs
          "
        >
          Actions
        </span>
      </div>

      <button
        class="
          w-full
          p-4
          bg-gray-700
          flex
          items-center
          justify-between
          rounded-[8px]
        "
        @click.prevent="logout()"
      >
        <div>
          <span class="text-xs opacity-[0.9] text-font-1">
            Logout
          </span>
        </div>

        <div>
          <Icon name="logout" class="w-6 h-6 text-font-1" />
        </div>
      </button>
    </div>
  </UiModalRoot>
</template>
