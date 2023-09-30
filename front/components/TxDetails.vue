<script lang="ts" setup>
withDefaults(
  defineProps<{
    fee: number | string;
    amount: number | string;
  }>(),
  {
    fee: 0,
    amount: 0,
  }
)
</script>

<template>
  <div class="pt-4 lg:pt-8">
    <Collapsible
      title="Transaction Details"
      class="!bg-gray-700"
    >
      <div>
        <div class="flex items-center justify-between">
          <div>
            <span
              class="text-xxs font-medium text-font-2"
            >
              Estimated Fees
            </span>
          </div>

          <div>
            <span
              class="text-xxs font-medium text-font-1"
            >
              {{ fee }} KDA
            </span>
          </div>
        </div>

        <div
          class="
            flex
            justify-between
            items-center
            pt-3
            mt-4
            border-t border-[#57595C]
          "
        >
          <div>
            <span
              class="text-xxs font-medium text-font-2"
            >
              Total
            </span>
          </div>

          <div>
            <span
              class="text-xxs font-medium text-blue-300"
            >
              {{ Number(amount) + Number(fee) }} KDA
            </span>
          </div>
        </div>
      </div>
    </Collapsible>
  </div>
</template>
