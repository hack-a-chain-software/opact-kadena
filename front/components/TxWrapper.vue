<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { shortenAddress } from '~/utils/string'

const props = withDefaults(
  defineProps<{
    token: any;
    sender?: string;
    receiver?: string;
    disabled?: boolean;
    amount?: string | number;
  }>(),
  {
    amount: 0,
    sender: '',
    receiver: '',
    disabled: false
  }
)

const data = reactive({
  show: false
})

const totalAmount = computed(() => {
  if (props.token.name === 'Kadena') {
    return Number(props.amount) + 1.0
  }

  return 1.0
})

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) {
      data.show = false
    }
  }
)
</script>

<template>
  <div
    class="mt-full lg:mt-[32px]"
  >
    <div
      class="
        transition-all
        duration-1000
        bg-gray-800
        rounded-[8px]
        px-4
        py-3
        relative
        z-[0]
      "
    >
      <button
        class="flex justify-between items-center w-full"
        @click.prevent="data.show = !data.show"
      >
        <div>
          <span class="text-xxs font-medium text-font-1">
            Transaction Details
          </span>
        </div>

        <div>
          <Icon
            name="chevron"
            class="
              w-4
              h-4
              container
              text-white
              transition-all
              duration-500
            "
            :class="data.show && 'container-active'"
          />
        </div>
      </button>

      <CollapsibleCollapseTransition>
        <div v-show="data.show && !disabled">
          <div
            class="
              flex
              items-center
              justify-between
              pt-[12px]
            "
          >
            <div>
              <span class="text-xs font-[400] text-font-2">
                Estimated Fees
              </span>
            </div>

            <div>
              <span class="text-xs font-[400] text-font-1">
                1 KDA
              </span>
            </div>
          </div>

          <div
            class="
              flex
              items-center
              justify-between
              pt-[12px]
            "
          >
            <div>
              <span class="text-xs font-[400] text-font-2">
                Amount
              </span>
            </div>

            <div>
              <span
                v-text="`${amount} ${token.symbol}`"
                class="text-xs font-[400] text-font-1"
              />
            </div>
          </div>

          <div
            class="
              flex
              items-center
              justify-between
              pt-[12px]
            "
          >
            <div>
              <span class="text-xs font-[400] text-font-2">
                Sender
              </span>
            </div>

            <div>
              <span
                v-text="shortenAddress(sender)"
                class="text-xs font-[400] text-font-1"
              />
            </div>
          </div>

          <div
            class="
              flex
              items-center
              justify-between
              pt-[12px]
            "
          >
            <div>
              <span class="text-xs font-[400] text-font-2">
                Receiver
              </span>
            </div>

            <div>
              <span
                v-text="shortenAddress(receiver)"
                class="text-xs font-[400] text-font-1"
              />
            </div>
          </div>

          <div
            class="
              flex
              justify-between
              items-center
              flex-col
              pt-3
              mt-4
              border-t border-[#57595C]
            "
          >
            <div
              class="
                w-full
                flex
                items-center
                justify-between
              "
            >
              <div>
                <span
                  class="text-[14px] font-[400] text-font-2"
                >
                  Total
                </span>
              </div>

              <div>
                <span
                  v-text="totalAmount.toFixed(1) + ' KDA'"
                  class="
                    text-[14px]
                    font-[400]
                    text-blue-300
                  "
                />
              </div>
            </div>

            <div
              v-if="props.token.name !== 'Kadena'"
              class="flex justify-end w-full pt-[12px]"
            >
              <div>
                <span
                  v-text="
                    `${Number(amount).toFixed(1)} ${
                      token.symbol
                    }`
                  "
                  class="
                    text-[14px]
                    font-[400]
                    text-blue-300
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleCollapseTransition>
    </div>
  </div>
</template>

<style>
.container {
  perspective: 1000px;
  perspective-origin: 50% 50%;
}

.container-active {
  transform: rotateX(-180deg);
  transform-style: preserve-3d;
}
</style>
