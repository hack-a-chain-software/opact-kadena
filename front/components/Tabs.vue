<script setup lang="ts">
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@headlessui/vue'
import { useExtensionStore } from '~/apps/auth/stores/extension'

const extension = useExtensionStore()

const chains = getChains()

const { step } = useForm()

const loginCallback = () => {
  step.value = 'message'
}
</script>

<template>
  <div class="w-full max-w-md px-2 sm:px-0">
    <TabGroup>
      <TabList
        class="
          flex
          space-x-[14px]
          h-[48px]
          border-b-[1px] border-b-[#ffffffcc]
          w-full]
        "
      >
        <Tab
          v-for="{ name } in chains"
          :key="'tab:' + name"
          v-slot="{ selected }"
          as="template"
        >
          <button
            :class="[
              'text-[15px] font-[600] font-title leading-5 text-[#BDBDBD] h-full !ring-0',
              'text-left !outline-none',
              selected && 'text-white',
            ]"
          >
            {{ name }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="pt-[24px]">
        <TabPanel
          v-for="({ adapters, key }, i) in chains"
          :key="'blockchain:providers' + key + i"
          class="w-full flex"
          as="div"
        >
          <ul class="w-full space-y-[14px]">
            <li
              v-for="adapter in adapters"
              :key="'extensions:' + adapter.metadata.key"
              class="w-full"
            >
              <button
                :disabled="adapter.metadata.disabled"
                :class="[
                  'w-full rounded-xl text-white p-3 text-left',
                  'border-[#ffffffcc] border-[1px] flex justify-between items-center space-x-[4px] cursor-default',
                  adapter.metadata.disabled &&
                    '!opacity-[0.9] !cursor-not-allowed',
                  !adapter.account.value &&
                    'hover:opacity-[0.8] !cursor-pointer ',
                ]"
                @click.prevent="
                  extension.login(
                    key,
                    adapter.metadata.key,
                    loginCallback
                  )
                "
              >
                <div class="flex items-center">
                  <Icon
                    :name="adapter.metadata.icon"
                    class="w-[32px]"
                  />

                  <span>
                    {{ adapter.metadata.name }}
                  </span>
                </div>

                <div v-if="adapter.metadata.disabled">
                  <span> Disabled </span>
                </div>

                <div
                  v-if="adapter.account.value"
                  class="flex items-center space-x-[12px]"
                >
                  <div>
                    <span> Connected </span>
                  </div>

                  <button
                    class="hover:opacity-80"
                    @click.prevent.stop="extension.logout()"
                  >
                    <Icon name="logout" />
                  </button>
                </div>
              </button>
            </li>
          </ul>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
