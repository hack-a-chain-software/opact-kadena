<script lang="ts" setup>
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
    title?: string;
  }>(),
  {
    title: '',
    show: false
  }
)

const emit = defineEmits(['close'])

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
            lg:justify-center lg:items-start lg:pt-[312px]
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
                w-full
                rounded-xl
                lg:max-w-[500px]
                bg-gray-800
                lg:border-[1px] lg:border-gray-600
              "
            >
              <div
                class="
                  flex
                  relative
                  items-center
                  justify-between
                  px-6
                  py-4
                  lg:border-b-[1px] lg:border-gray-600
                "
              >
                <DialogTitle
                  as="h3"
                  class="text-font-1 text-xs md:text-sm"
                >
                  {{ title }}
                </DialogTitle>

                <UiButtonIcon
                  icon="close"
                  class="text-blue-400"
                  @click.prevent="close()"
                />
              </div>

              <div class="flex flex-col space-y-6 p-6">
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
