<script setup lang="ts">
import { reactive, watch } from 'vue'
import { shortenAddress } from 'opact-sdk'

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

const state = reactive({
  show: false,
  datum: null
})

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled) {
      state.show = false
    }
  }
)
</script>

<template>
  <div v-if="!disabled" class="mt-full lg:mt-[32px]">
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
        @click.prevent="state.show = !state.show"
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
              transition-all
              text-font-1
              duration-500
            "
            :class="state.show && 'container-active'"
          />
        </div>
      </button>

      <UICollapsibleCollapseTransition>
        <div v-show="state.show && !disabled">
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
                Token
              </span>
            </div>

            <div
              v-if="state.datum"
              :title="state.datum?.title"
              class="
                flex
                justify-end
                items-center
                space-x-2
              "
            >
              <div>
                <img
                  loading="lazy"
                  :src="state.datum?.assetUrl"
                  class="w-[45px] h-[45px] rounded-[8px]"
                />
              </div>

              <div
                class="
                  line-clamp-2
                  text-font-1
                  max-w-[106px]
                "
              >
                <span
                  v-text="state.datum?.title"
                  class="text-xs text-font-1"
                />
              </div>
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
                  class="text-xs font-[400] text-font-2"
                >
                  Total
                </span>
              </div>

              <div>
                <span
                  v-text="'1.0 KDA'"
                  class="text-xs font-[400] text-blue-300"
                />
              </div>
            </div>

            <div
              v-if="state.datum"
              :title="state.datum?.title"
              class="
                flex
                justify-end
                items-center
                space-x-2
                w-full
                pt-[12px]
              "
            >
              <div>
                <img
                  loading="lazy"
                  :src="state.datum?.assetUrl"
                  class="w-[45px] h-[45px] rounded-[8px]"
                />
              </div>

              <div
                class="
                  line-clamp-2
                  text-font-1
                  max-w-[106px]
                "
              >
                <span
                  v-text="state.datum?.title"
                  class="text-xs font-[400] text-blue-300"
                />
              </div>
            </div>
          </div>
        </div>
      </UICollapsibleCollapseTransition>
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
