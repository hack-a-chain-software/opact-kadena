import localforage from 'localforage'

export const useStateStorage = (
  utxosKey = 'opact-wallet:state:cache',
  currentIdKey = 'opact-wallet:state:id:cache',
  receiptsKey = 'opact-wallet:receipts:cache'
) => {
  const exists = async (path: string): Promise<boolean> => {
    return (await localforage.getItem(path)) != null
  }

  const get = async () => {
    const utxos = await localforage.getItem(utxosKey) as any

    const storedUtxos = (utxos || []).map(
      (item: any) => JSON.parse(item)
    )

    const current = await localforage.getItem(currentIdKey) as any

    const currentId = current || 268

    const receipts = await localforage.getItem(receiptsKey) as any

    const storedReceipts = receipts || []

    return {
      storedUtxos,
      storedReceipts,
      currentId
    }
  }

  const store = (
    userData: any,
    receipts: any[],
    currentId?: any
  ) => {
    const values = []

    const treeBalances = {
      ...userData.nfts,
      ...userData.tokens
    }

    if (treeBalances.coin) {
      values.push(...treeBalances.coin.utxos)
    }

    if (treeBalances['opact-coin']) {
      values.push(...treeBalances['opact-coin'].utxos)
    }

    if (treeBalances['poly-fungible-v2-reference']) {
      values.push(
        ...treeBalances['poly-fungible-v2-reference'].utxos
      )
    }

    const map = values.map((item: any) =>
      JSON.stringify(item, (_, value) => {
        return typeof value === 'bigint'
          ? value.toString()
          : value
      })
    )

    localforage.setItem(utxosKey, map)
    localforage.setItem(receiptsKey, receipts)

    if (currentId) {
      localforage.setItem(currentIdKey, currentId)
    }
  }

  const clear = () => {
    localforage.setItem(utxosKey, [])
    localforage.setItem(receiptsKey, [])
    localforage.setItem(currentIdKey, 268)
  }

  return { store, clear, get, exists }
}
