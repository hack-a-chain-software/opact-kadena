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

const emit = defineEmits(['close'])
</script>

<template>
  <TransitionRoot as="template" :show="show">
    <Dialog
      as="div"
      class="relative z-10"
      @close="emit('close')"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-[rgba(6,_10,_15,_0.80)]" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="
            flex
            min-h-full
            items-end
            justify-center
            lg:justify-center
            lg:items-start
            lg:pt-[312px]
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
                  items-center
                  justify-center
                  relative
                "
              >
                <DialogTitle
                  as="h3"
                  class="text-font-1 text-xs"
                >
                  Settings
                </DialogTitle>
              </div>

              <button
                class="
                  w-full
                  p-4
                  bg-gray-700
                  flex
                  items-center
                  justify-between
                  rounded-[8px]
                "
                @click.prevent="wallet.logout()"
              >
                <div>
                  <span
                    class="
                      text-xs
                      opacity-[0.9]
                      text-font-1
                    "
                  >
                    Logout
                  </span>
                </div>

                <div>
                  <Icon
                    name="logout"
                    class="w-6 h-6 text-font-1"
                  />
                </div>
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
