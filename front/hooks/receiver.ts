/* eslint-disable @typescript-eslint/no-unused-vars */
import { reactive, computed } from 'vue'
import {
  poseidon,
  computeProof,
  base64urlToBigInt,
  formatInteger,
  computeTreeValues,
  getSoluctionDepositBatch,
  getUtxo,
  computeTransactionParams
} from 'opact-sdk'
import Pact from 'pact-lang-api'
import { form, FormType } from '~/components/payment/form'

export const RPC =
  process.env.NODE_ENV !== 'development'
    ? 'https://bpsd19dro1.execute-api.us-east-2.amazonaws.com/getdata'
    : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:5000/getdata'

// const getSoluctionDepositBatch = async ({
//   token,
//   amount,
//   pubkey,
//   receiverWallet,
// }: any) => {
//   let totalRequired = amount

//   if (typeof amount !== 'bigint') {
//     totalRequired = BigInt(formatInteger(amount, 12))
//   }

//   return {
//     delta: totalRequired,
//     utxosIn: [
//       getUtxo({ token, pubkey, amount: 0n }),
//       getUtxo({ token, pubkey, amount: 0n }),
//       getUtxo({ token, pubkey, amount: 0n }),
//     ],
//     utxosOut: [
//       getUtxo({ token, pubkey: receiverWallet, amount: totalRequired, publicAmount: String(amount) }),
//       getUtxo({ token, pubkey: receiverWallet, amount: 0n }),
//     ],
//   }
// }

const computeDepositParams = async (
  wallet: any,
  pubkey: any,
  amount: number,
  commitments?: any,
  sender?: string,
  selectedToken = {
    id: '',
    refName: {
      name: 'coin',
      namespace: ''
    },
    refSpec: {
      name: 'fungible-v2',
      namespace: ''
    }
  }
) => {
  const tokenHash = Pact.crypto.hash(JSON.stringify(selectedToken))

  const token = poseidon([base64urlToBigInt(tokenHash)])

  const batch = await getSoluctionDepositBatch({
    token,
    amount,
    pubkey: wallet.pubkey,
    receiverPubkey: pubkey
  })

  const {
    roots,
    newIns
  } = await computeTreeValues(batch, commitments)

  batch.utxosIn = [...newIns]

  const {
    args,
    extData,
    tokenSpec
  } = await computeTransactionParams({
    batch,
    amount,
    pubkey,
    fee: 1.0,
    relayer: 1,
    selectedToken,
    receiver: BigInt(pubkey).toString(),
    root: roots.tree.toString(),
    sender: sender || wallet.pubkey.toString()
  })

  const proof = await computeProof({
    batch,
    roots,
    token,
    wallet,
    pubkey: BigInt(pubkey),
    message: poseidon([base64urlToBigInt(args.extDataHash)])
  })

  return {
    args,
    proof,
    extData,
    tokenSpec
  }
}

export const useReceiver = () => {
  const data = reactive<any>({
    amount: '',
    error: '',
    address: '',
    balance: 0,
    loading: false,
    provider: null,
    commitments: null,
    depositing: false,
    showConnect: false,
    depositMessage: '',
    showCollapsible: false,
    token: {
      id: 1,
      icon: '/kda.png',
      name: 'Kadena',
      symbol: 'KDA'
    }
  })

  const route = useRoute()

  const params = computed<any>(() => {
    const [
      tokenId = '',
      amount = '',
      pubkey = ''
    ] = window.atob(route.params.params).split('-') || []


    return {
      tokenId,
      amount,
      pubkey
    }
  })

  const pubkey = computed(() => data.address || params.value.pubkey)

  const amount = computed(() => data.amount || params.value.amount)

  const tokenId = computed(() => 1 || params.value.tokenId)

  const buttonIsDisabled = computed(() => !pubkey.value || !amount.value)

  return {
    data,
    pubkey,
    amount,
    params,
    tokenId,
    buttonIsDisabled,
    computeDepositParams
  }
}

export const useReceiverForm = () => {
  const data = reactive<{ stepForm: FormType }>({
    stepForm: 'connect'
  })

  return {
    data,
    form
  }
}
