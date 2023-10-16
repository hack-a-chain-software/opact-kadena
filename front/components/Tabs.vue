<script setup lang="ts">
import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@headlessui/vue'
import TabItem from './TabItem.vue'
import { chains } from '~/chains'
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
          as="div"
          :key="id"
          class="w-full flex"
          v-for="{ providers, id } in chains"
        >
          <ul class="w-full space-y-[14px]">
            <TabItem
              v-for="provider in providers"
              :key="provider.id"
              :chain="key"
              v-bind="provider"
              class="w-full"
            />
          </ul>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
