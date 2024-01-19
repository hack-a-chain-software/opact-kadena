<script lang="ts" setup>
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
    icon: 'chart',
    key: 'history',
    path: 'history',
    label: 'History'
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
      hidden
      lg:flex lg:max-w-[119px]
      xl:min-w-[260px]
      p-6
      bg-[#0c1015] bg-blur-[6px]
      border-r-2 border-[#363B42]
      z-[2]
      mb-[-40px]
      fixed
      top-0
      h-screen
      top-0
      z-[999]
    "
  >
    <div class="space-y-12">
      <div class="w-[50px] xl:w-auto overflow-hidden">
        <Icon name="logo" class="h-8 w-[190px]" />
      </div>

      <div>
        <ul class="space-y-6">
          <li
            v-for="{
              label,
              icon,
              path,
              key,
              disabled,
            } in routes"
            :key="label"
            :class="[
              route.name === key
                ? 'text-blue-400'
                : 'text-font-2 hover:bg-gray-800 cursor-pointer',
              disabled && '!cursor-not-allowed opacity-50',
            ]"
            class="
              flex
              items-center
              py-3
              px-4
              rounded-xl
              space-x-2
            "
            @click.prevent="redirect(path, disabled)"
          >
            <div>
              <Icon :name="icon" class="w-8 h-8" />
            </div>

            <div class="hidden xl:block">
              <span class="text-xs" v-text="label" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
