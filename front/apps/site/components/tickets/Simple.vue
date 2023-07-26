<template>
  <Section
    id="privacy"
    class="
      pt-[240px]
      pb-[205px]
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
            text-[54px]
            font-[600]
            leading-[120%]
            text-[#FAFAFA]
          "
        >
          Simple to use
        </h2>
      </div>

      <div class="max-w-[700px] mx-auto">
        <p
          class="
            text-[#BDBDBD] text-[28px] text-center
            font-[500]
            leading-[150%]
          "
        >
          Deposit funds, carefully save your ticket, use it
          to withdraw. That’s it, you’re
          <strong>private now.</strong>
        </p>
      </div>

      <div class="pt-[24px]">
        <Button
          withIcon
          variant="secondary"
          text="Go to Opact Tickets"
          href="https://hideyour.cash/"
        />
      </div>
    </div>
  </Section>
</template>
