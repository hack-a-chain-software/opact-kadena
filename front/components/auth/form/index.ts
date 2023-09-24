import Connect from './Connect.vue'
import Create from './Create.vue'
import Method from './Method.vue'
import Mnemonic from './Mnemonic.vue'
import Recovery from './Recovery.vue'
import Verify from './Verify.vue'

export const form = {
  create: Create,
  connect: Connect,
  recovery: Recovery,
  method: Method,
  mnemonic: Mnemonic,
  verify: Verify
}

export type FormType = 'create' | 'connect' | 'recovery' | 'method' | 'mnemonic' | 'verify'
