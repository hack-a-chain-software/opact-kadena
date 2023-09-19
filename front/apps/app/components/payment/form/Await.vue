<script setup lang="ts"></script>

<template>
  <div class="flex flex-col max-w-[450px] lg:max-w-full text-white">
    <div
      class="
        flex flex-col
        space-y-2
        items-center
        justify-center
        bg-gray-800
        rounded-[12px]
        lg:min-h-full
        lg:pb-0
        lg:max-w-full
        lg:bg-transparent
      "
    >
      <div>
        <img src="/loading.png" class="w-[129px]" />
      </div>

      <div class="pt-6">
        <span class="text-md font-medium text-fon-1">
          Payment in progress...
        </span>
      </div>

      <div class="pt-3">
        <span class="text-xxs font-medium text-font-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing
        </span>
      </div>
    </div>
  </div>
</template>
