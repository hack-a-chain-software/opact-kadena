import {
  getData,
  setData
} from 'nuxt-storage/local-storage'

export const useStateStorage = (
  utxosKey = 'opact-wallet:state:cache',
  currentIdKey = 'opact-wallet:state:id:cache',
  receiptsKey = 'opact-wallet:receipts:cache'
) => {
  const get = () => {
    const storedUtxos = (getData(utxosKey) || []).map(
      (item: any) => JSON.parse(item)
    )
    const currentId = getData(currentIdKey) || 268
    const storedReceipts = getData(receiptsKey) || []

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

    setData(utxosKey, map)
    setData(receiptsKey, receipts)

    if (currentId) {
      setData(currentIdKey, currentId)
    }
  }

  const clear = () => {
    setData(utxosKey, [])
    setData(receiptsKey, [])
  }

  return { store, clear, get }
}
