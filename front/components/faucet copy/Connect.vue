<script lang="ts" setup>
defineProps({
  token: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['changeStep', 'token'])
</script>

<template>
  <div>
    <div>
      <span class="text-md text-font-1">
        Opact Testnet Faucet
      </span>
    </div>

    <div class="pt-[32px]">
      <span class="text-xs text-font-1">
        Fund Account
      </span>
    </div>

    <div class="pt-4">
      <div
        class="
          rounded-[8px]
          px-4
          py-3
          bg-gray-800
          h-[64px]
          flex
          justify-between
          items-center
          border-[1px]
        "
        :class="
          token === 'token'
            ? ' border-blue-400'
            : 'border-transparent'
        "
        @click.prevent="emits('token', 'token')"
      >
        <div>
          <span class="text-font-1 text-xs"> Token </span>
        </div>

        <div>
          <Icon
            v-if="token === 'token'"
            name="active"
            class="w-6 h-6"
          />

          <Icon v-else name="ring" class="w-6 h-6" />
        </div>
      </div>

      <div
        class="
          rounded-[8px]
          px-4
          py-3
          bg-gray-800
          h-[64px]
          flex
          border-[1px]
          justify-between
          items-center
          mt-4
        "
        :class="
          token === 'nft'
            ? 'border-blue-400'
            : 'border-transparent'
        "
        @click.prevent="emits('token', 'nft')"
      >
        <div>
          <span class="text-font-1 text-xs"> NFT </span>
        </div>

        <div>
          <Icon
            v-if="token === 'nft'"
            name="active"
            class="w-6 h-6"
          />

          <Icon v-else name="ring" class="w-6 h-6" />
        </div>
      </div>
    </div>

    <div class="pt-6">
      <UIButtonInline
        label="Connect Wallet"
        @click.prevent="emits('changeStep', 'provider')"
      />
    </div>
  </div>
</template>
