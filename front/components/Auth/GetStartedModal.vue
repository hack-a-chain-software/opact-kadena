<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'

withDefaults(
  defineProps<{
    show?: boolean;
  }>(),
  {
    show: false
  }
)

const emit = defineEmits(['close', 'create'])
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
            lg:justify-center lg:items-start lg:pt-[312px]
            p-4
            pb-[30px]
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
                px-4
                py-6
                w-full
                rounded-[12px]
                lg:max-w-[500px]
                bg-gray-800
                lg:p-6 lg:border-[2px] lg:border-gray-600
              "
            >
              <DialogTitle
                as="h3"
                class="text-font-1 text-md font-medium"
              >
                Create Your Account
              </DialogTitle>

              <div class="pt-4">
                <p class="text-font-2 text-xs font-regular">
                  Opact Wallet is a secure wallet and
                  account manager for your accounts. Once
                  you create an account, you’ll need it to
                  interact with applications on Opact
                  Ecosystem, and to securely store your
                  tokens and collectibles (NFTs).
                </p>
              </div>

              <div class="pt-6">
                <UIButtonInline
                  label="Get started"
                  @click.prevent="emit('create')"
                />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
