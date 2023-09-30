<script lang="ts" setup>
const emits = defineEmits(['changeStep'])
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
        Found Account
      </span>
    </div>

    <div
      class="pt-4"
    >
      <div
        class="rounded-[8px] px-4 py-3 bg-gray-800 h-[64px] flex justify-between items-center border-[1px] border-blue-400"
      >
        <div>
          <span
            class="text-font-1 text-xs"
          >
            100 KDA
          </span>
        </div>

        <div>
          <Icon
            name="active"
            class="w-6 h-6"
          />
        </div>
      </div>

      <div
        class="rounded-[8px] px-4 py-3 bg-gray-800 h-[64px] flex justify-between items-center  cursor-not-allowed opacity-50 mt-4"
      >
        <div>
          <span
            class="text-font-1 text-xs"
          >
            NFT Token
          </span>
        </div>

        <div>
          <Icon
            name="ring"
            class="w-6 h-6"
          />
        </div>
      </div>
    </div>

    <div class="pt-6">
      <button
        class="
          w-full
          flex
          items-center
          justify-center
          h-[44px]
          py-3
          px-4
          rounded-[12px]
          relative
          disabled:cursor-not-allowed
          bg-blue-gradient
        "
        @click.prevent="emits('changeStep', 'provider')"
      >
        <span class="text-font-1"> Connect Wallet </span>
      </button>
    </div>
  </div>
</template>
