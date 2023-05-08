# Circuits

This package contains the Zero-Knowlege circuit implementation. This circuit defines how proofs are generated and validated within the application.

## Architecture

The main goal is to allow an application design that allows:
- Storing private UTXOs that can contain arbitrary data, only readable by its owner as in [Tornado Nova](https://github.com/tornadocash/tornado-nova) 
- Allowing sparse merkle tree proofs to prove that some users funds did NOT come from illicit sources such as in [Privacy Pools](https://github.com/ameensol/privacy-pools/tree/main)
- Allowing an option read key to be set for each UTXO using public key cryptography

### UTXO Structure

The UTXO is the most important storage structure in the circuit. Circuits must validate that a user possesses enough UTXOs to perform the operations required.

The UTXO structure must support any kind of asset type.

```ts
{   
    // code denomination for the asset
    "assetKind": String,
    // quantity of the asset stored in UTXO
    "amount": Int,
    // public key of UTXO owner
    "pubKey": String,
    // random number to grant anonimity to UTXO when encrypted
    "blinding": Int
}
```

The smart contract is going to have to control which UTXOs are being generated with each deposit to assert that users are only able to generate UTXOs for a given `assetKind` when that same asset has been deposited to the contract.

This structure is very flexible since it allows the differenciation between any asset that the protocol wants to support.

### Circuit scheme

To achieve the goals of the system, we need to be able to store a large amount of encrypted UTXOs in a cryptographic accumulator. Only the owner of the UTXOs must be able to decipher them.

All ZK proofs are built on top of this accumulator.

There are 3 simultaneos schema requirements that must be built:

Simple proof schema:
1. Whenever an user wants to spend their UTXOs they need to perform a joinsplit operation. They need to burn UTXOs and create new ones
2. This is done by creating a zero knowledge proof that you own the UTXOs being burnt and that the nullifiers you are providing for them are correct.
3. The proof is also going to contain the new updated state of the accumulator - since new UTXOs can be created from the joinsplit - and the withdraw values released.

Compliance checking schema:
1. When performing a simple proof, the user also has the option to pass in a sparse markle tree. This tree stores either 0 or 1 for each index.
2. The proof is then going to assert that none of the UTXOs being burnt came from the UTXOs at the indexes marked with 0 in the sparse merkle tree
3. Through this method, the user can prove that their funds have not been marked as illicit by any of the compliance agents

Reading key schema:
1. A user can grant viewing priviledges to any third party upon their UTXO
2. User must decript their UTXO and calculate their nullifier
3. User then must encrypt the nullifier and UTXO with the readers public key
4. The circuit is going to check that the information provided is correct

### Implementing the circuit 



## Using this package