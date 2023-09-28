<script lang="ts" setup>
import { computed } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'

import { useWalletStore } from '~/stores/wallet'

const wallet = useWalletStore()

const props = withDefaults(
  defineProps<{
    show: boolean;
    token: number;
    amount: number;
  }>(),
  {
    show: false
  }
)

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'localhost:3000'
    : window.location.origin

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (e) {
    console.warn(e)
  }
}

const params = computed(() => {
  return window.btoa(`${props.token}-${props.amount}-${wallet.node.hexPub}`)
})

const emit = defineEmits(['close', 'connected'])

const close = () => {
  emit('close')
}
</script>

<template>
  <TransitionRoot as="template" :show="show">
    <Dialog as="div" class="relative z-10" @close="close()">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-[rgba(6,_10,_15,_0.80)]"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="
            flex
            min-h-full
            items-end
            justify-center
            p-4
            lg:justify-center
            lg:items-start
            lg:pt-[312px]
          "
        >
          <TransitionChild
            as="template"
            enter="duration-200 ease-out"
            enter-from="opacity-0 translate-y-[600px]"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 translate-y-[600px]"
          >
            <DialogPanel
              class="
                p-4
                w-full
                rounded-[12px]
                lg:max-w-[500px]
                space-y-4
                bg-gray-800
                lg:p-6
                lg:border-[2px] lg:border-gray-600
              "
            >
              <div
                class="
                  flex
                  lg:hidden
                  items-center
                  justify-center
                  relative
                "
              >
                <DialogTitle
                  as="h3"
                  class="text-font-1 text-xs"
                >
                  Receive
                </DialogTitle>
              </div>

              <div
                class="
                  hidden lg:flex relative !mt-0
                  justify-between
                  items-center
                  mx-[-24px]
                  px-[24px]
                  pb-4
                  border-b-[2px] border-gray-600
                "
              >
                <DialogTitle
                  as="h3"
                  class="text-font-1 text-sm"
                >
                  Receive Payment
                </DialogTitle>

                <button
                  @click.prevent="emit('close')"
                  class="w-8 h-8"
                >
                  <Icon
                    name="close"
                    class="rotate-90 w-4 h-4 text-blue-400"
                  />
                </button>
              </div>

              <div>
                <span class="text-sm text-font-2 lg:text-font-1 text-xxs">
                  Copy or share the payment link
                </span>
              </div>

              <div class="pt-2">
                <button
                  class="
                    p-4
                    rounded-[8px]
                    bg-gray-700
                    flex
                    items-center
                    justify-between
                    gap-4
                    w-full
                  "
                  @click.prevent="
                    copyToClipboard(
                      `${baseUrl}/payment/${params}`
                    )
                  "
                >
                  <div
                    class="w-[calc(100%-40px)] text-left"
                  >
                    <span
                      class="
                        text-xs text-font-1
                        break-words
                      "
                      v-text="
                        `${baseUrl}/payment/${params}`
                      "
                    />
                  </div>

                  <div class="w-6 h-6 text-font-1">
                    <Icon name="copy" class="w-6 h-6" />
                  </div>
                </button>

                <!-- <div class="pt-6">
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
                  >
                    <span class="text-font-1"> Share </span>
                  </button>
                </div> -->
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
