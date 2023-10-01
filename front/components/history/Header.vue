<script lang="ts" setup>

</script>

<template>
  <div
    class="w-full"
  >
    <div
      class="grid grid-cols-[2fr,1fr,1fr] gap-[24px]"
    >
      <div
        class="border border-gray-600 bg-gray-900 rounded-[8px] flex items-cneter p-4 space-x-2"
      >
        <div>
          <Icon
            name="search"
            class="w-6 h-6"
          />
        </div>

        <input
          placeholder="Search"
          class="
            text-xs
            text-font-2
            w-full
            bg-transparent
            outline-none
          "
        />
      </div>

      <div
        class="border border-gray-600 rounded-[8px] p-4 bg-gray-900 flex items-center space-x-2 cursor-pointer"
      >
        <div>
          <Icon
            name="calendar"
            class="w-6 h-6 text-blue-400"
          />
        </div>

        <div>
          <span
            class="text-font-1 text-xxs"
          >
            Select date
          </span>
        </div>
      </div>

      <div
        class="border border-gray-600 rounded-[8px] p-4 bg-gray-900 flex items-center space-x-2 cursor-pointer"
      >
        <div>
          <Icon
            name="filter"
            class="w-6 h-6 text-blue-400"
          />
        </div>

        <div>
          <span
            class="text-font-1 text-xxs"
          >
            Filter
          </span>
        </div>
      </div>
    </div>

    <div
      class="pt-[32px] flex items-center space-x-[24px]"
    >
      <button
        class="px-4 py-2 text-xxs text-font-2 hover:bg-gray-800 rounded-[8px]"
      >
        All time
      </button>

      <button
        class="px-4 py-2 text-xxs text-font-2 hover:bg-gray-800 rounded-[8px]"
      >
        Withdraw
      </button>

      <button
        class="px-4 py-2 text-xxs text-font-2 hover:bg-gray-800 rounded-[8px]"
      >
        Deposit
      </button>

      <button
        class="px-4 py-2 text-xxs text-font-2 hover:bg-gray-800 rounded-[8px]"
      >
        Transfer
      </button>
    </div>
  </div>
</template>
