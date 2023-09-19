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
      lg:min-h-full
      lg:pb-0
      lg:max-w-full
    "
  >
    <div>
      <div
        class="
          lg:hidden
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
          class="bg-gray-800 rounded-[12px] p-4 text-center
        lg:mt-0
        lg:bg-transparent"
        >
          <div>
            <span class="text-md text-font-1">
              Transaction in Progress
            </span>
          </div>

          <div class="my-3">
            <div class="h-1 w-full bg-blue-400" />
          </div>

          <div>
            <span class="text-font-2 text-xs">
              Funny texts
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
