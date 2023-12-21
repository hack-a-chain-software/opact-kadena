<script setup lang="ts">
const redirect = (path = 'https://tickets.opact.io') =>
  window.open(path, '_blank')
</script>

<template>
  <UISection
    id="privacy"
    class="
      pt-[200px]
      pb-[194px]
      md:pt-[240px] md:pb-[205px]
      lg:py-[260px]
      xl:py-[300px]
      relative
      overflow-hidden
      flex-col
    "
  >
    <figure
      class="
        pointer-events-none
        select-none
        absolute
        top-0
        left-0
        z-[-1]
      "
    >
      <nuxt-img
        quality="100"
        loading="lazy"
        src="/tickets/simple.png"
        alt="Illustrative image"
        class="select-none w-[733px]"
      />
    </figure>

    <div
      class="
        mx-auto
        max-w-[790px]
        text-center
        space-y-[24px]
      "
    >
      <div>
        <h2
          class="
            font-tile
            text-[30px]
            font-[600]
            leading-[36px]
            tracking-[-0.9px]
            md:text-[54px] md:font-[600] md:leading-[120%]
            text-[#FAFAFA]
          "
        >
          Simple to use
        </h2>
      </div>

      <div class="max-w-[700px] mx-auto">
        <p
          class="
            text-[#BDBDBD]
            md:text-[28px]
            text-center
            md:font-[500] md:leading-[150%]
            text-[18px]
            font-[500]
            leading-[150%]
          "
        >
          Deposit funds, carefully save your ticket, use it
          to withdraw. That’s it, you’re
          <strong>private now.</strong>
        </p>
      </div>

      <div class="pt-[2px] md:pt-[24px]">
        <UIButton
          withIcon
          variant="secondary"
          @click="redirect()"
          text="Go to Opact Tickets"
        />
      </div>
    </div>
  </UISection>
</template>
