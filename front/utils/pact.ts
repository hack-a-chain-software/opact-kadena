export const pactCommandToSigningRequest = (
  parsedTransaction: any,
): any => {
  return {
    code: parsedTransaction.payload.exec.code ?? '',
    envData: parsedTransaction.payload.exec.data as { [key: string]: unknown },
    caps: parsedTransaction.signers.flatMap((signer: any) => {
    if (signer.clist === undefined) {
        return [];
    }
    return signer.clist.map(({ name, args }: any) => {
        const nameArr = name.split('.');

        return {
        role: nameArr[nameArr.length - 1],
        description: `Description for ${name}`,
        cap: {
            name,
            args,
        },
        };
    });
    }),
    nonce: parsedTransaction.nonce,
    chainId: parsedTransaction.meta.chainId,
    gasLimit: parsedTransaction.meta.gasLimit,
    gasPrice: parsedTransaction.meta.gasPrice,
    sender: parsedTransaction.meta.sender,
    ttl: parsedTransaction.meta.ttl,
  };
};
  