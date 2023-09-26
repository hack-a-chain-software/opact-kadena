<!-- <script lang="ts" setup>
</script>

<template>
  <TransitionRoot as="template" :show="false">
    <Dialog
      as="div"
      class="relative z-10"
      @close="() => {}"
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
                  @click.prevent="setIsOpen(false)"
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
                  Choose Token
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
                  Select token
                </DialogTitle>

                <button
                  class="w-8 h-8"
                  @click.prevent="setIsOpen(false)"
                >
                  <Icon
                    name="close"
                    class="rotate-90 w-4 h-4 text-blue-400"
                  />
                </button>
              </div>

              <div class="relative lg:!mt-6">
                <input
                  placeholder="Search"
                  class="
                      p-4
                      pl-11
                      w-full
                      text-xs
                      rounded-[8px]
                      text-font-1
                      bg-transparent
                      outline-none
                      placeholder:text-font-2
                      border-2 border-gray-700
                    "
                >

                <div class="absolute left-4 top-4">
                  <Icon
                    name="search"
                    class="w-[20px] h-[20px]"
                  />
                </div>
              </div>

              <div>
                <div>
                  <span
                    class="
                        text-xxs
                        font-medium
                        text-font-2
                      "
                  >
                    Your tokens
                  </span>
                </div>

                <div
                  class="
                      space-y-3
                      divide divide-y-[1px] divide-gray-700
                    "
                >
                  <button
                    v-for="token in tokens"
                    :key="token.name"
                    class="
                        w-full
                        flex
                        items-center
                        space-x-3
                        pt-3
                      "
                    @click.prevent="
                      () => {
                        setIsOpen(false);
                        data.token = { ...token };
                      }
                    "
                  >
                    <div>
                      <img
                        :src="token.icon"
                        class="w-9 h-9"
                      >
                    </div>

                    <div
                      class="
                          flex flex-col
                          space-y-1
                          text-left
                        "
                    >
                      <span
                        class="text-xs text-font-1"
                        v-text="token.symbol"
                      />

                      <span
                        class="text-xs text-font-2"
                        v-text="token.name"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template> -->
