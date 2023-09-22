<script setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'

const isOpen = ref(false)

const currentStep = useAuthCurrentStep()

function setIsOpen (value) {
  isOpen.value = value
}
</script>

<template>
  <div class="flex flex-col lg:flex-row lg:items-start h-full pt-[56px] pb-[80px] lg:pt-[0] lg:mt-[-64px] lg:px-[60px]">
    <div class="lg:hidden flex items-center justify-center h-[42px]">
      <Logo class="flex justify-center mb-5" />
    </div>

    <div
      class="
        flex
        items-center
        justify-center
        w-full
        max-h-[410px]
        lg:max-h-full
        lg:z-[-1]
        lg:relative
        lg:h-[880px]
        lg:max-w-[60%]
        lg:overflow-y-clip
      "
    >
      <figure class="">
        <img
          src="/auth-bg.png"
          alt="Hero illustration"
          quality="100"
          class="min-w-[608px] h-[507px] lg:min-w-[1057px] lg:min-h-[880px] lg:h-[880px]"
          sizes="xs:861px xxl:1057px"
        >
      </figure>
    </div>

    <div
      class="flex-col lg:mt-[300px] lg:mr-[5%] lg:min-w-[424px]"
    >
      <div class="flex flex-col space-y-[16px] max-w-[400px]">
        <h2 class="text-lg font-medium text-font-1">
          Your private address
        </h2>

        <p class="text-xs text-font-2 font-regular">
          Choose how you want to connect. Web3 like you never
          imagined.
        </p>
      </div>

      <div class="flex flex-col space-y-[16px] pt-[32px]">
        <button
          class="
            flex
            items-center
            justify-center
            bg-blue-gradient
            h-[44px]
            py-3
            px-4
            rounded-[12px]
            relative
          "
          @click.prevent="setIsOpen(true)"
        >
          <span class="text-font-1"> Create Wallet </span>
        </button>

        <button
          class="
            flex
            items-center
            justify-center
            h-[44px]
            py-[11px]
            px-4
            rounded-[12px]
            text-font-1
            border border-font-1
          "
          @click.prevent="currentStep = 'recovery'"
        >
          <span class="text-font-1"> Recover Wallet </span>
        </button>
      </div>
    </div>

    <TransitionRoot as="template" :show="isOpen">
      <Dialog
        as="div"
        class="relative z-10"
        @close="setIsOpen(false)"
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
              lg:justify-center
              lg:items-start
              lg:pt-[312px]
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
                  lg:p-6
                  lg:border-[2px] lg:border-gray-600
                "
              >
                <DialogTitle
                  as="h3"
                  class="text-font-1 text-md font-medium"
                >
                  Create Your Account
                </DialogTitle>

                <div class="pt-4">
                  <p
                    class="text-font-2 text-xs font-regular"
                  >
                    Opact Wallet is a secure wallet and
                    account manager for your accounts. Once
                    you create an account, you’ll need it to
                    interact with applications on Opact
                    Ecosystem, and to securely store your
                    tokens and collectibles (NFTs).
                  </p>
                </div>

                <div class="pt-6">
                  <button
                    class="
                      flex
                      items-center
                      justify-center
                      bg-blue-gradient
                      h-[44px]
                      py-3
                      px-4
                      rounded-[12px]
                      relative
                      w-full
                    "
                    @click.prevent="currentStep = 'create'"
                  >
                    <span class="text-font-1">
                      Get started
                    </span>
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
