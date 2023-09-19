<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'
import Chains from './Chains.vue'

withDefaults(
  defineProps<{
    show: boolean;
  }>(),
  {
    show: false
  }
)

const isOpen = ref(false)

const emit = defineEmits(['close', 'connected'])

const close = () => {
  setTimeout(() => {
    isOpen.value = false
  }, 100)
  emit('close')
}

const showProviders = (flag = true) => {
  isOpen.value = flag
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
                  @click.prevent="setIsOpen(false)"
                  class="w-8 h-8"
                >
                  <Icon
                    name="close"
                    class="rotate-90 w-4 h-4 text-blue-400"
                  />
                </button>
              </div>

              <template v-if="!isOpen">
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
                    @click.prevent="showProviders()"
                  >
                    <span class="text-font-1">
                      Connect Wallet
                    </span>
                  </button>
                </div>
              </template>

              <Chains
                v-else
                @connected="emit('connected')"
              />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
