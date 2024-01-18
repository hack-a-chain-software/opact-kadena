<script lang="ts" setup>
defineProps({
  token: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['changeStep', 'token'])

const handle = (step: any) => {
  if (step === 'token') {
    emit('changeStep', 'token')

    return
  }

  emit('changeStep', 'nft')
}

const config = useRuntimeConfig()
</script>

<template>
  <UICardBody>
    <UICardHeader
      title="Opact Testnet Faucet"
      description="You can redeem tokens to test Opact Wallet."
    />

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
        @click.prevent="emit('token', 'token')"
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

      <button
        class="
          rounded-[8px]
          px-4
          w-full
          py-3
          bg-gray-800
          h-[64px]
          flex
          border-[1px]
          justify-between
          items-center
          mt-4
          group
          relative
          disabled:opacity-[0.5]
          disabled:cursor-not-allowed
        "
        :class="
          token === 'nft'
            ? 'border-blue-400'
            : 'border-transparent'
        "
        :disabled="config.public.NFT_DISABLED"
        @click.prevent="emit('token', 'nft')"
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

        <span
          v-if="config.public.NFT_DISABLED"
          class="group-hover:visible invisible text-white absolute top-4.5 right-12 text-xs lg:text-sm font-[500] leading-[140%] opacity-[0.5]"
        >
          coming soon
        </span>
      </button>
    </div>

    <UISelectWallet
      label="Connect Wallet"
      @connected="handle(token)"
    />
  </UICardBody>
</template>
