## Overview

This project contains modules for three zero-knowledge proof technologies: `Gas Payer',` `Groth16`, `Merkle Tree` and `Transact`. Some modules include code dynamically generated with EJS templates from input data in `.json` files. 

Below is the project structure and a brief description of each module:

## Project structure
```markdown
.
├── gas-payer                           # Gas payer module
│   ├── gas-payer-v1.pact               # Source code for gas payer interface
│   ├── opact-gas-station.pact          # Source code for gas payer implementation

├── groth16-verifier                    # Groth16 verifier module
│   ├── src                             # Source code for the Groth16 verifier
│   │   ├── ejs                         # EJS templates for generating Groth16 verifier code
│   │   │   ├── lib.ejs.repl            # EJS template file
│   │   │   └── sample.verifier.json
│   │   └── lib-1x2.repl                # Used for 1x2 circuit (1 input, 2 outputs)
│   │   └── lib-2x2.repl                # Used for 2x2 circuit (2 inputs, 2 outputs)
│   │   └── lib-3x2.repl                # Used for 3x2 circuit (3 inputs, 2 outputs)
│   │   └── lib-4x2.repl                # Used for 4x2 circuit (4 inputs, 2 outputs)
│   │   └── lib-5x2.repl                # Used for 5x2 circuit (5 inputs, 2 outputs)
│   │   └── lib-6x2.repl                # Used for 6x2 circuit (6 inputs, 2 outputs)
│   │   └── lib-7x2.repl                # Used for 7x2 circuit (7 inputs, 2 outputs)
│   │   └── lib-8x2.repl                # Used for 8x2 circuit (8 inputs, 2 outputs)
│   │   └── lib-9x2.repl                # Used for 9x2 circuit (9 inputs, 2 outputs)
│   │   └── lib-10x2.repl               # Used for 10x2 circuit (10 inputs, 2 outputs)
│   └── tests                           # Test scripts for the Groth16 verifier
│       └── groth16-tests.repl

├── merkle-tree                         # Merkle tree module
│   └── src                             # Source code for the Merkle tree
│       ├── ejs                         # EJS templates for generating Merkle tree code
│       │   ├── data.json
│       │   └── merkle-tree.ejs.repl    # EJS template file
│       └── lib.repl                    # Merkle tree implementation code, generated from EJS template.

├── transact                            # Transact module
│   ├── src                             
│   │   ├── contract.pact               # Source code for the Transact contract
│   └── tests                           # Test scripts for the Groth16 verifier
│       └── Kip                         # Reference source code for the KIP contract, used for testing.
│       └── transact-tests.repl         # Test scripts for the Transact contract, simulating a deposit and withdrawal.
├── package.json                        # Project metadata and dependencies
├── pnpm-lock.yaml                      # Exact version of your dependencies. Don't edit this file directly.
└── README.md                           # Project description and instructions
```

### Gas Payer

The gas payer module contains the source code for the gas payer interface and its implementation. The gas payer is a smart contract that allows users not to pay for gas when they interact with the Opact contract, because the gas payer contract pays for the gas on behalf of the user. The `gas-payer-v1.pact` file contains the source code for the gas payer interface, and the `opact-gas-station.pact` file contains the source code for the gas payer implementation.

### Groth16 Verifier

Groth16 is a zero-knowledge proof scheme, which allows a party to prove that they have knowledge of certain information without revealing that information. This scheme is widely used in privacy-centric applications and is efficient in terms of proof size and verification time. In this module, we use EJS templates to generate the Groth16 verifier code dynamically. The `lib.ejs.repl` file is the template and the `sample.verifier.json` file contains input data for this template. The generated code is stored in the `lib.repl` file.

### Merkle Tree

A Merkle Tree is a binary tree of hashes, commonly used in computer science, particularly in blockchains, to maintain data integrity and privacy. The Merkle Tree module in this project uses an EJS template and input data to generate code for handling Merkle Trees. The `merkle-tree.ejs.repl` file is the EJS template and the `data.json` file is the input data for this template. The generated code is stored in the `lib.repl` file.

### Transact

Transact is the main contract for Opact Wallet. It is a smart contract that allows users to create and manage their wallets.

It implements methods to receive deposits, perform withdrawals of assets and maintaining the contract's state - represented by the merkle tree. All methods require valid ZK proofs based on the Opact Wallet circuit to function.

To better understand the circuit logic refer to the circuits package and the main documentation of the protocol at root [README.md](../readme.md).

### Why EJS templates?

EJS (Embedded JavaScript) is a simple JavaScript template library. It lets you generate HTML (or any other output) using plain JavaScript. In this project, we use EJS templates because they allow us to use control flow statements like `for`, `while`, and `if`, which are not directly available in the Pact language. By using EJS templates and input data from `.json` files, we can generate complex scripts dynamically.

## CI/CD Workflow - `contracts-check`

We employ GitHub Actions for our CI/CD process, running the `contracts-check` workflow on every pull request. This workflow checks the integrity and functionality of our contracts by executing the following steps:

1. **Checkout code**: This step fetches the source code to be checked.
2. **Setup Node.js environment**: Here, we setup the Node.js environment required to run our contracts.
3. **Install dependencies**: In this step, we install the dependencies needed to run the contracts.

Then for each contract:
- **generate**: This step uses EJS templates and JSON files to generate the contract code.
- **test**: Here, we run the unit tests for each contract.

Specifically, for each module:
- `groth16-verifier`: We run `generate-groth16` and `test-groth16`.
- `merkle-tree`: We run `generate-merkle`.

## Generate the contract code

To generate the contract code, we use the `contracts` command of the `pnpm` package manager. To generate the Groth16 verifier and Merkle Tree code, we run the following commands:

```bash
pnpm contracts generate-groth16
pnpm contracts generate-merkle
```

The output of the generated files is already available in this repository within the `src` part of each respective folder. Each file starting with `lib` is the generated file from the EJS template.

## Run the test

The unit tests for each module are placed in the `tests` directory. In order to test the contracts, we run the following command:

```bash
pnpm contracts test-groth16
pnpm contracts test-merkle
pnpm contracts test-transact
```

If everything went well, you should see the following output:

```bash
Load successful
```

If any test fails, you should see something like this:

```bash
Load failed
```

## Circuit power

From 8 utxo (in) onwards, the circuit power needs to be 18.