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
</script>

<template>
  <UiModalRoot :show="show" :title="title" @close="close()">
    <div class="flex flex-col gap-2">
      <h2
        class="
          text-font-1 text-md
          font-[500]
          leading-[30.8px]
        "
      >
        {{ subtile }}
      </h2>

      <p class="text-font-2 text-xs leading-[22.4px]">
        {{ description }}
      </p>
    </div>

    <div class="flex flex-col gap-4">
      <UiButtonTertiary
        label="Token"
        class="bg-gray-700"
        @click.prevent="router.push(`/${baseRoute}/token`)"
      />

      <UiButtonTertiary
        label="NFT"
        class="bg-gray-700"
        @click.prevent="router.push(`/${baseRoute}/nft`)"
      />
    </div>
  </UiModalRoot>
</template>
