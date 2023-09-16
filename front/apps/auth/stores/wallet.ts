import axios from 'axios'
// import { blake2b } from 'blakets'
import Pact from "pact-lang-api"
import { defineStore } from 'pinia'
// import { blake2b256 } from '@multiformats/blake2/blake2b'
// // import { blake2b } from "ethereum-cryptography/blake2b.js";
// import { utf8ToBytes } from "ethereum-cryptography/utils.js";
// import { bytesToHex as toHex } from "ethereum-cryptography/utils.js";

const PROOF_LENGTH = 32

const EXPECTED_VALUE = 11954255677048767585730959529592939615262310191150853775895456173962480955685n

const computeLocalTestnet = (data: any) => {
  return data
    .sort((a: any, b: any) => a.txid - b.txid)
    .map(({ events }: any) => events)
    .reduce((acc: any, curr: any) => acc.concat(curr),[])
    .reduce((curr: any, event: any) => {
      if (event.name === 'new-nullifier') {
        curr.nullifiers = [...curr.nullifiers, ...event.params.map((param: any) => param.int)]
      }

      if (event.name === 'new-commitment') {
        const commitment = {
          value: event.params[0].int,
          order: event.params[1].int
        }

        curr.commitments = [...curr.commitments, commitment]

        curr.encryptedData = [...curr.encryptedData, event.params[2].int]
      }

      return curr
    }, {
      nullifiers: [],
      commitments: [],
      encryptedData: [],
    })
}

const utxo = {
  txo: {
    token: "832719810210204902983213847411017819246076070166832719810210204902983213847411017819246076070166832719810210204902983213847411017819246076070166832719810210204902983213847411017819246076070166",
    amount: "1196235912130269727416504814248729565403940735380832719810210204902983213847411017819246076070166832719810210204902983213847411017819246076070166",
    pubkey: "8938953828777687434937074892093933157671984277448136535499184663705332772014832719810210204902983213847411017819246076070166832719810210204902983213847411017819246076070166",
    blinding: "21785434670000210267130206152006579786532912209177849056771328037904546000959832719810210204902983213847411017819246076070166832719810210204902983213847411017819246076070166",
    hash: "4613618889813288715894130243957282271546550742261259215341954248817589349732832719810210204902983213847411017819246076070166832719810210204902983213847411017819246076070166"
  },
  txId: "123456789",
  token: "832719810210204902983213847411017819246076070166832719810210204902983213847411017819246076070166832719810210204902983213847411017819246076070166832719810210204902983213847411017819246076070166",
  chain: "kadena",
  sender: "8938953828777687434937074892093933157671984277448136535499184663705332772014832719810210204902983213847411017819246076070166832719810210204902983213847411017819246076070166",
  amount: "8938953828777687434937074892093933157671984277448136535499184663705332772014832719810210204902983213847411017819246076070166832719810210204902983213847411017819246076070166",
  position: "123456789",
  receiver: "8938953828777687434937074892093933157671984277448136535499184663705332772014n832719810210204902983213847411017819246076070166832719810210204902983213847411017819246076070166832719810210204902983213847411017819246076070166",
  spec: {
    id: "12345679",
    refname: {
      name: "contract-ref-name",
      namespace: "free"
    },
    refSpec: {
      name: "contract-ref-spec-name",
      namespace: "free"
    }
  }
}

export const getPublicArgs = (
  proof: any,
  publicSignals: string[],
): any => {
  return {
    public_values: publicSignals,
    a: {
      x: proof["pi_a"][0],
      y: proof["pi_a"][1],
    },
    b: {
      x: proof["pi_b"][0],
      y: proof["pi_b"][1],
    },
    c: {
      x: proof["pi_c"][0],
      y: proof["pi_c"][1],
    },
  };
};

const baseUtxos = [30n, 40n, 50n, 10n, 20n, 10n, 20n, 0n]

function base64urlToBigInt(base64url: string) {
  // Passo 1: Converter a string base64-url para a forma padrão de base64
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - base64.length % 4) % 4);
  base64 += padding;

  // Passo 2: Decodificar a string base64 para obter bytes
  const bytes = atob(base64);

  // Passo 3: Converter esses bytes em um bigint
  let bigint = BigInt(0);
  for (let i = 0; i < bytes.length; i++) {
      bigint = (bigint << BigInt(8)) + BigInt(bytes.charCodeAt(i));
  }

  return bigint;
}

export const useWalletStore = defineStore({
  id: 'opact-wallet',
  state: (): any => {
    const { cache } = useAuthStorage()

    return {
      cache,

      balance: 0,

      mnemonic: '',

      node: null,
      chain: null,
      state: null,
      provider: null,

      isLoading: true,
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
    async loadState () {
      this.isLoading = true

      const { data } = await axios.get('http://ec2-34-235-122-42.compute-1.amazonaws.com:5000/getdata', {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })

      const state = computeLocalTestnet(data)

      this.state = state
      this.isLoading = false

      return state
    },

    async found () {
      if (process.server) {
        return
      }

      const {
        getHDWalletFromMnemonic,
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
        getHDWalletFromMnemonic,
      } = await getSdk() || {}

      const node: any = await getHDWalletFromMnemonic(phrase)

      this.node = node

      this.persistAuth(node)
    },

    async reconnect () {
      await this.recovery(this.cache.phrase)
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
        generateMnemonic,
      } = await getSdk() || {}

      const mnemonic = generateMnemonic()

      this.mnemonic = mnemonic
    },

    async encrypt () {
      if (process.server) {
        return
      }

      const {
        encrypt,
      } = await getSdk() || {}

      const encrypted = await encrypt(
        JSON.stringify(utxo),
        {
          pvtkey: this.node.pvtkey << 4n,
          rawBig: this.node.rawBig,
        },
      )

      return encrypted
    },

    async decrypt (encrypted: any) {
      if (process.server) {
        return
      }

      const {
        decrypt,
        getUtxoFromDecrypted,
      } = await getSdk() || {}

      const decrypted = await decrypt({
        ...encrypted,
        wallet: {
          pvtkey: this.node.pvtkey << 4n,
          rawBig: this.node.rawBig,
        },
      })

      return getUtxoFromDecrypted(decrypted)
    },

    async withdraw (amount: bigint = 66n, token: bigint = 832719810210204902983213847411017819246076070166n) {
      if (process.server) {
        return
      }

      const init = Date.now()

      const {
        getUtxo,
        MerkleTree,
        computeInputs,
        getSolutionBatch,
      } = await getSdk() || {}

      const wallet = this.node

      const utxos = [
        ...(await Promise.all(baseUtxos.map(async (amount) => await getUtxo({ amount, token, wallet }))))
      ]

      const tree = await MerkleTree.build(PROOF_LENGTH + 1);

      const subtree = await MerkleTree.build(PROOF_LENGTH + 1);

      const sparseTreeComitments = Array(12).fill(0n);

      tree.pushMany(utxos.map((utxo: any) => utxo.hash));

      const treeBalance = {
        tree,
        token,
        utxos,
        balance: BigInt(10),
      }

      const batch = await getSolutionBatch({
        wallet,
        totalRequired: amount,
        excludedUTXOIDPositions: [],
        treeBalance: treeBalance as any,
      });

      batch.utxosIn = batch.utxosIn.map((txo: any) => {
        let i = utxos.findIndex(({ nullifier }: any) => nullifier === txo.nullifier)

        sparseTreeComitments[i] = EXPECTED_VALUE

        return {
          ...utxos[i],
          mp_path: i,
          mp_sibling: tree.proof(i)
         }
      })

      subtree.pushMany(sparseTreeComitments);

      batch.utxosIn = batch.utxosIn.map((txo: any) => {
        let i = utxos.findIndex(({ nullifier }: any) => nullifier === txo.nullifier)

        return {
          ...txo,
          smp_path: subtree.proof(i)
         }
      })

      const { inputs } = await computeInputs({
        batch,
        wallet,
        token: treeBalance.token,
        roots: {
          tree: tree.root,
          subtree: subtree.root,
        }
      });

      // @ts-expect-error
      const { groth16 } = await import('snarkjs')

      const pi = await groth16.fullProve(
        inputs,
        '/transaction.wasm',
        '/transaction_0001.zkey',
      );

      const ends = Date.now()

      return pi
    },

    async deposit ({
      commitments,
      amount = 1,
      sender = 'sender-address-1',
      recipient = 'recipient-address',
      objToken = {
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
    }: any) {
      if (process.server) {
        return
      }

      const {
        MerkleTree,
        computeInputs,
        getPoseidon,
        MerkleTreeService,
        getSoluctionDepositBatch,
      } = await getSdk() || {}

      const objExtada = {
        sender,
        recipient,
        fee: 1.0,
        relayer: 1,
        extAmount: amount,
        encryptedValue: 1,
        encryptedOutput1: 1,
        encryptedOutput2: 2,
      }

      const poseidon = await getPoseidon()

      const tokenHash = Pact.crypto.hash(JSON.stringify(objToken))

      const token = poseidon.F.toObject(poseidon([base64urlToBigInt(tokenHash)]))

      const extDataHash = Pact.crypto.hash(JSON.stringify(objExtada))

      const messageHash = poseidon.F.toObject(poseidon([base64urlToBigInt(extDataHash)]))

      const wallet = this.node

      const batch = await getSoluctionDepositBatch({
        token,
        amount,
        keys: this.node,
      });

      const tree = await (new MerkleTreeService()).initMerkleTree(
        '161015158386721250961923434737995904749326433712597261336369305638983090910',
        [
          // {
          //   order: 0,
          //   value: 4n
          // },
          // {
          //   order: 1,
          //   value: 5n
          // },
          // {
          //   order: 2,
          //   value: 4485246893792388428001014082455705460960072146220752488586457108430613990559n
          // },
          {
            order: 0,
            value: 2024558050549391605055505300975560606538290886087545981949454377574357070182n
          },
        ]
      );

      console.log('tree', tree.root)

      const sparseTreeComitments = Array(12).fill(0n);

      batch.utxosIn = batch.utxosIn.map((utxo: any, i: any) => {
        sparseTreeComitments[i] = EXPECTED_VALUE

        return {
          ...utxo,
          mp_path: 0,
          mp_sibling: tree.proof(BigInt("4485246893792388428001014082455705460960072146220752488586457108430613990559")).pathElements
        }
      })

      const subtree = await (new MerkleTreeService()).initMerkleTree(
        '21663839004416932945382355908790599225266501822907911457504978515578255421292',
        sparseTreeComitments.map((value: any, i: any) => ({ order: i, value }))
      )

      batch.utxosIn = batch.utxosIn.map((txo: any, i: any) => {
        return {
          ...txo,
          smp_path: subtree.proof(sparseTreeComitments[0]).pathElements
        }
      })

      const { inputs } = await computeInputs({
        batch,
        wallet,
        token,
        messageHash,
        roots: {
          tree: tree.root,
          subtree: subtree.root,
        },
      });

      //@ts-expect-error
      const { groth16 } = await import('snarkjs')

      const {
        proof,
        publicSignals
      } = await groth16.fullProve(
        inputs,
        '/transaction.wasm',
        '/transaction_0001.zkey',
      );

      return {
        proof: {
          ...getPublicArgs(proof, publicSignals)
        },
        extData: {
          ...objExtada
        },
        tokenSpec: {
          ...objToken,
        },
        args: {
          tokenHash,
          extDataHash,
          publicAmount: 1,
          root: tree.root.toString(),
          outputCommitments: batch.utxosOut.map((utxo: any) => utxo.hash.toString()),
        },
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
