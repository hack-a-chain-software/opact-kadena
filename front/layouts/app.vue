<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'

const wallet = useWalletStore()

const router = useRouter()

const { connected, isLoading } = storeToRefs(wallet)

const data = reactive({
  showSettings: false
})

await wallet.reconnect()
await wallet.loadState()

const route = useRoute()

const routes = [
  {
    disabled: false,
    path: 'home',
    label: 'Home',
    icon: 'wallet'
  },
  {
    disabled: true,
    path: 'history',
    label: 'History',
    icon: 'chart'
  },
  {
    disabled: false,
    path: 'settings',
    label: 'Settings',
    icon: 'settings'
  }
]

const titles = {
  app: 'Dashboard',
  send: 'Send Token',
  receive: 'Receive',
  deposit: 'Deposit'
}

const redirect = (path: string, skip: boolean) => {
  if (skip) {
    return
  }

  if (path === 'settings') {
    data.showSettings = true

    return
  }

  router.push(`/${path}`)
}
</script>

<template>
  <div class="h-screen flex flex-col lg:flex-row lg:w-full bg-dark-blue overflow-hidden relative">
    <div
      v-if="!connected || isLoading"
      class="h-full w-full flex items-center justify-center"
    >
      <Icon
        name="minilogo"
        class="animate-spin text-white w-8 h-8"
      />
    </div>

    <template v-else>
      <div
        class="hidden lg:flex min-w-[260px] p-6 bg-[#0c1015] bg-blur-[6px] border-r-2 border-[#363B42] relative z-[2]"
      >
        <div
          class="space-y-12"
        >
          <Icon
            name="logo"
            class="h-8 w-[190px]"
          />

          <div>
            <ul
              class="space-y-6"
            >
              <li
                v-for="{ label, icon, path, disabled } in routes"
                :key="label"
                :class="[route.name === path ? 'text-blue-400' : 'text-font-2 hover:bg-gray-800 cursor-pointer', disabled && '!cursor-not-allowed opacity-50']"
                class="flex items-center py-3 px-4 rounded-xl space-x-2"
                @click.prevent="redirect(path, disabled)"
              >
                <div>
                  <Icon
                    :name="icon"
                    class="w-8 h-8"
                  />
                </div>

                <div>
                  <span
                    class="text-xs"
                    v-text="label"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        class="
          absolute
          right-0
          h-[64px]
          px-8
          items-center
          w-[calc(100%-260px)]
          z-[10]
          hidden
          lg:flex
          justify-between
        "
      >
        <div>
          <span
            class="text-font-1 text-sm"
            v-text="(titles[route.name])"
          />
        </div>

        <button
          @click.prevent="router.push('/faucet')"
          class="
            px-4
            py-2
            bg-[#0E1319]
            border border-gray-600
            rounded-[8px]
            flex justify-center items-center gap-1
            hover:opacity-80
          "
        >
          <span
            class="text-font-1 text-xxs"
          >
            Faucet
          </span>

          <Icon
            name="chevron"
            class="text-font-1 -rotate-90"
          />
        </button>
      </div>

      <div
        class="absolute z-[0] w-full hidden lg:block min-w-[1920px] select-none pointer-events-none"
      >
        <img
          src="/bg-app.png"
          class="w-full w-full"
        >
      </div>

      <div
        class="
          lg:hidden
          h-[60px]
          py-3
          px-6
          flex
          justify-between
          items-center
          pt-8
        "
      >
        <div>
          <Icon name="minilogo" class="w-[30px] h-[30px]" />
        </div>

        <div>
          <button
            class="
              flex
              items-center
              justify-center
              rounded-[30px]
              px-4
              py-2.5
              bg-gray-800
              space-x-2
            "
          >
            <span class="text-xxxs font-medium text-font-1">
              KADENA
            </span>

            <div class="mr-[-4px]">
              <Icon
                name="chevron"
                class="w-5 h-5 mb-0.5 text-white"
              />
            </div>
          </button>
        </div>

        <div>
          <button
            class="
              rounded-full
              bg-gray-800
              w-9
              h-9
              flex
              items-center
              justify-center
            "
            @click.prevent="data.showSettings = true"
          >
            <Icon
              name="settings"
              class="w-5 h-5 text-font-1"
            />
          </button>
        </div>
      </div>

      <div class="px-4 lg:w-full lg:pt-[96px] relative z-[2]">
        <slot />
      </div>
    </template>

    <Settings
      :show="data.showSettings"
      @close="data.showSettings = false"
    />
  </div>
</template>
