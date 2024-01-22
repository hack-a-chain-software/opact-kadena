<script setup lang="ts">
import { reactive } from 'vue'
const router = useRouter()

const route = useRoute()

const data = reactive({
  showSettings: false
})

const routes = [
  {
    disabled: false,
    path: '',
    key: 'index',
    label: 'Home',
    icon: 'wallet'
  },
  {
    disabled: false,
    path: 'history',
    key: 'history',
    label: 'History',
    icon: 'chart'
  }
]

const redirect = (path: string, skip: boolean) => {
  if (skip) {
    return
  }

  if (path === 'settings') {
    data.showSettings = true

    return
  }

  router.push(`/${path}`)
}
</script>

<template>
  <div
    class="
      lg:hidden
      py-3
      z-[9]
      fixed
      bottom-0
      left-0
      right-0
      flex
      px-[61px]
      justify-around
      bg-dark-blue
      border-t-[0.5px] border-gray-600
    "
  >
    <button
      v-for="{ label, icon, path, key, disabled } in routes"
      :key="'mobile:' + label"
      :class="[
        route.name === key
          ? 'text-blue-400'
          : 'text-font-2 hover:bg-gray-800 cursor-pointer',
        disabled && '!cursor-not-allowed opacity-50',
      ]"
      class="space-y-[4px]"
      @click.prevent="redirect(path, disabled)"
    >
      <div>
        <Icon :name="icon" class="w-6 h-6" />
      </div>

      <div>
        <span
          v-text="label"
          class="text-xxxs font-medium"
        />
      </div>
    </button>
  </div>
</template>
