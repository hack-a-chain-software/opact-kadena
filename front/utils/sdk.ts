import {
  stripOZK,
  computeProof,
  getDepositSoluctionBatch,
  computeTransactionParams,
  getTransferSolutionBatchForNft,
  getTransferSolutionBatch
} from 'opact-sdk'

export const computeWihtdrawParams = async ({
  amount,
  receiver,
  wallet,
  treeBalance,
  receiptsParams,
  selectedToken
}: any) => {
  const batch = await getTransferSolutionBatch({
    treeBalance,
    selectedToken,
    senderWallet: wallet,
    totalRequired: amount
  })

  const {
    extData,
    message,
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
    message,
  })

  return {
    proof,
    batch,
    extData,
    tokenSpec: selectedToken
  }
}

export const computeTransferParamsForNFT = async ({
  amount,
  receiver,
  wallet,
  treeBalance,
  receiptsParams,
  selectedToken,
}: any) => {
  const batch = await getTransferSolutionBatchForNft({
    treeBalance,
    selectedToken,
    senderWallet: wallet,
    totalRequired: amount,
    receiverPubkey: `0x${stripOZK(receiver)}`
  })

  const {
    extData,
    message
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
    message
  })

  return {
    proof,
    batch,
    extData,
    tokenSpec: selectedToken
  }

}

export const computeWihtdrawParamsForNFT = async ({
  amount,
  receiver,
  wallet,
  treeBalance,
  receiptsParams,
  selectedToken
}: any) => {
  const batch = await getTransferSolutionBatchForNft({
    treeBalance,
    selectedToken,
    senderWallet: wallet,
    totalRequired: amount
  })

  const {
    extData,
    message,
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
    message
  })

  return {
    proof,
    batch,
    extData,
    tokenSpec: selectedToken
  }
}

export const computeTransferParams = async ({
  amount,
  receiver,
  wallet,
  treeBalance,
  receiptsParams,
  selectedToken
}: any) => {
  const batch = await getTransferSolutionBatch({
    treeBalance,
    selectedToken,
    senderWallet: wallet,
    totalRequired: amount,
    receiverPubkey: `0x${stripOZK(receiver)}`
  })

  const {
    extData,
    message,
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
    message
  })

  return {
    proof,
    batch,
    extData,
    tokenSpec: selectedToken
  }
}

export const computeDepositParams = async ({
  wallet,
  amount,
  sender,
  receiver,
  receiptsParams,
  selectedToken,
}: any) => {
  const batch = await getDepositSoluctionBatch({
    selectedToken,
    treeBalance: {},
    senderWallet: wallet,
    totalRequired: amount
  })

  const {
    extData,
    message
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
    message,
  })

  return {
    proof,
    batch,
    extData,
    tokenSpec: selectedToken
  }
}

export const computePaymentParams = async ({
  pubkey,
  amount,
  sender,
  selectedToken,
  receiptsParams,
  wallet = {
    pubkey: "11266420894616539307519683389038109246654130435849311470670815520318096498921",
    pvtkey: "1482393132684423265528213543145697981060187089163992385907820405516567711584"
  },
}: any) => {
  const batch = await getDepositSoluctionBatch({
    selectedToken,
    senderWallet: wallet,
    totalRequired: amount,
    receiverPubkey: pubkey
  })

  const {
    message,
    extData,
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
    message
  })

  return {
    proof,
    extData,
    tokenSpec: selectedToken
  }
}
