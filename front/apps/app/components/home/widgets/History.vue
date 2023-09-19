<script lang="ts" setup>
import { reactive } from 'vue'
import ReceiveModal from '~/apps/app/components/receive/ReceiveModal.vue'

const router = useRouter()

const data = reactive({
  tab: 'tokens',
  showReceiveModal: false
})
</script>

<template>
  <div>
    <div
      class="hidden lg:block p-6 bg-[#0E1319] rounded-[12px] border-[2px] border-gray-600 h-auto row-span-1"
    >
      <div
        class="pb-[16px] flex justify-between items-center"
      >
        <div>
          <span
            class="
              text-sm text-font-1
            "
          >
            Last Actions
          </span>
        </div>

        <button
          disabled
          class="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span
            class="text-xxs text-blue-400"
          >
            View All
          </span>
        </button>
      </div>

      <div
        class="flex flex-col gap-3"
      >
        <div>
          <div
            class="pb-2"
          >
            <span
              class="text-xxs text-font-2"
            >
              Sep 10, 2023
            </span>
          </div>

          <div>
            <div
              class="flex px-4 py-3 bg-gray-800 rounded-[8px] items-center"
            >
              <div
                class="w-[38px] h-[38px] rounded-full bg-gray-600 flex items-center justify-center mr-3"
              >
                <Icon
                  name="arrow"
                  class="text-white"
                />
              </div>

              <div>
                <span
                  class="text-font-1 text-xs"
                >
                  Receive
                </span>

                <div>
                  <span
                    class="text-xxs text-font-2"
                  >
                    5f45x...121f
                  </span>
                </div>
              </div>

              <div
                class="ml-auto"
              >
                <span
                  class="text-xs text-green-500"
                >
                  +65 KDA
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            class="pb-2"
          >
            <span
              class="text-xxs text-font-2"
            >
              Sep 10, 2023
            </span>
          </div>

          <div>
            <div
              class="flex px-4 py-3 bg-gray-800 rounded-[8px] items-center"
            >
              <div
                class="w-[38px] h-[38px] rounded-full bg-gray-600 flex items-center justify-center mr-3"
              >
                <Icon
                  name="arrow"
                  class="text-white"
                />
              </div>

              <div>
                <span
                  class="text-font-1 text-xs"
                >
                  Receive
                </span>

                <div>
                  <span
                    class="text-xxs text-font-2"
                  >
                    5f45x...121f
                  </span>
                </div>
              </div>

              <div
                class="ml-auto"
              >
                <span
                  class="text-xs text-green-500"
                >
                  +65 KDA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ReceiveModal
    :show="data.showReceiveModal"
    @close="data.showReceiveModal = false"
  />
</template>
