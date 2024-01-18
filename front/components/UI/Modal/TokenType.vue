<script lang="ts" setup>
withDefaults(
  defineProps<{
    show?: boolean;
    title?: string;
    subtile?: string;
    description?: string;
    baseRoute?: string;
  }>(),
  {
    show: false,
    title: 'Send',

    subtile: 'Choose your receive option',
    baseRoute: 'receive',
    description:
      'You can receive tokens and NFTs to your Opact Wallet.'
  }
)

const router = useRouter()

const emit = defineEmits(['close', 'redirect'])

const close = () => {
  emit('close')
}

const config = useRuntimeConfig()
</script>

<template>
  <UIModalRoot :show="show" :title="title" @close="close()">
    <div class="flex flex-col gap-2">
      <h2
        class="
          text-font-1
          text-sm lg:text-md
          font-[500]
          leading-[25.2px] lg:leading-[30.8px]
        "
      >
        {{ subtile }}
      </h2>

      <p class="text-font-2 text-xs leading-[22.4px]">
        {{ description }}
      </p>
    </div>

    <div class="flex flex-col gap-4">
      <UIButtonTertiary
        label="Token"
        class="bg-gray-700"
        @click.prevent="router.push(`/${baseRoute}/token`)"
      />

      <UIButtonTertiary
        label="NFT"
        class="bg-gray-700"
        :disabled="config.public.NFT_DISABLED"
        @click.prevent="router.push(`/${baseRoute}/nft`)"
      />
    </div>
  </UIModalRoot>
</template>
