<script lang="ts" setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
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
  setTimeout(() => {
    isOpen.value = false
  }, 100)
  emit('close')
}

const redirect = () => {
  setTimeout(() => {
    router.push('/receive')
  }, 100)
  emit('close')
}
</script>

<template>
  <Dialog
    as="div"
    :open="show"
    class="relative z-10"
    @close="close()"
  >
    <div class="fixed inset-0 bg-black bg-opacity-25" />

    <div class="fixed inset-0 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4"
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
              Receive
            </DialogTitle>
          </div>

          <template v-if="!isOpen">
            <div>
              <span class="text-sm text-font-1">
                Which Receiving Method?
              </span>
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
                @click.prevent="isOpen = true"
              >
                <div>
                  <span
                    class="
                      text-xs text-font-1
                      opacity-[0.9]
                    "
                  >
                    My Key
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
                @click.prevent="redirect()"
              >
                <div>
                  <span
                    class="
                      text-xs text-font-1
                      opacity-[0.9]
                    "
                  >
                    Custom Amount
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
          </template>

          <div v-else>
            <div>
              <span class="text-xxs text-font-2">
                Payment Link
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
              >
                <div class="w-[calc(100%-40px)] text-left">
                  <span
                    class="text-xs text-font-1 break-words"
                    v-text="
                      'opactwallet.me/deposit/B3bv0SDIkmdn85jfnDNkspsdd'
                    "
                  />
                </div>

                <div class="w-6 h-6">
                  <Icon name="copy" class="w-6 h-6" />
                </div>
              </button>
            </div>

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
      </div>
    </div>
  </Dialog>
</template>
