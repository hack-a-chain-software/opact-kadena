import {
  poseidon,
  computeProof,
  base64urlToBigInt,
  getDepositSoluctionBatch,
  computeTransactionParams,
  getTransferSolutionBatch
} from 'opact-sdk'

export const computeWihtdrawParams = async (
  amount: number,
  receiver: string,
  wallet: any,
  commitments: any,
  treeBalance: any,
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
  const batch = await getTransferSolutionBatch({
    commitments,
    treeBalance,
    selectedToken,
    senderWallet: wallet,
    totalRequired: amount,
  })

  const {
    args,
    extData,
    tokenSpec
  } = computeTransactionParams({
    batch,
    receiver,
    fee: 1.0,
    relayer: 1,
    selectedToken,
    amount: amount * (-1),
    sender: wallet.pubkey.toString(),
    root: batch.roots.tree.toString()
  })

  const proof = await computeProof({
    batch,
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

export const computeTransferParams = async (
  amount: number,
  receiver: string,
  wallet: any,
  commitments: any,
  treeBalance: any,
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
  const batch = await getTransferSolutionBatch({
    commitments,
    treeBalance,
    senderWallet: wallet,
    totalRequired: amount,
    receiverPubkey: `0x${receiver}`
  })

  const {
    args,
    extData,
    tokenSpec
  } = computeTransactionParams({
    batch,
    receiver,
    fee: 0.0,
    amount: 0,
    relayer: 1,
    selectedToken,
    root: batch.roots.tree.toString(),
    sender: wallet.pubkey.toString()
  })

  const proof = await computeProof({
    batch,
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

export const computeDepositParams = async (
  wallet: any,
  amount: number,
  commitments?: any,
  sender?: any,
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
  const batch = await getDepositSoluctionBatch({
    commitments,
    selectedToken,
    treeBalance: {},
    senderWallet: wallet,
    totalRequired: amount
  })

  const {
    args,
    extData,
    tokenSpec
  } = await computeTransactionParams({
    batch,
    amount,
    sender,
    receiver,
    fee: 1.0,
    relayer: 1,
    selectedToken,
    root: batch.roots.tree.toString()
  })

  const proof = await computeProof({
    batch,
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

export const computePaymentParams = async (
  pubkey: any,
  amount: number,
  commitments?: any,
  sender?: string,
  wallet = {
    pubkey: 11266420894616539307519683389038109246654130435849311470670815520318096498921n,
    pvtkey: 1482393132684423265528213543145697981060187089163992385907820405516567711584n
  },
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
  const batch = await getDepositSoluctionBatch({
    commitments,
    selectedToken,
    senderWallet: wallet,
    totalRequired: amount,
    receiverPubkey: pubkey
  })

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
    receiver: pubkey,
    root: batch.roots.tree.toString(),
    sender: sender || wallet.pubkey.toString()
  })

  const proof = await computeProof({
    batch,
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
