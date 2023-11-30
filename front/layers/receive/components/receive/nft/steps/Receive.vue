<script setup lang="ts">
withDefaults(
  defineProps<{
    data: any;
    link: string;
    isPrivate: boolean;
    isDisabled: boolean;
  }>(),
  {}
)

const emit = defineEmits([
  'reset',
  'deposit',
  'changeStep',
  'updateTokenValue',
  'updateAmountValue',
  'updateReceiveTypeValue'
])

const { account } = useOpactWallet()
</script>

<template>
  <CardBody>
    <CardHeader title="Enter receiving data" />

    <ReceiveType
      :selected="data.receiveType"
      @selected="emit('updateReceiveTypeValue', $event)"
    />

    <template v-if="isPrivate">
      <InputCopy
        label="Your private address"
        :value="account.address"
      />

      <ReceiveFromLink
        :link="data.link"
        @done="emit('reset')"
      />
    </template>

    <template v-else>
      <InputCopy
        label="Copy or share the custon payment link"
        :value="link"
      />

      <SelectWallet
        label="Connect wallet to deposit"
        @connected="emit('changeStep', 'payment')"
      />
    </template>
  </CardBody>
</template>
