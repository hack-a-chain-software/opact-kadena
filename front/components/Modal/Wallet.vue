<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'
import { reactive } from 'vue'
import { chains } from '~/chains'

withDefaults(
  defineProps<{
    show: boolean;
  }>(),
  {
    show: false
  }
)

const data = reactive({
  show: false
})

const emit = defineEmits(['close', 'connected'])

const close = () => {
  emit('close')
}
</script>

<template>
  <TransitionRoot as="template" :show="show">
    <Dialog as="div" class="relative z-10" @close="data.show = false">
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
                  lg:hidden
                  flex
                  items-center
                  justify-center
                  relative
                "
              >
                <button
                  class="absolute left-0"
                  @click.prevent="close()"
                >
                  <Icon
                    name="chevron"
                    class="text-font-1 rotate-90"
                  />
                </button>

                <DialogTitle
                  as="h3"
                  class="text-font-1 text-xs"
                >
                  Deposit
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
                  Connect your Wallet
                </DialogTitle>

                <button
                  @click.prevent="close()"
                  class="w-8 h-8"
                >
                  <Icon
                    name="close"
                    class="rotate-90 w-4 h-4 text-blue-400"
                  />
                </button>
              </div>

              <template v-if="!data.show">
                <div class="relative">
                  <span
                    class="
                      text-xxs
                      font-regular
                      lg:text-font-1
                      lg:text-sm
                      text-font-2
                    "
                  >
                    Deposits are made through your external
                    wallet. Connect your wallet to deposit.
                  </span>
                </div>

                <div>
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
                    @click.prevent="data.show = true"
                  >
                    <span class="text-font-1">
                      Connect Wallet
                    </span>
                  </button>
                </div>
              </template>

              <div
                v-else
                class="w-full max-w-md"
              >
                <ul class="w-full space-y-[14px] gap-3">
                  <TabItem
                    v-for="provider in chains[0].providers"
                    :key="provider.id"
                    :chain="provider.key"
                    v-bind="provider"
                    class="w-full"
                    @connected="emit('connected')"
                  />
                </ul>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
