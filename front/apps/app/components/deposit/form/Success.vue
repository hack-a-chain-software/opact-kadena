<script setup lang="ts">
const { provider } = useExtensions()

const { step } = useForm()

const router = useRouter()

const back = () => {
  setTimeout(() => {
    step.value = 'amount'
    provider.value.logout()
  }, 100)
  router.push('/app')
}
</script>

<template>
  <div
    class="
      flex flex-col
      pb-[32px]
      max-w-[450px]
      text-white
      min-h-[812px]
      lg:min-h-full
      lg:max-w-full
      lg:pb-0
    "
  >
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
        @click.prevent="back()"
      >
        <Icon name="chevronLeft" class="h-6 w-6" />
      </button>

      <div>
        <h1 class="text-xs text-font-1 font-medium">
          Deposit
        </h1>
      </div>
    </div>

    <div
      class="
        flex flex-col
        space-y-2
        mt-[59px]
        items-center
        justify-center
        px-4
        py-3
        bg-gray-800
        rounded-[12px]
        lg:bg-transparent
        lg:mt-0
      "
    >
      <div>
        <img src="/success.png" class="w-[100px]" />
      </div>

      <div class="pt-4">
        <span class="text-md font-medium text-fon-1">
          Deposit Complete
        </span>
      </div>

      <div class="pt-2">
        <span class="text-xxs font-medium text-font-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing
        </span>
      </div>
    </div>
  </div>
</template>
