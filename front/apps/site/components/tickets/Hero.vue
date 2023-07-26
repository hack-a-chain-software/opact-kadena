<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <div
    class="
      max-w-screen
      overflow-x-clip
      pt-[52px]
      md:pt-[60px]
      h-[788px]
      sm:h-[1055px]
      lg:h-[717px]
      !overflow-hidden
      xl:h-[807.57px]
      2xl:h-[880px]
    "
  >
    <Section
      class="
        flex flex-col
        relative
        lg:relative lg:overflow-visible
        items-center
        lg:items-start
        xl:items-start
        mb-[22px]
        sm:mb-0
        md:mb-0
        lg:mb-10
        xl:mb-[65px]
        pt-[24px]
        sm:pt-[50px]
        lg:pt-[108px]
        xl:pt-[107px]
        2xl:pt-[102px]
        h-full
      "
    >
      <h1
        v-motion
        :initial="{
          opacity: 0,
          x: -30,
          transition: {
            duration: 320,
          },
        }"
        :enter="{
          opacity: 1,
          x: 0,
          transition: {
            duration: 320,
          },
        }"
        class="
          relative
          z-[2]
          -xs
          mx-auto
          lg:mx-0
          xl:mx-0
          opacity-0
          text-[#FAFAFA] text-center
          lg:text-left
          font-title
          xl:font-[700]
          lg:font-semibold
          pb-[8px]
          sm:pb-[22px]
          xl:pb-[22px]
          lg:pb-[26px]
          md:leading-[62.4px]
          lg:leading-[65px]
          xl:leading-[70.2px]
          md:tracking-[0.05rem]
          lg:tracking-[0.09rem]
          xl:tracking-[0.06rem]
          text-[32px]
          font-[700] font-tile
          leading-[41.6px]
          tracking-[0.64px]
          sm:text-[48px]
          md:font-[700]
          lg:text-[50px]
          xl:text-[54px]
          max-w-[300px]
          sm:max-w-[490px]
          md:max-w-full
          lg:max-w-[410px]
          xl:max-w-[499px]
        "
        v-text="config.tickets.title"
      />
      <h2
        v-motion
        class="
          relative
          z-[2]
          mx-auto
          lg:mx-0
          sm:text-xl
          opacity-0
          lg:text-xl
          sm:leading-[30px]
          lg:leading-[30px]
          text-[14px]
          font-[400]
          leading-[21px]
          text-[#F4F4F5] text-center
          lg:text-left
          max-w-[290px]
          sm:max-w-[440px]
          md:max-w-[620px]
          lg:max-w-[410px]
          xl:max-w-[499px]
        "
        :initial="{
          opacity: 0,
          x: -15,
          transition: {
            duration: 320,
          },
        }"
        :visibleOnce="{
          opacity: 1,
          x: 0,
          transition: {
            duration: 320,
          },
        }"
        :delay="150"
        v-text="config.tickets.subtitle"
      />

      <div
        class="
          absolute
          rotate-[10deg]
          right-[-5rem]
          bottom-[13.8rem]
          md:right-[-7.5rem] md:bottom-[5rem]
          lg:top-[-4rem] lg:right-[-10.6rem] lg:bottom-auto
          xl:top-[-0rem] xl:right-0
          2xl:top-0 2xl:right-[-4rem]
        "
      >
        <figure class="rotate-[-8.05deg] lg:rotate-0">
          <nuxt-img
            src="/tickets/hero.webp"
            alt="Hero illustration"
            quality="100"
            sizes="360:474px"
            class="
              shrink-0
              min-h-[370px] min-w-[464px]
              max-w-min
              md:min-h-[787px] md:min-w-[956px]
            "
          />
        </figure>
      </div>

      <div class="mt-auto md:mt-[-28px]">
        <div
          class="
            lg:text-left
            sm:flex
            z-[2]
            w-full
            relative
            sm:mt-0 sm:mx-auto
            lg:mx-0
            sm:space-x-6
            space-y-4
            sm:space-y-0 sm:max-w-max
            lg:max-w-[499px]
            xl:max-w-[499px]
            sm:pt-[32px]
            md:pt-[34px]
            lg:pt-[31px]
            xl:pt-[34px]
          "
        >
          <Button
            v-motion
            text="Coming soon"
            disabled
            :with-icon="true"
            variant="hero-primary"
            class="
              w-full
              lg:w-auto
              max-w-full
              md:max-w-max
              opacity-0
            "
            :initial="{
              opacity: 0,
              x: -15,
              transition: {
                duration: 320,
              },
            }"
            :enter="{
              opacity: 1,
              x: 0,
              transition: {
                duration: 320,
              },
            }"
            :delay="300"
          />

          <Button
            v-motion
            variant="tertiary"
            text="Documentation"
            disabled
            class="
              w-full
              lg:w-auto
              max-w-full
              md:max-w-max
              opacity-0
            "
            :initial="{
              opacity: 0,
              x: -15,
              transition: {
                duration: 320,
              },
            }"
            :enter="{
              opacity: 1,
              x: 0,
              transition: {
                duration: 320,
              },
            }"
            :delay="450"
          />
        </div>

        <div
          v-motion
          :initial="{
            opacity: 0,
            x: -15,
            transition: {
              duration: 320,
            },
          }"
          :enter="{
            opacity: 1,
            x: 0,
            transition: {
              duration: 320,
            },
          }"
          :delay="450"
          class="
            sm:space-x-6
            w-full
            flex flex-col
            sm:flex-row sm:items-center
            opacity-0
            pt-[24px]
          "
        >
          <span
            class="
              text-white
              mb-[8px]
              sm:mb-0
              font-semibold
              tracking-[0.05rem]
              lg:text-xl lg:leading-[30px]
              xl:text-xl xl:leading-[30px]
              sm:text-lg sm:text-xl sm:leading-[30px]
            "
          >
            Building on
          </span>

          <div
            class="
              flex
              space-x-4
              lg:space-x-[18px]
              xl:space-x-4
            "
          >
            <LandingBlockchain
              v-for="{ icon, name } in config.chains.filter(
                ({ name }) => name === 'Near'
              )"
              :key="`landing-blockchain-label-${name}`"
              :icon="icon"
              :name="name"
            />
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>
