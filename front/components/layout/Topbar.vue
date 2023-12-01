<script setup lang="ts">
const route = useRoute()

const router = useRouter()

const titles = {
  home: 'Dashboard',
  send: 'Send Token',
  receive: 'Receive',
  history: 'History',

  'send-nft': 'Send NFT',
  'send-token': 'Send Token',

  'receive-nft': 'Receive NFT',
  'receive-token': 'Receive Token',
}
</script>

<template>
  <div
    class="
      absolute
      right-0
      h-[64px]
      px-8
      items-center
      w-[calc(100%-115px)]
      xl:w-[calc(100%-260px)]
      z-[10]
      hidden
      lg:flex
      justify-between
    "
    :class="
      route.name === 'home'
        ? 'bg-[rgba(6,_10,_15,_0.48)]'
        : 'bg-[rgba(6,_10,_15,_0.80)]'
    "
  >
    <div>
      <span
        class="text-font-1 text-md"
        v-text="titles[route.name]"
      />
    </div>

    <button
      class="
        px-4
        py-2
        bg-[#0E1319]
        border border-gray-600
        rounded-[8px]
        flex
        justify-center
        items-center
        gap-1
        hover:opacity-80
      "
      @click.prevent="router.push('/faucet')"
    >
      <span class="text-font-1 text-xxs"> Faucet </span>

      <Icon name="chevron" class="text-font-1 -rotate-90" />
    </button>
  </div>

  <div
    class="
      absolute
      z-[0]
      w-full
      hidden
      lg:block
      min-w-[1920px]
      select-none
      pointer-events-none
    "
  >
    <img
      src="/bg-app.png"
      class="w-full w-full max-h-[319px]"
    />
  </div>
</template>
