<script setup lang="ts">
// import { useForm } from 'vee-validate'
// import { object, string } from 'yup'
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

// const { handleSubmit } = useForm({
//   validationSchema: object({
//     name: string().label('name'),
//     email: string().label('email')
//     // message: string().required().label('Message')
//   })
// })

// const data = reactive()

// const onSubmit = handleSubmit(async (values) => {
//   console.log('fooooo')
//   console.log(values)

// const { data } = await useFetch(
//   'https://formsubmit.co/ajax/mateus@opact.io',
//   {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(values)
//   }
// )

// console.log(data)
// })

const onSubmit = async () => {
  if (state.sending) {
    return
  }

  state.sending = true

  try {
    const { data } = await useFetch(
      'https://formsubmit.co/ajax/mateus@opact.io',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state.form)
      }
    )

    state.form = { ...baseForm }

    console.log(data)
  } catch (e) {
    console.warn(e)
  } finally {
    state.sending = false
  }
}
</script>

<template>
  <Section
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
        <h3 class="font-medium leading-normal md:text-xl">
          Like our ZK solutions or need a different one?
          Let’s chat!
        </h3>
      </div>

      <form
        @submit.prevent="onSubmit"
      >
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
            <Input v-model="state.form.name" :disabled="state.sending" placeholder="Name" name="Name" />

            <Input v-model="state.form.email" :disabled="state.sending" placeholder="E-mail" name="Email" />
          </div>

          <TextArea v-model="state.form.message" :disabled="state.sending" placeholder="Leave your message" />

          <Button
            variant="hero-secondary"
            text="Send a Message"
            class="mb-8"
            tag="button"
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
