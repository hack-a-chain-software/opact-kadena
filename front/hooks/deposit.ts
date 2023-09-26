/* eslint-disable @typescript-eslint/no-unused-vars */
import { reactive } from 'vue'
import {
  poseidon,
  computeProof,
  base64urlToBigInt,
  computeTreeValues,
  getSoluctionDepositBatch,
  computeTransactionParams
} from 'opact-sdk'
import Pact from 'pact-lang-api'
import { form, FormType } from '~/components/deposit/form'

export const RPC =
  process.env.NODE_ENV !== 'development'
    ? 'https://bpsd19dro1.execute-api.us-east-2.amazonaws.com/getdata'
    : 'http://ec2-34-235-122-42.compute-1.amazonaws.com:5000/getdata'

interface UseDepositInterface {
  mnemonic: string;
  stepForm: FormType;
}

export const computeDepositParams = async (
  wallet: any,
  amount: number,
  commitments?: any,
  receiver?: string,
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
    wallet
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
    wallet,
    receiver,
    fee: 1.0,
    relayer: 1,
    selectedToken,
    root: roots.tree.toString(),
    sender: wallet.pubkey.toString()
  })

  const proof = await computeProof({
    batch,
    roots,
    token,
    wallet,
    message: poseidon([base64urlToBigInt(args.extDataHash)])
  })

  return {
    args,
    proof,
    extData,
    tokenSpec
  }
}

export const useDeposit = () => {
  const data = reactive<UseDepositInterface>({
    mnemonic: '',
    stepForm: 'amount'
  })

  return {
    data,
    form
  }
}
