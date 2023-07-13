<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="text-white max-w-[450px]">
    <div>
      <button
        class="flex items-center space-x-[4px]"
        @click.prevent="router.push('/app')"
      >
        <Icon name="chevron" class="rotate-[90deg]" />

        <span class="text-title text-[16px]"> App </span>
      </button>
    </div>

    <div class="pt-2">
      <div>
        <h2 class="text-white font-title text-[40px]">
          Deposit Token
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
          Select the wallet you want to connect to send your
          tokens to your Opact Wallet
        </p>
      </div>

      <div>
        <Tabs />
      </div>
    </div>
  </div>
</template>
