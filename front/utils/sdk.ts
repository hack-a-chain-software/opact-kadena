import {
  poseidon,
  computeProof,
  base64urlToBigInt,
  getDepositSoluctionBatch,
  computeTransactionParams,
  getTransferSolutionBatchForNft,
  getTransferSolutionBatch
} from 'opact-sdk'

export const computeWihtdrawParams = async (
  amount: number,
  receiver: string,
  wallet: any,
  treeBalance: any,
  receiptsParams?: any,
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
    treeBalance,
    selectedToken,
    senderWallet: wallet,
    totalRequired: amount
  })

  const {
    args,
    extData,
    tokenSpec
  } = computeTransactionParams({
    batch,
    receiver,
    selectedToken,
    receiptsParams,
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
    batch,
    extData,
    tokenSpec
  }
}

export const computeTransferParamsForNFT = async (
  amount: number,
  receiver: string,
  wallet: any,
  treeBalance: any,
  receiptsParams?: any,
  selectedToken: any,
) => {
  const batch = await getTransferSolutionBatchForNft({
    treeBalance,
    selectedToken,
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
    amount: 0,
    selectedToken,
    receiptsParams,
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
    batch,
    extData,
    tokenSpec
  }

}

export const computeWihtdrawParamsForNFT = async (
  amount: number,
  receiver: string,
  wallet: any,
  treeBalance: any,
  receiptsParams?: any,
  selectedToken: any
) => {
  const batch = await getTransferSolutionBatchForNft({
    treeBalance,
    selectedToken,
    senderWallet: wallet,
    totalRequired: amount
  })

  const {
    args,
    extData,
    tokenSpec
  } = computeTransactionParams({
    batch,
    receiver,
    selectedToken,
    receiptsParams,
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
    batch,
    extData,
    tokenSpec
  }
}

export const computeTransferParams = async (
  amount: number,
  receiver: string,
  wallet: any,
  treeBalance: any,
  receiptsParams?: any,
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
    treeBalance,
    selectedToken,
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
    amount: 0,
    selectedToken,
    receiptsParams,
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
    batch,
    extData,
    tokenSpec
  }
}

export const computeDepositParams = async (
  wallet: any,
  amount: number,
  sender?: any,
  receiver?: string,
  receiptsParams?: any,
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
    selectedToken,
    receiptsParams,
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
    batch,
    extData,
    tokenSpec
  }
}

export const computePaymentParams = async (
  pubkey: any,
  amount: number,
  sender?: string,
  receiptsParams?: any,
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
  },
  wallet = {
    pubkey: 11266420894616539307519683389038109246654130435849311470670815520318096498921n,
    pvtkey: 1482393132684423265528213543145697981060187089163992385907820405516567711584n
  },
) => {
  const batch = await getDepositSoluctionBatch({
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
    selectedToken,
    receiptsParams,
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
