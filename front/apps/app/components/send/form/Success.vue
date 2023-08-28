<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div
    class="
      flex flex-col
      justify-between
      pb-[32px]
      max-w-[450px]
      text-white
      min-h-[812px]
    "
  >
    <div>
      <div
        class="
          w-full
          py-4
          flex
          justify-center
          relative
          items-center
        "
      >
        <button
          class="
            flex
            items-center
            space-x-[4px]
            h-6
            absolute
            top-4
            left-0
          "
          @click.prevent="router.push('/app')"
        >
          <Icon name="chevronLeft" class="h-6 w-6" />
        </button>

        <div>
          <h1 class="text-xs text-font-1 font-medium">
            Send Token
          </h1>
        </div>
      </div>

      <div class="pt-7">
        <div
          class="
            bg-gray-800
            rounded-[12px]
            p-4
            text-center
            flex flex-col
            items-center
            justify-center
          "
        >
          <div>
            <img src="/success.png" class="w-[100px]" />
          </div>

          <div class="pt-4">
            <span class="text-md font-medium text-fon-1">
              Transaction Complete
            </span>
          </div>

          <div class="pt-2">
            <span class="text-xs font-medium text-font-2">
              Funny texts
            </span>
          </div>

          <div class="pt-6 w-full">
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
              @click.prevent="router.push('/app')"
            >
              <span class="text-font-1"> Finish </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
