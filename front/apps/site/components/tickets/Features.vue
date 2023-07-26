<script setup lang="ts">
const features = [
  {
    icon: 'security',
    key: 'feature:security',
    title: 'Private Payments',
    description:
      'Send and receive payments without the need to showcase your wallet'
  },
  {
    icon: 'airplane',
    key: 'feature:airplane',
    title: 'Send tickets as giveaways',
    description:
      'Instead of transferring, send tickets as giveaways for the community.'
  },
  {
    icon: 'send',
    key: 'feature:send',
    title: 'Convenient Payment Option',
    description:
      'Save your tickets to use it as a payment whenever you need it.'
  }
] as any

const colors = {
  send: 'group-hover:text-[#AD51FF]',
  airplane: 'group-hover:text-[#1A92FF]',
  security: 'group-hover:text-[#AD51FF]'
} as any
</script>

<template>
  <Section
    id="features"
    class="overflow-hidden flex flex-col"
  >
    <div
      class="
        flex-1 flex flex-col
        xl:flex-row
        justify-between
        xl:space-x-3
      "
    >
      <div
        class="
          md:pb-[30px]
          space-y-[18px]
          xl:pb-0 xl:space-x-0
        "
      >
        <h2
          class="
            text-[30px] font-[600] leading-[120%]
            font-title md:font-[600]
            text-[#FAFAFA]
            md:leading-[120%]
            md:text-[48px]
            max-w-[600px]
            lg:max-w-[788px]
          "
        >
          Tickets to do whatever you want
        </h2>

        <p
          class="
            text-[#BDBDBD]
            md:font-[500]
            md:text-[22px]
            md:leading-[150%]
            max-w-[800px]
            2xl:max-w-none
            text-[18px] font-[500] leading-[27px]
          "
        >
          Tickets are “passwords” that allow you to withdraw
          the amount that has been deposited to Opact
          Tickets. Here are some use cases:
        </p>
      </div>

      <Button
        with-icon
        variant="secondary"
        href="https://hideyour.cash/"
        text="Go to Opact Tickets"
        class="lg:h-8 xl:h-[39px] mt-auto shrink-0 invisible md:visible"
      />
    </div>

    <div
      class="
        flex flex-wrap
        lg:flex-nowrap
        md:pt-[60px]
        gap-[24px]
        lg:gap-0 lg:justify-between
        justify-center
      "
    >
      <div
        v-for="{
          title,
          icon,
          description,
          key,
        } in features"
        :key="key"
        class="
          w-full
          md:w-[340px]
          lg:w-[280px]
          xl:w-[365px]
          2xl:w-[418px]
          bg-inverted-card-gradient
          p-[2px]
          rounded-[20px]
          cursor-pointer
          group
        "
      >
        <div
          class="
            bg-card-gradient
            rounded-[20px]
            w-full
            h-full
          "
        >
          <div
            class="
              py-[60px]
              w-full
              flex
              items-center
              justify-center
              h-[200px]
              relative
            "
          >
            <img
              class="
                z-[1]
                absolute
                top-0
                opacity-0
                group-hover:opacity-100
                transition-all
              "
              :src="`/tickets/${icon}-hover.png`"
            >

            <Icon
              :name="icon"
              class="
                w-[80px]
                h-[80px]
                text-white
                transition-all
                relative
                z-[2]
              "
              :class="colors[icon]"
            />
          </div>

          <div
            class="
              pt-[12px]
              pb-[32px]
              px-[23px]
              space-y-[16px]
            "
          >
            <h3
              class="
                font-title
                text-white text-[24px]
                font-[600]
                leading-[150%]
                flex
                items-center
                h-[72px]
              "
              v-text="title"
            />

            <p
              class="
                text-[#BDBDBD] text-[18px]
                font-[500]
                leading-[120%]
              "
              v-text="description"
            />
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>
