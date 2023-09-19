import axios from 'axios'
// import { blake2b } from 'blakets'
import Pact from 'pact-lang-api'
import { defineStore } from 'pinia'
// import { blake2b256 } from '@multiformats/blake2/blake2b'
// // import { blake2b } from "ethereum-cryptography/blake2b.js";
// import { utf8ToBytes } from "ethereum-cryptography/utils.js";
// import { bytesToHex as toHex } from "ethereum-cryptography/utils.js";

const PROOF_LENGTH = 32

const EXPECTED_VALUE = 11954255677048767585730959529592939615262310191150853775895456173962480955685n

const computeLocalTestnet = async (data: any, wallet?: any, decrypt?: any, getUtxoFromDecrypted?: any) => {
  return data
    .sort((a: any, b: any) => a.txid - b.txid)
    .map(({ events }: any) => events)
    .reduce((acc: any, curr: any) => acc.concat(curr), [])
    .reduce((curr: any, event: any) => {
      if (event.name === 'new-nullifier') {
        curr.nullifiers = [...curr.nullifiers, ...event.params.reduce((acc: any, param: any) => {
          if (Array.isArray(param)) {
            return [...acc, ...param.map((parm: any) => parm.int)]
          }

          return [param.int]
        }, [])]
      }

      if (event.name === 'new-commitment') {
        const commitment = {
          value: event.params[0].int,
          order: event.params[1].int
        }

        curr.commitments = [...curr.commitments, commitment]

        if (wallet && decrypt && event.params[2].length > 1) {
          try {
            const value = getUtxoFromDecrypted(decrypt({
              wallet,
              encrypted: event.params[2]
            }))

            curr.decryptedData = [...curr.decryptedData, value]
          } catch (e) {
            // console.warn(e)
          }
        }
      }

      return curr
    }, {
      nullifiers: [],
      commitments: [],
      decryptedData: []
    })
}

export const getPublicArgs = (
  proof: any,
  publicSignals: string[]
): any => {
  return {
    public_values: publicSignals,
    a: {
      x: proof.pi_a[0],
      y: proof.pi_a[1]
    },
    b: {
      x: proof.pi_b[0],
      y: proof.pi_b[1]
    },
    c: {
      x: proof.pi_c[0],
      y: proof.pi_c[1]
    }
  }
}

function base64urlToBigInt (base64url: string) {
  // Passo 1: Converter a string base64-url para a forma padrão de base64
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/')
  const padding = '='.repeat((4 - base64.length % 4) % 4)
  base64 += padding

  // Passo 2: Decodificar a string base64 para obter bytes
  const bytes = atob(base64)

  // Passo 3: Converter esses bytes em um bigint
  let bigint = BigInt(0)
  for (let i = 0; i < bytes.length; i++) {
    bigint = (bigint << BigInt(8)) + BigInt(bytes.charCodeAt(i))
  }

  return bigint
}

const chunkUtxoByTokenId = (encrypted: any) => {
  return encrypted.reduce((acc: any, curr: any) => {
    if (!acc[curr.tokenId]) {
      acc[curr.tokenId] = {
        balance: 0n,
        publicAmount: 0,
        utxos: [],
        token: {
          id: 1,
          decimals: 12,
          symbol: 'KDA',
          name: 'Kadena',
          icon: '/kda.png'
        }
      }
    }

    acc[curr.tokenId].utxos = [...encrypted]
    acc[curr.tokenId].balance += BigInt(curr.amount)
    acc[curr.tokenId].publicAmount += Number(curr.publicAmount)

    return acc
  }, {})
}

export const useWalletStore = defineStore({
  id: 'opact-wallet',
  state: (): any => {
    const { cache } = useAuthStorage()

    return {
      cache,
      userData: null,

      balance: 0,

      mnemonic: '',

      node: null,
      chain: null,
      state: null,
      provider: null,
      depositing: false,
      depositMessage: 'Generating ZK Proof...',

      isLoading: true
    }
  },

  getters: {
    connected: (state: any): boolean => {
      const { node } = state

      if (!node) {
        return false
      }

      return true
    },
    truncatedAddress: (state: any): string =>
      shortenAddress(state.node.address)
  },
  actions: {
    async loadState (decrypt: any, getUtxoFromDecrypted: any) {
      this.isLoading = true

      const { data } = await axios.get('http://ec2-34-235-122-42.compute-1.amazonaws.com:5000/getdata', {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })

      const state = await computeLocalTestnet(data, this.node, decrypt, getUtxoFromDecrypted)

      const userData = chunkUtxoByTokenId(state.decryptedData)

      this.state = state
      this.userData = userData
      this.isLoading = false

      return state
    },

    async found () {
      if (process.server) {
        return
      }

      const {
        getHDWalletFromMnemonic
      } = await getSdk() || {}

      const node: any = await getHDWalletFromMnemonic(this.mnemonic)

      this.node = node

      this.persistAuth(node)
    },

    async recovery (phrase: string) {
      if (process.server) {
        return
      }

      const {
        getHDWalletFromMnemonic
      } = await getSdk() || {}

      const node: any = await getHDWalletFromMnemonic(phrase)

      this.node = node

      this.persistAuth(node)

      return node
    },

    async reconnect () {
      return await this.recovery(this.cache.phrase)
    },

    persistAuth (node: any) {
      const { store } = useAuthStorage()

      this.node = node
      this.cache = { phrase: node.mnemonic }

      store({
        phrase: node.mnemonic
      })
    },

    async newMnemonic () {
      if (process.server) {
        return
      }

      const {
        generateMnemonic
      } = await getSdk() || {}

      const mnemonic = generateMnemonic()

      this.mnemonic = mnemonic
    },

    async encrypt () {
      if (process.server) {
        return
      }

      const {
        encrypt
      } = await getSdk() || {}

      const encrypted = await encrypt(
        JSON.stringify(utxo),
        {
          pvtkey: this.node.pvtkey << 4n,
          rawBig: this.node.rawBig
        }
      )

      return encrypted
    },

    async decrypt (encrypted: any) {
      if (process.server) {
        return
      }

      const {
        decrypt,
        getUtxoFromDecrypted
      } = await getSdk() || {}

      const decrypted = await decrypt({
        ...encrypted,
        wallet: {
          pvtkey: this.node.pvtkey << 4n,
          rawBig: this.node.rawBig
        }
      })

      return getUtxoFromDecrypted(decrypted)
    },

    async withdraw (amount: number, receiver: string) {
      if (process.server) {
        return
      }

      const wallet = this.node

      const sender = wallet.pubkey.toString()

      const recipient = receiver || sender

      const objToken = {
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

      const {
        MerkleTree,
        computeInputs,
        getPoseidon,
        formatInteger,
        MerkleTreeService,
        getSolutionBatch
      } = await getSdk() || {}

      // TODO: can't repeat
      const token = 1370936226568302813532745146573950302969461377698909928989653637014649273380n

      const integer = await formatInteger(amount, 12)

      const batch = await getSolutionBatch({
        wallet: this.node,
        publicAmount: amount,
        treeBalance: {
          ...this.userData[1],
          token
        },
        totalRequired: BigInt(integer),
        excludedUTXOIDPositions: []
      })

      const objExtada = {
        sender,
        recipient,
        fee: 1.0,
        relayer: 1,
        extAmount: amount,
        encryptedValue: 1,
        encryptedOutput1: batch.encryptedOutput1,
        encryptedOutput2: batch.encryptedOutput2
      }

      const poseidon = await getPoseidon()

      const tokenHash = Pact.crypto.hash(JSON.stringify(objToken))

      const extDataHash = Pact.crypto.hash(JSON.stringify(objExtada))

      // TODO: can't repeat
      const messageHash = poseidon([base64urlToBigInt(extDataHash)]) + BigInt(2)

      const tree = await (new MerkleTreeService()).initMerkleTree(
        [
          0,
          ...this.state.commitments.slice(2).map((comm: any) => BigInt(comm.value))
        ]
      )

      const subtree = await MerkleTree.build(PROOF_LENGTH + 1)

      const sparseTreeComitments = Array(12).fill(2n)

      batch.utxosIn = batch.utxosIn.map((utxo: any, i:any) => {
        const base = {
          core: {
            token: BigInt(utxo.core.token),
            amount: BigInt(utxo.core.amount),
            blinding: BigInt(utxo.core.blinding),
            pubkey: BigInt(utxo.core.pubkey)
          },
          hash: BigInt(utxo.hash),
          owner: BigInt(utxo.owner),
          token: BigInt(utxo.token),
          nullifier: BigInt(utxo.nullifier)
        }

        if (utxo.amount === 0n) {
          return {
            ...base,
            mp_path: i,
            mp_sibling: tree.path(i).pathElements
          }
        }

        const index = tree.indexOf(BigInt(utxo.hash))

        sparseTreeComitments[index] = EXPECTED_VALUE

        return {
          ...base,
          mp_path: index,
          mp_sibling: tree.proof(BigInt(utxo.hash)).pathElements
        }
      })

      subtree.pushMany(sparseTreeComitments)

      batch.utxosIn = batch.utxosIn.map((utxo: any, i: any) => {
        const { order } = this.state.commitments.find(({ value }: any) => BigInt(value) === utxo.hash) || {}

        if (order) {
          return {
            ...utxo,
            smp_path: subtree.proof(order - 1)
          }
        }

        return {
          ...utxo,
          smp_path: subtree.proof(i)
        }
      })

      const { inputs } = await computeInputs({
        batch,
        wallet,
        token,
        messageHash,
        roots: {
          tree: tree.root,
          subtree: subtree.root
        }
      })

      // @ts-expect-error
      const { groth16 } = await import('snarkjs')

      const {
        proof,
        publicSignals
      } = await groth16.fullProve(
        inputs,
        '/transaction.wasm',
        '/transaction_0001.zkey'
      )

      return {
        proof: {
          ...getPublicArgs(proof, publicSignals)
        },
        extData: {
          ...objExtada
        },
        tokenSpec: {
          ...objToken
        },
        args: {
          tokenHash,
          extDataHash,
          publicAmount: amount,
          root: tree.root.toString(),
          outputCommitments: batch.utxosOut.map((utxo: any) => utxo.hash.toString())
        }
      }
    },

    async deposit (amount: number, receiver?: string) {
      if (process.server) {
        return
      }

      this.depositing = true

      const wallet = this.node

      const sender = wallet.pubkey.toString()

      const recipient = receiver || sender

      const objToken = {
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

      const {
        MerkleTree,
        computeInputs,
        getPoseidon,
        formatInteger,
        MerkleTreeService,
        getSoluctionDepositBatch
      } = await getSdk() || {}

      // TODO: can't repeat
      const token = 13709362256830281353274514651503029694613776989998989653637023464917340n + BigInt(amount.toFixed(0))

      // TODO: can't repeat
      const integer = await formatInteger(amount, 12)

      const batch = await getSoluctionDepositBatch({
        token,
        keys: this.node,
        publicAmount: amount,
        amount: BigInt(integer)
      })

      const objExtada = {
        sender,
        recipient,
        fee: 1.0,
        relayer: 1,
        extAmount: amount,
        encryptedValue: 1,
        encryptedOutput1: batch.encryptedOutput1,
        encryptedOutput2: batch.encryptedOutput2
      }

      const poseidon = await getPoseidon()

      const tokenHash = Pact.crypto.hash(JSON.stringify(objToken))

      const extDataHash = Pact.crypto.hash(JSON.stringify(objExtada))

      // TODO: can't repeat
      const messageHash = poseidon([base64urlToBigInt(extDataHash)]) + BigInt(amount.toFixed(0))

      const tree = await (new MerkleTreeService()).initMerkleTree(
        [
          0,
          ...this.state.commitments.slice(2).map((comm: any) => BigInt(comm.value))
        ]
      )

      // TODO: can't repeat root
      const subtree = await MerkleTree.build(PROOF_LENGTH + 1)

      const sparseTreeComitments = Array(12).fill(2024558050549391605012053009755606653829088608754591949453775743570141n + BigInt(amount.toFixed(0)))

      batch.utxosIn = batch.utxosIn.map((utxo: any, i: any) => {
        sparseTreeComitments[i] = EXPECTED_VALUE

        return {
          ...utxo,
          mp_path: i,
          mp_sibling: tree.path(i).pathElements
        }
      })

      subtree.pushMany(sparseTreeComitments)

      batch.utxosIn = batch.utxosIn.map((txo: any, i: any) => {
        return {
          ...txo,
          smp_path: subtree.proof(i)
        }
      })

      const { inputs } = await computeInputs({
        batch,
        wallet,
        token,
        messageHash,
        roots: {
          tree: tree.root,
          subtree: subtree.root
        }
      })

      // @ts-expect-error
      const { groth16 } = await import('snarkjs')

      this.depositMessage = 'Generating ZK Proof...'

      const {
        proof,
        publicSignals
      } = await groth16.fullProve(
        inputs,
        '/transaction.wasm',
        '/transaction_0001.zkey'
      )

      return {
        proof: {
          ...getPublicArgs(proof, publicSignals)
        },
        extData: {
          ...objExtada
        },
        tokenSpec: {
          ...objToken
        },
        args: {
          tokenHash,
          extDataHash,
          publicAmount: amount,
          root: tree.root.toString(),
          outputCommitments: batch.utxosOut.map((utxo: any) => utxo.hash.toString())
        }
      }
    },

    verifyMnemonic (word: string, index: number) {
      return (
        this.mnemonic.split(' ')[index] === word
      )
    },

    async copyToClipboard (value?: '') {
      try {
        await navigator.clipboard.writeText(
          value || this.mnemonic
        )
        // alert('Copied')
      } catch ($e) {
        alert('Cannot copy')
      }
    },

    logout () {
      const { clear } = useAuthStorage()
      const router = useRouter()

      clear(['phrase', 'providers'])

      this.node = null
      this.cache = null

      router.push({
        path: '/auth'
      })
    }
  }
})
