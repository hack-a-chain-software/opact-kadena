# @hack-a-chain-software/kadena-product

A JavaScript implementation using the Poseidon hash function and a zero-knowledge proof protocol provided by the snarkjs library. This project is built using the circomlibjs library for zkSNARKs circuits and the snarkjs library for generating zkSNARKs proofs.

## Installation

```bash
pnpm add @hack-a-chain-software/kadena-product
```

## Usage

```javascript
import { MerkleTree } from "@hack-a-chain-software/kadena-product/src/merkletree.js";
import {
    utxo,
    utxo_random,
    utxo_hash,
    transfer_compute,
    PROOF_LENGTH,
} from "@hack-a-chain-software/kadena-product/src/inputs.js";
import {
    randrange,
    fr_random,
    proof,
    verifySync,
    u160_random,
    fs_random,
    get_pubkey,
} from "@hack-a-chain-software/kadena-product/src/utils.js";

const pick2 = (a, b) => {
    const t1 = randrange(a, b);
    const t2 = randrange(a, b - 1);
    return [t1, t1 <= t2 ? t2 + 1 : t2];
};

const secret = fs_random();
const pubkey = get_pubkey(secret);
const token = u160_random();
const mt = new MerkleTree(PROOF_LENGTH + 1);
const smt = new MerkleTree(PROOF_LENGTH + 1);

const EXPECTED_VALUE =
    11954255677048767585730959529592939615262310191150853775895456173962480955685n;

const sz = randrange(50, 100);
const utxos = Array(sz)
    .fill(0n)
    .map((_) => utxo_random({ pubkey, token }));
const utxo_hashes = utxos.map((e) => utxo_hash(e));
mt.pushMany(utxo_hashes);

const sparseTreeComitments = Array(sz).fill(0n);

const root = mt.root;
const utxo_in = pick2(0, sz).map((i) => {
    let u = utxos[i];
    u.mp_sibling = mt.proof(i);
    u.mp_path = i;
    sparseTreeComitments[i] = EXPECTED_VALUE;
    return u;
});
smt.pushMany(sparseTreeComitments);

const input_amount = utxo_in.reduce((a, b) => a + b.amount, 0n);
const utxo_out = [utxo(token, input_amount, pubkey, fr_random())];
const delta = u160_random();
const message_hash = fr_random();

// Compute the transaction inputs
const { inputs } = transfer_compute(
    smt,
    root,
    utxo_in,
    utxo_out,
    token,
    delta,
    message_hash,
    secret
);

// Generate the proof
const pi = await proof(
    inputs,
    "./proof/transaction.wasm",
    "./proof/transaction_0001.zkey"
);

// Verify the proof
const isVerified = await verifySync(pi, "./proof/verification_key.json");
console.log(isVerified);
```
