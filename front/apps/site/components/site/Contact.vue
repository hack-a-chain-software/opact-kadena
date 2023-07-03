<template>
  <Section
    id="contact"
    class="
      pt-[90px]
      pb-10
      md:!py-[120px]
      lg:!py-[140px]
    "
  >
    <div
      class="
        w-full
        lg:w-[630px]
        mx-auto
        px-4
        md:px-10
        py-6
        md:py-12
        lg:py-14
        text-white
        bg-[length:100%_100%]
        rounded-2xl
        bg-[url('/contact/gradient.png')]
      "
    >
      <div class="pb-[0px] md:pb-[8px]">
        <h2
          class="
            font-title font-semibold
            leading-normal
            text-2xl
            md:text-[42px]
          "
        >
          Get in Touch with Opact
        </h2>
      </div>

      <div class="pb-[38px] md:pb-8">
        <h3
          class="
            font-medium
            leading-normal
            md:text-xl
          "
        >
          Like our ZK solutions or need a different one?
          Let’s chat!
        </h3>
      </div>

      <form>
        <div class="flex flex-col">
          <div
            class="
              flex flex-col
              md:flex-row
              space-y-6
              md:space-y-0 md:space-x-6
              pb-6
            "
          >
            <Input
              placeholder="Name"
            />

            <Input
              placeholder="E-mail"
            />
          </div>

          <TextArea
            placeholder="Leave your message"
          />

          <Button
            variant="hero-secondary"
            text="Send a Message"
            class="mb-8"
          />

          <div>
            <p
              class="
                font-medium
                text-lg
                leading-normal
                md:text-xl
              "
            >
              Or get in touch with us on Telegram
            </p>
          </div>
        </div>
      </form>
    </div>
  </Section>
</template>
