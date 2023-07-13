<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useExtensionStore } from '~/apps/auth/stores/extension'

const { step } = useForm()

const { provider } = storeToRefs(useExtensionStore())
</script>

<template>
  <div class="text-white max-w-[450px]">
    <div>
      <button
        class="flex items-center space-x-[4px]"
        @click.prevent="step = 'chain'"
      >
        <Icon name="chevron" class="rotate-[90deg]" />

        <span class="text-title text-[16px]"> Back </span>
      </button>
    </div>

    <div class="pt-2">
      <div>
        <h2 class="text-white font-title text-[40px]">
          Sign the message
        </h2>
      </div>

      <div class="pt-[25px]">
        <p
          class="
            pb-[25px]
            text-[18px]
            font-[500]
            leading-[26px]
            text-[#BDBDBD]
          "
        >
          Deposit implementation in progress
        </p>
      </div>
    </div>

    <div>
      <Button
        text="Click to Sign"
        variant="secondary"
        @click="
          provider.signMessage({
            message: 'KADENA EXAMPLE',
          })
        "
      />
    </div>
  </div>
</template>
