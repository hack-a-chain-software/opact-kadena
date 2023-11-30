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
    show: boolean;
    link: string;
  }>(),
  {
    link: '',
    show: false
  }
)

const emit = defineEmits(['close', 'done'])
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
                rounded-[12px]
                lg:max-w-[500px]
                space-y-6
                bg-gray-800
                p-6
                pt-4
                lg:border-[1px] lg:border-gray-600
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
                  Shareable link
                </DialogTitle>
              </div>

              <div
                class="
                  hidden
                  lg:flex
                  relative
                  !mt-0
                  justify-between
                  items-center
                  mx-[-24px]
                  px-[24px]
                  pb-4
                  border-b-[1px] border-gray-600
                "
              >
                <DialogTitle
                  as="h3"
                  class="text-font-1 text-sm"
                >
                  Shareable link
                </DialogTitle>

                <button @click.prevent="emit('close')">
                  <Icon
                    name="close"
                    class="rotate-90 w-6 h-6 text-blue-400"
                  />
                </button>
              </div>

              <div>
                <span
                  class="
                    lg:text-sm
                    text-font-1
                    font-[500]
                    leading-[25.2px]
                    lg:text-font-1
                    text-xxs
                  "
                >
                  Copy or share the payment link
                </span>
              </div>

              <div>
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
                    group
                  "
                  @click.prevent="copyToClipboard(link)"
                >
                  <div
                    class="w-[calc(100%-40px)] text-left"
                  >
                    <span
                      class="
                        text-xs text-font-1
                        break-words
                        group-active:text-blue-400
                      "
                      v-text="link"
                    />
                  </div>

                  <div
                    class="
                      w-6
                      h-6
                      text-font-1
                      group-active:text-blue-400
                    "
                  >
                    <Icon name="copy" class="w-6 h-6" />
                  </div>
                </button>
              </div>

              <ButtonInline
                label="Done"
                @click.prevent="emit('done')"
              />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
