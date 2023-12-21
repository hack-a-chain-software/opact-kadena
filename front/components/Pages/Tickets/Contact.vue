<script setup lang="ts">
import { reactive } from 'vue'

const baseForm = {
  name: '',
  email: '',
  message: ''
}

const state = reactive({
  sending: false,
  form: {
    ...baseForm
  }
})

const onSubmit = async () => {
  if (state.sending) {
    return
  }

  state.sending = true

  try {
    await useFetch(
      'https://formsubmit.co/ajax/opact@hackachain.io',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state.form)
      }
    )

    state.form = { ...baseForm }
  } catch (e) {
    console.warn(e)
  } finally {
    state.sending = false
  }
}
</script>

<template>
  <UISection
    id="contact"
    class="pt-[90px] pb-10 md:!py-[120px] lg:!py-[140px]"
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
        bg-[url('/contact/gradient.webp')]
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
        <h3 class="font-medium leading-normal md:text-xl">
          Like our solutions or need a different one? Let’s
          chat!
        </h3>
      </div>

      <form @submit.prevent="onSubmit">
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
              v-model="state.form.name"
              :disabled="state.sending"
              placeholder="Name"
              required
            />

            <Input
              v-model="state.form.email"
              :disabled="state.sending"
              placeholder="E-mail"
              type="email"
              class="disabled:opacity-[0.4]"
              required
            />
          </div>

          <TextArea
            v-model="state.form.message"
            required
            :disabled="state.sending"
            placeholder="Leave your message"
          />

          <div class="mb-8">
            <div
              v-if="state.sending"
              class="
                h-[36px]
                md:h-[51px]
                w-[200px]
                rounded-[100px]
                bg-white
                flex
                items-center
                justify-center
                xl:mt-[1.6rem]
                opacity-[0.4]
              "
            >
              <Icon name="spinner" class="animate-spin" />
            </div>

            <UIButton
              v-else
              type="submit"
              variant="hero-secondary"
              text="Send a Message"
            />
          </div>

          <div>
            <p
              class="
                font-medium
                text-lg
                leading-normal
                md:text-xl
              "
            >
              Or get in touch with us on
              <span class="underline">Telegram</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  </UISection>
</template>
