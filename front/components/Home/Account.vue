<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useWalletStore } from '~/stores/wallet'

const wallet = useWalletStore()

const { account } = storeToRefs(wallet)

const router = useRouter()

const config = useRuntimeConfig()

const redirectToKadena = () => {
  window.open('https://tools.kadena.io/faucet/new', '__blank')
}
</script>

<template>
  <UIDropdown
    icon="user"
    label="Account"
  >
    <div
      class="flex flex-col max-w-[320px] gap-6"
    >
      <div
        class="flex flex-col gap-4"
      >
        <div
          class="flex items-center justify-between"
        >
          <span
            class="text-xxs text-font-1 font-[500]"
          >
            Your Opact address
          </span>

          <button
            @click.prevent="config.public.faucetDisabled ? redirectToKadena() : router.push('/faucet')"
            class="text-blue-300 text-xxs font-[500] flex items-center"
          >
            Get faucet tokens

            <Icon
              name="chevron"
              class="rotate-[-90deg]"
            />
          </button>
        </div>

        <UIInputCopy
          :value="account.address"
        />
      </div>

      <div
        class="flex flex-col gap-4"
      >
        <div>
          <span
            class="text-font-1 text-xxs font-[500]"
          >
            Actions
          </span>
        </div>

        <div
          class="flex flex-col space-y-4"
        >
          <a
            role="button"
            target="_blank"
            href="https://docs.wallet.opact.io/tutorial"
            class="
              w-full
              rounded-lg
              flex justify-between items-center
              bg-transparent
              text-font-2
              border border-gray-600
              hover:opacity-[0.8]
              px-4
              py-3
            "
          >
            Documentation

            <Icon
              name="chevron"
              class="w-5 h-5 text-font-2 -rotate-90"
            />
          </a>

          <button
            class="
              w-full
              rounded-lg
              flex justify-between items-center
              bg-[#251319]
              border border-[#C6454B]
              hover:opacity-[0.8]
              px-4
              py-3
            "
            @click.prevent="wallet.logout()"
          >
            <span
              class="text-xxs font-[500] leading-[19.6px] text-font-1"
            >
              Logout
            </span>

            <Icon
              name="logout"
              class="w-6 h-6 text-font-1"
            />
          </button>
        </div>
      </div>
    </div>
  </UIDropdown>
</template>
