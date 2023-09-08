<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'

import { useWalletStore } from '~/apps/auth/stores/wallet'

const wallet = useWalletStore()

withDefaults(
  defineProps<{
    show: boolean;
  }>(),
  {
    show: false
  }
)

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
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="
            flex
            min-h-full
            items-end
            justify-center
            p-4
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
                space-y-4
                bg-gray-800
              "
            >
              <div
                class="
                  flex
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

              <div>
                <span class="text-sm text-font-2">
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
                    wallet.copyToClipboard(
                      'localhost:3000/payment/B3bv0SDIkmdn85jfnDNkspsdd'
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
                        'localhost:3000/payment/B3bv0SDIkmdn85jfnDNkspsdd'
                      "
                    />
                  </div>

                  <div class="w-6 h-6 text-font-1">
                    <Icon name="copy" class="w-6 h-6" />
                  </div>
                </button>

                <div class="pt-6">
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
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
