## Overview

This project contains modules for three zero-knowledge proof technologies: `Groth16`, `Plonk`, and `Merkle Tree`. Each module includes code dynamically generated with EJS templates from input data in `.json` files. 

Below is the project structure and a brief description of each module:

## Project structure
```markdown
.
├── groth16-verifier    # Groth16 verifier module
│   ├── src             # Source code for the Groth16 verifier
│   │   ├── ejs         # EJS templates for generating Groth16 verifier code
│   │   │   ├── lib.ejs.repl      # EJS template file
│   │   │   └── sample.verifier.json
│   │   └── lib.repl    # Groth16 verifier code, generated from EJS template
│   └── tests           # Test scripts for the Groth16 verifier
│       └── groth16-tests.repl
├── plonk-verifier      # Plonk verifier module
│   ├── src             # Source code for the Plonk verifier
│   │   ├── ejs         # EJS templates for generating Plonk verifier code
│   │   │   ├── lib.ejs.repl      # EJS template file
│   │   │   └── sample.verifier.json
│   │   └── lib.repl    # Plonk verifier code, generated from EJS template
│   └── tests           # Test scripts for the Plonk verifier
│       └── plonk-tests.repl
├── merkle-tree         # Merkle tree module
│   └── src             # Source code for the Merkle tree
│       ├── ejs         # EJS templates for generating Merkle tree code
│       │   ├── data.json
│       │   └── merkle-tree.ejs.repl # EJS template file
│       ├── lib.repl    # Merkle tree code, generated from EJS template
├── package.json        # Project metadata and dependencies
├── pnpm-lock.yaml      # Exact version of your dependencies. Don't edit this file directly.
└── README.md           # Project description and instructions
```

### Groth16 Verifier

Groth16 is a zero-knowledge proof scheme, which allows a party to prove that they have knowledge of certain information without revealing that information. This scheme is widely used in privacy-centric applications and is efficient in terms of proof size and verification time. In this module, we use EJS templates to generate the Groth16 verifier code dynamically. The `lib.ejs.repl` file is the template and the `sample.verifier.json` file contains input data for this template. The generated code is stored in the `lib.repl` file.

### Plonk Verifier

Plonk is another zero-knowledge proof scheme, which is quite efficient and versatile. It has been adopted for various privacy and scaling solutions in the blockchain space. Similar to the Groth16 module, we use an EJS template (`lib.ejs.repl`) and input data (`sample.verifier.json`) to generate the Plonk verifier code, which is stored in the `lib.repl` file.

### Merkle Tree

A Merkle Tree is a binary tree of hashes, commonly used in computer science, particularly in blockchains, to maintain data integrity and privacy. The Merkle Tree module in this project uses an EJS template and input data to generate code for handling Merkle Trees. The `merkle-tree.ejs.repl` file is the EJS template and the `data.json` file is the input data for this template. The generated code is stored in the `lib.repl` file.

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
- `plonk-verifier`: We run `generate-plonk` and `test-plonk`.
- `merkle-tree`: We run `generate-merkle`.

## Run the test

The unit tests for each module are placed in the `tests` directory. For example, in order to test the Plonk verifier, we run the following command:

```bash
pnpm contracts test-plonk
```

If everything went well, you should see the following output:

```bash
Load successful
```

If any test fails, you should see something like this:

```bash
plonk-verifier/tests/plonk-tests.repl:7:0:ExecError: FAILURE: verify: expected {"paired": true}:object:*, received {"paired": false}:object:*
Load failed
```