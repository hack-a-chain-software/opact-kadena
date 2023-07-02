<template>
  <Section class="pt-[140px] pb-[140px]">
    <div
      class="
        w-[630px]
        mx-auto
        px-[40px]
        py-[56px]
        text-white
        bg-[length:100%_100%]
        rounded-[16px]
        bg-[url('/contact/gradient.png')]
      "
    >
      <div class="pb-[8px]">
        <h2
          class="
            font-title font-[600]
            leading-[150%]
            text-[42px]
          "
        >
          Get in Touch with Opact
        </h2>
      </div>

      <div class="pb-[32px]">
        <h3 class="text-[20px] font-[500] leading-[150%]">
          Like our ZK solutions or need a different one?
          Let’s chat!
        </h3>
      </div>

      <form>
        <div class="flex flex-col">
          <div class="flex space-x-[24px] pb-[24px]">
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
            placeholder="Mensagem"
          />

          <Button
            variant="hero-secondary"
            text="Send a Message"
            class="mb-[32px]"
          />

          <div>
            <p
              class="font-[500] text-[20px] leading-[150%]"
            >
              Or get in touch with us on Telegram
            </p>
          </div>
        </div>
      </form>
    </div>
  </Section>
</template>
