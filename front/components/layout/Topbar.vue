<script setup lang="ts">
const route = useRoute()

const titles = {
  home: 'Home',
  history: 'History',

  'send-nft': 'Send NFT',
  'send-token': 'Send Token',

  'receive-nft': 'Receive NFT',
  'receive-token': 'Receive Token'
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

    <div
      class="flex items-center justify-center gap-4"
    >
      <HomeAccount/>
    </div>
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
      lazy
      src="/bg-app.png"
      class="w-full w-full max-h-[319px]"
    />
  </div>
</template>
