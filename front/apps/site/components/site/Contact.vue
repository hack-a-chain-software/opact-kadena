<template>
  <Section
    id="contact"
    class="
      pt-[90px]
      pb-[40px]
      md:pt-[120px] md:pb-[120px]
      lg:pt-[140px] lg:pb-[140px]
    "
  >
    <div
      class="
        w-full
        lg:w-[630px]
        mx-auto
        px-4
        md:px-[40px]
        py-6
        md:py-[48px]
        lg:py-[56px]
        text-white
        bg-[length:100%_100%]
        rounded-[16px]
        bg-[url('/contact/gradient.png')]
      "
    >
      <div class="pb-[0px] md:pb-[8px]">
        <h2
          class="
            font-title font-[600]
            leading-[150%]
            text-[24px]
            md:font-[600] md:leading-[150%] md:text-[42px]
          "
        >
          Get in Touch with Opact
        </h2>
      </div>

      <div class="pb-[38px] md:pb-[32px]">
        <h3
          class="
            text-[16px]
            font-[500]
            leading-[150%]
            md:text-[20px] md:font-[500] md:leading-[150%]
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
              space-y-[24px]
              md:space-y-0 md:space-x-[24px]
              pb-[24px]
            "
          >
            <input
              class="
                w-full
                px-[20px]
                py-[18px]
                rounded-[8px]
                text-[16px]
                font-title
                leading-[20px]
                text-dark-blue
                placeholder:text-dark-blue
              "
              placeholder="Nome"
            />

            <input
              class="
                w-full
                px-[20px]
                py-[18px]
                rounded-[8px]
                text-[16px]
                font-title
                leading-[20px]
                placeholder:text-dark-blue
              "
              placeholder="E-mail"
            />
          </div>

          <textarea
            class="
              px-[20px]
              py-[18px]
              rounded-[8px]
              text-[16px]
              font-title
              leading-[20px]
              mb-[21px]
              min-h-[110px]
              text-dark-blue
              placeholder:text-dark-blue
            "
            placeholder="Leave your message"
          />

          <Button
            variant="hero-secondary"
            text="Send a Message"
            class="mb-[32px]"
          />

          <div>
            <p
              class="
                font-[500]
                text-[18px]
                leading-[150%]
                md:font-[500]
                md:text-[20px]
                md:leading-[150%]
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
