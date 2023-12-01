<script setup lang="ts">
import { reactive } from 'vue'
import { tokens } from '~/utils/constants'

const router = useRouter()

const data = reactive({
  amount: 0,
  show: false,
  token: tokens[0],
  showGenerateLink: false
})
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
      lg:pb-0 lg:min-h-full lg:max-w-full
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
          @click.prevent="router.push('/home')"
        >
          <Icon name="chevronLeft" class="h-6 w-6" />
        </button>

        <div>
          <h1 class="text-xs text-font-1 font-medium">
            Receive
          </h1>
        </div>
      </div>

      <UIInputMoney
        :token="data.token"
        v-model="data.amount"
      />

      <SelectToken
        :show="data.show"
        :token="data.token"
        @open="data.show = true"
        @close="data.show = false"
        @selected="data.token = $event"
      />
    </div>

    <UIButtonInline
      :disabled="Number(data.amount) <= 0"
      class="mt-full lg:mt-[40px]"
      label="Generate payment link"
      @click="data.showGenerateLink = true"
    />

    <InvoiceGenerateLink
      :token="data.token.id"
      :amount="data.amount"
      :show="data.showGenerateLink"
      @close="data.showGenerateLink = false"
    />
  </div>
</template>
