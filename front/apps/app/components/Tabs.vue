<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useExtensionStore } from '~/apps/auth/stores/extension'
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@headlessui/vue'

const extension = useExtensionStore()

const { provider: exProvider } = storeToRefs(extension)
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
          v-for="{ name } in chains()"
          as="template"
          :key="'tab:' + name"
          v-slot="{ selected }"
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
          v-for="{ providers, key } in chains()"
          :key="
            'blockchain:providers' +
            key +
            JSON.stringify(exProvider)
          "
          class="w-full flex"
        >
          <ul class="w-full space-y-[14px]">
            <li
              class="w-full"
              :key="'extensions:' + provider.key"
              v-for="provider in providers"
            >
              <button
                :disabled="provider.disabled"
                @click.prevent="
                  extension.login(key, provider.key)
                "
                :class="[
                  'w-full rounded-xl text-white p-3 text-left',
                  'border-[#ffffffcc] border-[1px] flex justify-between items-center space-x-[4px] cursor-default',
                  provider.disabled &&
                    '!opacity-[0.9] !cursor-not-allowed',
                  exProvider?.key !== provider.key &&
                    'hover:opacity-[0.8] !cursor-pointer ',
                ]"
              >
                <div class="flex items-center">
                  <Icon
                    :name="provider.icon"
                    class="w-[32px]"
                  />

                  <span>
                    {{ provider.name }}
                  </span>
                </div>

                <div v-if="provider.disabled">
                  <span> Disabled </span>
                </div>

                <div
                  v-if="exProvider?.key === provider.key"
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
