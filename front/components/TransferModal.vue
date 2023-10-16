<script lang="ts" setup>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
  DialogTitle
} from '@headlessui/vue'

withDefaults(
  defineProps<{
    show: boolean;
  }>(),
  {
    show: false
  }
)

const isOpen = ref(false)

const router = useRouter()

const emit = defineEmits(['close', 'redirect'])

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
                p-4
                w-full
                rounded-[12px]
                space-y-4
                bg-gray-800
                lg:max-w-[500px]
                lg:p-6
                lg:border-[2px]
                lg:border-gray-600
              "
            >
              <div
                class="
                  flex
                  items-center
                  justify-center
                  relative
                  lg:hidden
                "
              >
                <button
                  class="absolute left-0"
                  @click.prevent="isOpen = false"
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
                  Send
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
                  border-b-[2px] border-gray-600
                "
              >
                <DialogTitle
                  as="h3"
                  class="text-font-1 text-sm"
                >
                  Send
                </DialogTitle>

                <button
                  class="w-8 h-8"
                  @click.prevent="close()"
                >
                  <Icon
                    name="close"
                    class="
                      rotate-90
                      w-4
                      h-4
                      text-blue-400
                      lg:w-6 lg:h-6
                    "
                  />
                </button>
              </div>

              <div class="space-y-3">
                <button
                  class="
                    p-4
                    bg-gray-700
                    flex
                    items-center
                    justify-between
                    rounded-[8px]
                    w-full
                  "
                  @click.prevent="
                    router.push('/transfer/token')
                  "
                >
                  <div>
                    <span
                      class="
                        text-xs text-font-1
                        opacity-[0.9]
                      "
                    >
                      Token
                    </span>
                  </div>

                  <div>
                    <Icon
                      name="chevron"
                      class="text-font-1 w-5 h-5 -rotate-90"
                    />
                  </div>
                </button>

                <button
                  class="
                    p-4
                    bg-gray-700
                    flex
                    items-center
                    justify-between
                    rounded-[8px]
                    w-full
                  "
                  @click.prevent="
                    router.push('/transfer/nft')
                  "
                >
                  <div>
                    <span
                      class="
                        text-xs text-font-1
                        opacity-[0.9]
                      "
                    >
                      NFT
                    </span>
                  </div>

                  <div>
                    <Icon
                      name="chevron"
                      class="text-font-1 w-5 h-5 -rotate-90"
                    />
                  </div>
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
