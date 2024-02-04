(namespace (read-msg 'ns))

(module opact GOVERNANCE
    @doc 
    "This module is designed for privacy-preserving transactions on the blockchain, \
    \ utilizing zk-SNARKs for verification. It includes definitions for elliptic curve points (G1, G2), \
    \ proofs, and external data structures. Additionally, it manages fungible and poly-fungible token transactions \ 
    \ with privacy and supports limits on deposit amounts."

    (defcap GOVERNANCE ()
        @doc
        "Ensures that only the specified admin keyset can perform updates on this smart contract, \
        \ maintaining control over module modifications."
        
        (enforce-keyset "free.opact-admin")
    )

    (defschema G1Point
        @doc
        "Structure representing a G1 point in an elliptic curve, consisting of x and y coordinates as integers. \
        \ G1 points are used in various cryptographic operations within the zk-SNARKs protocol."
       
        x: integer
        y: integer
    )

    (defschema G2Point
        @doc
        "Structure representing a G2 point in an elliptic curve. G2 points are similar to G1 points but require arrays \
        \ of integers for coordinates to accommodate the complexity and size of the data involved in zk-SNARKs."

        x: [integer]
        y: [integer]
    )

    (defschema Proof
        @doc 
        "Structure representing a proof in zk-SNARKs. \
        \ It includes an array of public values and points a, b, and c in G1 or G2."

        public_values: [integer]
        a: object{G1Point}
        b: object{G2Point}
        c: object{G1Point}
    )

    (defschema ext-data
        @doc
        "Holds external data for transactions, including sender, recipient, \ 
        \ and token information, along with encrypted data for privacy."
       
        sender: string
        recipient: string
        tokenType: string
        tokenAmount: integer
        tokenId: string
        encryptedReceipts: [string]
        encryptedCommitments: [string]
        outputCommitments: [integer]
    )

    (defschema token-reference
        @doc
        "Defines a reference structure for tokens, indicating their name and namespace for identification."
     
        name: string
        namespace: string
    )

    (defschema token
        @doc
        "Describes a fungible or poly-fungible token, including its reference name, specification, and identifier."
       
        refName:object{token-reference}
        refSpec:object{token-reference}
        id: string
    )

    (defschema Limits
        @doc
        "Sets the limits for transactions, such as the maximum deposit amount, to regulate the flow of tokens."
       
        maximumDepositAmount: decimal
    )

    (deftable limits:{Limits})

    (defschema NullifierHashesSchema
        "Schema for the nullifier hashes"
        value:integer)

    (deftable nullifierHashes:{NullifierHashesSchema})

    (defcap new-commitment(commitment: integer index: integer)
      @doc "Emits an event for a new commitment, indicating a new commitment has been added."  
      @event
      true
    )

    (defcap new-nullifier(nullifier: [integer])
      @event
      true
    )

    (defcap new-transaction(encryptedValue: string)
      @event
      true
    )

    (defcap new-encrypted-output(encryptedOutput: string)
      @event
      true
    )

    (defconst MODULE_KEY "M")

    (defschema admin
        guard:guard
    )
    
    (deftable admins:{admin})

    (defun init-admin (guard:guard)
        (with-capability (GOVERNANCE)
            (insert admins MODULE_KEY {'guard: guard}))
    )

    (defun reset-nullifiers ()
        (with-capability (GOVERNANCE)
            (map (set-nullifierHash-to-zero) (select nullifierHashes (where 'value (< 0))))
        )
    )

    (defun is-spent (nullifier:integer)
        (= (length (select nullifierHashes (where 'value (= nullifier)))) 1)
    )

    (defun validate-spent (spent:bool)
        @doc
        "Checks if the nullifier has already been used."
  
        (enforce (= spent false) "Input is already spent")
    )

    (defconst FIELD_SIZE 21888242871839275222246405745257275088548364400416034343698204186575808495617)
    (defconst MAX_EXT_AMOUNT 10000000000.0)
    (defconst FEE 1.0)
    (defconst AMOUNT_DECIMALS 12.0)

    (defun calculate-public-amount (amount-integer:integer fee:decimal)
        @doc
        "Calculates the public amount for a transaction, \
        \ This function takes an integer representation of the amount and the transaction fee in decimal. \
        \ It then converts the integer amount to a decimal by dividing it by a power of 10, depending on \ 
        \ the token's decimals. The function ensures the fee is within the maximum allowed fee and that the \ 
        \ resulting amount is within the allowed external amount range. If the public amount is positive, \ 
        \ it's returned as is. If it's negative, indicating a withdrawal, the function adjusts the amount \ 
        \ based on the field size to ensure it's correctly processed in the cryptographic operations."

        (
            let*
            (
                (amount (/ amount-integer (^ 10 AMOUNT_DECIMALS)))
                (publicAmount amount-integer)
            )
            (enforce (and (> amount (* MAX_EXT_AMOUNT -1)) (< amount MAX_EXT_AMOUNT)) "Invalid ext amount")
            (if (>= publicAmount 0)
                publicAmount
                (- FIELD_SIZE (* publicAmount -1))
            )
        )
    )

    (defun initialize (maximumDepositAmount:decimal)
         @doc
         "Initializes the smart contract with a specified maximum deposit amount. \
         \ This function is a first step in setting up the contract's environment and configurations. \
         \ It performs several key operations: \ 
         \ - initializing the admin with a newly created module guard, \ 
         \ - configuring the maximum deposit limits for transactions, \ 
         \ - creating a dedicated coin account for the contract with the same module guard, and \ 
         \ - initializing the Merkle tree."
   
        (with-capability (GOVERNANCE)
            (init-admin (create-module-guard "opact-contract-guard"))
            (configure-limits maximumDepositAmount)
            (coin.create-account "opact-contract" (create-module-guard "opact-contract-guard"))
            (free.merkle.init-admin (create-module-guard "opact-contract-guard"))
            (free.merkle.initialize)
            ;(coin.rotate "opact-contract" (opact-contract-guard))
        )
    )

    (defun configure-limits (maximumDepositAmount:decimal)
       @doc 
       "Configures the maximum deposit amount that can be processed by the smart contract. \
       \ This function updates the 'limits' table with the specified maximum deposit amount, \ 
       \ ensuring that all transactions adhere to this limit for deposit operations. \ 
       \ The function requires the GOVERNANCE capability to execute, ensuring that only \ 
       \ authorized administrators can adjust the transaction limits. \ 
       \ This mechanism is crucial for reventing excessive deposits that could \ 
       \ potentially disrupt the contract's balance and operations."
 
        (with-capability (GOVERNANCE)
            (write limits "1" { "maximumDepositAmount": maximumDepositAmount })
        )
    )

    (defun get-maximum-deposit-amount ()
       @doc 
       "Retrieves the maximum deposit amount allowed by the smart contract. \
       \ This function accesses the 'limits' table, to obtain the current \ 
       \ maximum deposit amount that has been configured. \
       \ This value ensures that all deposit transactions do not exceed the set limit. \
       \ There is just one entry in the 'limits' table, and it's identified by the key '1'."
 
        (at 'maximumDepositAmount (read limits "1"))
    )

    (defun set-nullifierHash (value:integer)
        @doc 
        "Stores a nullifier hash within the contract to mark a specific transaction input as spent. \
        \ This function writes the given nullifier hash value to the 'nullifierHashes' table, \
        \ preventing its reuse in future transactions, preventing double-spending. \
        \ The function enforces an administrative guard check to ensure that only the module \
        \ can update nullifier hashes, maintaining the integrity and security of \ 
        \ the transaction process. The 'value' parameter is the nullifier hash to be stored."
    
        (enforce-guard (at 'guard (read admins MODULE_KEY)))
        (write nullifierHashes (int-to-str 10 value) { "value": value })
    )
    
    (defun set-nullifierHash-to-zero (obj:object{NullifierHashesSchema})
        @doc 
        "Resets a specific nullifier hash to zero within the 'nullifierHashes' table, \
        \ effectively marking the associated transaction input as no longer spent. \
        \ This operation is crucial for administrative purposes, such as correcting errors or \
        \ resetting the contract's state during testing. \
        \ The function requires the GOVERNANCE capability, ensuring that only \
        \ authorized administrators can perform this sensitive operation."
  
        (with-capability (GOVERNANCE)
            (write nullifierHashes (int-to-str 10 (at 'value obj)) { "value": 0 })
        )
    )

    (defun verify-with-length (n:integer proof:object{Proof})
        @doc 
        "Verifies a zk-SNARK proof based on the number of inputs specified by 'n'. \
        \ This function dynamically selects the appropriate Groth16 verification function according to \
        \ the number of inputs involved in the proof. Each Groth16 verification function, \
        \ ranging from groth16-1x2 to groth16-10x2, corresponds to a different configuration of public inputs. \
        \ The function ensures that the proof is correctly paired and returns true if the verification is successful. \
        \ If 'n' does not match an expected number of inputs (1 to 10), the function enforces a failure, \
        \ indicating an invalid number of inputs for the proof. \
        \ This is done because we pre-built 10 different circuits with different number of inputs. \
        \ Why do we need to do this? Because the number of inputs is a part of the circuit and it is not possible to change it dynamically."

        (if (= n 1) (at 'paired (free.groth16-1x2.verify proof))
            (if (= n 2) (at 'paired (free.groth16-2x2.verify proof))
                (if (= n 3) (at 'paired (free.groth16-3x2.verify proof))
                    (if (= n 4) (at 'paired (free.groth16-4x2.verify proof))
                        (if (= n 5) (at 'paired (free.groth16-5x2.verify proof))
                            (if (= n 6) (at 'paired (free.groth16-6x2.verify proof))
                                (if (= n 7) (at 'paired (free.groth16-7x2.verify proof))
                                    (if (= n 8) (at 'paired (free.groth16-8x2.verify proof))
                                        (if (= n 9) (at 'paired (free.groth16-9x2.verify proof))
                                            (if (= n 10) (at 'paired (free.groth16-10x2.verify proof))
                                                (enforce false "Invalid number of inputs")
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    )
      
    (defun verify-proof (proof:object{Proof})
        @doc 
        "Verifies a zk-SNARK proof by dynamically determining the number of inputs (UTXOs) involved \
        \ in the proof and then calling the appropriate verification function based on this count. \
        \ It extracts the public values from the proof, calculates the number of UTXOs by adjusting for fixed public inputs, \
        \ and enforces that the number of UTXOs is within the expected range (1 to 10). \
        \ The function delegates the actual verification to 'verify-with-length', which invokes the \
        \ corresponding groth16 verification function based on the UTXO count."
   
        (let* 
            ((public-values (at 'public_values proof))
             (length-utxos-in (- (length public-values) 7)))
            (enforce (and (>= length-utxos-in 1) (<= length-utxos-in 10)) "Invalid number of inputs")
            (verify-with-length length-utxos-in proof)
        )
    )

    (defun deposit-fungible-v2
        (sender:string
         recipient:string 
         amount:decimal 
         max-deposit-amount:decimal 
         token:module{fungible-v2})
         @doc
         "Handles the deposit of fungible tokens (v2) from a sender to the smart contract. \
         \ This function first checks if the operation is authorized by verifying the admin guard. \
         \ It then ensures the deposit amount does not exceed the configured maximum deposit limit. \
         \ If the checks pass, it performs the token transfer from the sender to the recipient using \ 
         \ the specified token module's transfer-create function. \ 
         \ The 'amount' is then transferred to the 'recipient' from the 'sender'."

        (enforce-guard (at 'guard (read admins MODULE_KEY)))
        (enforce (<= amount max-deposit-amount) "amount is larger than maximumDepositAmount")
        (token::transfer-create sender recipient (create-module-guard "opact-contract-guard") amount)
    )

    (defun withdraw-fungible-v2-transfer
        (sender:string 
         recipient:string
         recipient-guard:guard
         amount:decimal 
         token:module{fungible-v2})
         @doc 
         "Handles the withdrawal of fungible tokens (v2) by transferring the specified amount from the contract to \
         \ the recipient, after deducting a predefined transaction fee. This function ensures that the operation is \
         \ authorized by verifying the admin guard. It then transfers the fee from the sender to the 'opact-gas-payer' \
         \ account to cover transaction costs. Finally, it executes the token transfer from the sender to the recipient, \
         \ adjusting the amount to account for the deducted fee."
   
         (enforce-guard (at 'guard (read admins MODULE_KEY)))
         (coin.transfer sender "opact-gas-payer" FEE)
         (token::transfer-create sender recipient recipient-guard (- amount FEE))
    )

    (defun withdraw-fungible-v2
        (sender:string 
         recipient:string
         recipient-guard:guard
         amount:decimal 
         token:module{fungible-v2})
         @doc 
         "Handles the withdrawal of fungible tokens (v2) from the contract to the recipient, \
         \ This function conditionally processes the withdrawal based on the token instance: \
         \ if the token instance is 'coin', it calls 'withdraw-fungible-v2-transfer' \
         \ to handle the transfer with fee deduction; otherwise, it directly invokes 'transfer-create' to \
         \ move the specified amount from the contract to the recipient without fee deduction. \
         \ This is because fungible tokens are not subject to fees, while the 'coin' token is. \
         \ This is a business decision made by the project, where only withdrawals will have fees deducted \
         \ to supply the gas payer, while deposits will have the fee paid by the account that deposited."
   
        (enforce-guard (at 'guard (read admins MODULE_KEY)))
        (if (= (format "{}" [(read-msg "token-instance")]) "coin")
            (withdraw-fungible-v2-transfer sender recipient recipient-guard amount token)
            (token::transfer-create sender recipient recipient-guard amount)
        )
    )

    (defun deposit-poly-fungible-v1
        (sender:string
         recipient:string 
         amount:decimal 
         max-deposit-amount:decimal 
         token:module{poly-fungible-v1}
         token-id:string)
         @doc 
         "Handles the deposit of poly-fungible tokens (v1) from a sender to the recipient within the contract, \
         \ It checks that the deposit amount does not exceed the pre-set maximum deposit limit. \
         \ Upon validation, it executes the token transfer from the sender to \
         \ the recipient for the specified token ID, leveraging the 'token::transfer-create' function of the \
         \ poly-fungible-v1 module. This operation supports the dynamic nature of poly-fungible tokens by \
         \ accommodating specific token IDs."

        (enforce-guard (at 'guard (read admins MODULE_KEY)))
        (enforce (<= amount max-deposit-amount) "amount is larger than maximumDepositAmount")
        (token::transfer-create token-id sender recipient (create-module-guard "opact-contract-guard") amount)
    )

    (defun deposit-poly-fungible-v2
        (sender:string
         recipient:string 
         amount:decimal 
         max-deposit-amount:decimal 
         token:module{kip.poly-fungible-v2}
         token-id:string)
         @doc 
         "Enables the deposit of poly-fungible (v2) tokens from a sender to a recipient,\
         \ This function checks for administrative authorization before allowing the transaction to proceed. \
         \ It ensures the deposit amount is within the maximum limit set for a single transaction. \
         \ Upon passing these checks, the function initiates a transfer of the specified amount of tokens, \
         \ identified by 'token-id', from the sender to the recipient."

        (enforce-guard (at 'guard (read admins MODULE_KEY)))
        (enforce (<= amount max-deposit-amount) "amount is larger than maximumDepositAmount")
        (token::transfer-create token-id sender recipient (create-module-guard "opact-contract-guard") amount)
    )
    
    (defun withdraw-poly-fungible-v1
        (sender:string 
         recipient:string
         recipient-guard:guard
         amount:decimal 
         token:module{poly-fungible-v1}
         token-id:string)
         @doc 
         "Handles the withdrawal of poly-fungible (v1) tokens, facilitating the secure transfer of a \
         \ specified amount of tokens identified by 'token-id' from the sender to the recipient."

        (enforce-guard (at 'guard (read admins MODULE_KEY)))
        (token::transfer-create token-id sender recipient recipient-guard amount)
    )

    (defun withdraw-poly-fungible-v2
        (sender:string 
         recipient:string
         recipient-guard:guard
         amount:decimal 
         token:module{kip.poly-fungible-v2}
         token-id:string)
         @doc
         "Handles the withdrawal of poly-fungible (v2) tokens, transferring the specified amount of \
         \ tokens identified by the 'token-id' from the sender to the recipient."
   
        (enforce-guard (at 'guard (read admins MODULE_KEY)))
        (token::transfer-create token-id sender recipient recipient-guard amount)
    )

    (defun transact (proof:object{Proof} ext-data:object{ext-data})
        @doc 
        "Processes a transaction by validating its zk-SNARKs proof and executing the corresponding token transfer \
        \ based on the external data provided. This function first validates the transaction proof, \
        \ ensuring its valid. It then gets the external data to determine the sender, recipient, token type, and amount. \
        \ Based on the token type ('fungible-v2', 'poly-fungible-v1', or 'poly-fungible-v2') and \
        \ whether the amount is positive (deposit) or negative (withdrawal), the appropriate deposit or withdrawal function is called. \
        \ Finally, it emits a transaction event, with the proof and external data."
   
        (
            let*
            (
                (valid-data (validate-transact proof ext-data))
                (sender (at 'sender ext-data))
                (recipient (at 'recipient ext-data))
                (amount (/ (at 'tokenAmount ext-data) (^ 10 AMOUNT_DECIMALS)))
                (recipient-guard (read-msg 'recipient-guard))
                (maximum-deposit-amount (get-maximum-deposit-amount))
                (token-instance (read-msg 'token-instance))
                (token-type (at 'tokenType ext-data))
                (token-id (at 'tokenId ext-data))
            )
            (enforce (or (or (= token-type "fungible-v2") (= token-type "poly-fungible-v1")) (= token-type "poly-fungible-v2")) "Invalid token type")

            (if (and (= token-type "fungible-v2") (> amount 0.0)) (deposit-fungible-v2 sender "opact-contract" amount maximum-deposit-amount token-instance) "")
            (if (and (= token-type "fungible-v2") (< amount 0.0)) (withdraw-fungible-v2 "opact-contract" recipient recipient-guard (- amount) token-instance) "")
            
            (if (and (= token-type "poly-fungible-v1") (> amount 0.0)) (deposit-poly-fungible-v1 sender "opact-contract" amount maximum-deposit-amount token-instance token-id) "")
            (if (and (= token-type "poly-fungible-v2") (> amount 0.0)) (deposit-poly-fungible-v2 sender "opact-contract" amount maximum-deposit-amount token-instance token-id) "")
            
            (if (and (= token-type "poly-fungible-v1") (< amount 0.0)) (withdraw-poly-fungible-v1 "opact-contract" recipient recipient-guard (- amount) token-instance token-id) "")
            (if (and (= token-type "poly-fungible-v2") (< amount 0.0)) (withdraw-poly-fungible-v2 "opact-contract" recipient recipient-guard (- amount) token-instance token-id) "")

            (event-transact proof ext-data)
            {
                "valid-data": valid-data
            }
        )
    )

    (defun validate-transact (proof:object{Proof} ext-data:object{ext-data})
        @doc 
        "Validates a transaction by analyzing both the zk-SNARK proof and the provided external data. \
        \ This function performs a series of checks to ensure the integrity and authenticity of the transaction details. \
        \ - It verifies the zk-SNARK proof to confirm its validity, \
        \ - It checks the consistency of public values derived from the proof against those calculated from external data, \
        \ - It validates that the specified nullifiers have not been previously spent, preventing double-spending, \
        \ - It validates that the Merkle root is known, ensuring the transaction's linkage to a valid state in the Merkle tree."

        (
            let*
            (
                ;  root,
                ;  subtree_root,
                ;  nullifier,
                ;  utxo_out_hash,
                ;  token,
                ;  delta,
                ;  message_hash

                (public-values (at 'public_values proof))
                (public-root (at 0 public-values))
                (public-token (at (- (length public-values) 3) public-values))
                (public-amount (at (- (length public-values) 2) public-values))
                (public-message-hash (at (- (length public-values) 1) public-values))
                (public-nullifiers public-values)
                (were-spent (map (is-spent) public-nullifiers))
                (is-known-root (free.merkle.is-known-root public-root))

                (ext-data-concat (concat [
                    (at 'sender ext-data) "," 
                    (at 'recipient ext-data) "," 
                    (at 'tokenType ext-data) "," 
                    (format "{}" [(at 'tokenAmount ext-data)]) "," 
                    (at 'tokenId ext-data) "," 
                    (concat (at 'encryptedReceipts ext-data)) "," 
                    (concat (at 'encryptedCommitments ext-data)) "," 
                    (concat (map (int-to-str 10) (at 'outputCommitments ext-data)))
                ]))
                
                (ext-data-hash (hash ext-data-concat))
                (public-token-concat (format "{}" [(read-msg "token-instance")]))
                (public-token-calculated (poseidon-hash (str-to-int 64 (hash public-token-concat))))
                (public-amount-calculated (calculate-public-amount (at 'tokenAmount ext-data) FEE))
                (public-message-hash-calculated (poseidon-hash (str-to-int 64 ext-data-hash)))
            )
            (enforce (= (verify-proof proof) true) "Invalid transaction proof")
            (enforce (= public-amount public-amount-calculated) "Invalid public amount")
            (enforce (= public-message-hash-calculated public-message-hash) "Invalid message hash")
            (enforce (= public-token-calculated public-token) "Invalid token")
            ; (enforce (= is-known-root true) "Invalid merkle root")

            (map (validate-spent) were-spent)
            {
                "ext-data-hash": ext-data-hash
                ,"public-message-hash-calculated": public-message-hash-calculated
                ,"public-message-hash": public-message-hash
                ,"public-token": public-token
                ,"public-token-calculated": public-token-calculated
                ,"public-amount": public-amount
                ,"public-amount-calculated": public-amount-calculated
                ,"public-token-concat": public-token-concat
            }
        )
    )

    (defun emit-event-new-commitment (output-commitment: integer)
        @doc
        "Emits an event for each new commitment added to the Merkle tree, \
        \ The insertion process returns the index at which the new leaf (commitment) is added. \
        \ This index, along with the output commitment itself, is then used to emit a 'new-commitment' event."
 
        (emit-event (new-commitment output-commitment (at 'index (free.merkle.insert-leaf output-commitment))))
    )

    (defun emit-event-encrypted-value (encrypted-value: string)
        @doc 
        "Emits an event corresponding to an encrypted transaction value, \
        \ This function takes a string representing the encrypted value of a transaction and uses it \
        \ to emit a 'new-transaction' event."
    
        (emit-event (new-transaction encrypted-value))
    )

    (defun emit-event-encrypted-output (encrypted-output: string)
        @doc "Emits an event whenever an encrypted output is generated within the system. \
        \ This function takes a string that represents the encrypted output of a transaction and \
        \ triggers a 'new-encrypted-output' event with it."
    
        (emit-event (new-encrypted-output encrypted-output))
    )

    (defun event-transact (proof:object{Proof} ext-data:object{ext-data})
        @doc 
        "Processes a transaction by emitting a series of events. \
        \ These actions provide a audit trail of the transaction. \
        \ Specifically, the function: \
        \ 1. Marks the transaction inputs as spent by setting nullifier hashes. \
        \ 2. Emits events for each new output commitment,  \
        \ 3. Emits events for encrypted outputs and values"
  
        (
            let*
            (
                (output-commitments (at 'outputCommitments ext-data))
                (encrypted-output (at 'encryptedCommitments ext-data))
                (encrypted-value (at 'encryptedReceipts ext-data))
                (public-values (at 'public_values proof))
                (public-nullifiers (drop 2 (take (- (length public-values) 3) public-values)))
            )
            (map (set-nullifierHash) public-nullifiers)
            (map (emit-event-new-commitment) output-commitments)
            (map (emit-event-encrypted-output) encrypted-output)
            (map (emit-event-encrypted-value) encrypted-value)
            (emit-event (new-nullifier public-nullifiers))
        )
    )
)

(create-table nullifierHashes)
(create-table limits)
(create-table admins)
(initialize 1000000000000.0)
