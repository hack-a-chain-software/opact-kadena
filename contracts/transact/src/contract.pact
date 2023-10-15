(namespace (read-msg 'ns))

(module opact GOVERNANCE
    (defcap GOVERNANCE () true)

    ;  (defcap GOVERNANCE ()
    ;      "makes sure only admin account can update the smart contract"
    ;      (enforce-guard (at 'guard (coin.details "opact-deployer")))
    ;  )

    (defschema G1Point
        "Structure representing a G1 point."
        x: integer
        y: integer
    )

    (defschema G2Point
        "Structure representing a G2 point."
        x: [integer]
        y: [integer]
    )

    (defschema Proof
        "Structure representing a proof."
        public_values: [integer]
        a: object{G1Point}
        b: object{G2Point}
        c: object{G1Point}
    )

    (defschema ext-data
        "Structure representing a ext-data."
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
        "Structure representing a reference."
        name: string
        namespace: string
    )

    (defschema token
        "Structure representing a fungible or poly-fungible token."
        refName:object{token-reference}
        refSpec:object{token-reference}
        id: string
    )

    (defschema Limits
        "Structure representing the limits."
        maximumDepositAmount: decimal
    )

    (deftable limits:{Limits})

    (defschema NullifierHashesSchema
        "Schema for the nullifier hashes"
        value:integer)

    (deftable nullifierHashes:{NullifierHashesSchema})

    (defcap new-commitment(commitment: integer index: integer)
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

    (defun reset-nullifiers ()
        (map (set-nullifierHash-to-zero) (select nullifierHashes (where 'value (< 0))))
    )

    (defun is-spent (nullifier:integer)
        (= (length (select nullifierHashes (where 'value (= nullifier)))) 1)
    )

    (defun validate-spent (spent:bool)
        (enforce (= spent false) "Input is already spent")
    )

    (defconst FIELD_SIZE 21888242871839275222246405745257275088548364400416034343698204186575808495617)
    (defconst MAX_EXT_AMOUNT 10000000000.0)
    (defconst MAX_FEE 10000000000.0)
    (defconst FEE 1.0)
    (defconst AMOUNT_DECIMALS 12.0)

    (defun calculate-public-amount (amount-integer:integer fee:decimal)
        (
            let*
            (
                (amount (/ amount-integer (^ 10 AMOUNT_DECIMALS)))
                (publicAmount amount-integer)
            )
            (enforce (< fee MAX_FEE) "Invalid fee")
            (enforce (and (> amount (* MAX_EXT_AMOUNT -1)) (< amount MAX_EXT_AMOUNT)) "Invalid ext amount")
            (if (>= publicAmount 0)
                publicAmount
                (- FIELD_SIZE (* publicAmount -1))
            )
        )
    )

    (defun opact-contract-guard() (create-module-guard "opact-contract-guard"))

    (defun initialize (maximumDepositAmount:decimal)
        (configure-limits maximumDepositAmount)
        ;(coin.create-account "opact-deployer" (opact-contract-guard))
        ;(coin.rotate "opact-contract" (opact-contract-guard))
    )

    (defun configure-limits (maximumDepositAmount:decimal)
        (write limits "1" { "maximumDepositAmount": maximumDepositAmount })
    )

    (defun get-maximum-deposit-amount ()
        (at 'maximumDepositAmount (read limits "1")))

    (defun set-nullifierHash (value:integer)
        (write nullifierHashes (int-to-str 10 value) { "value": value }))
    
    (defun set-nullifierHash-to-zero (obj:object{NullifierHashesSchema})
        (write nullifierHashes (int-to-str 10 (at 'value obj)) { "value": 0 }))

    (defun verify-with-length (n:integer proof:object{Proof})
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
        (enforce (<= amount max-deposit-amount) "amount is larger than maximumDepositAmount")
        (token::transfer-create sender recipient (opact-contract-guard) amount)
    )

    (defun withdraw-fungible-v2-transfer
        (sender:string 
         recipient:string
         recipient-guard:guard
         amount:decimal 
         token:module{fungible-v2})
         (coin.transfer sender "opact-gas-payer" FEE)
         (token::transfer-create sender recipient recipient-guard (- amount FEE))
    )

    (defun withdraw-fungible-v2
        (sender:string 
         recipient:string
         recipient-guard:guard
         amount:decimal 
         token:module{fungible-v2})
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
        (enforce (<= amount max-deposit-amount) "amount is larger than maximumDepositAmount")
        (token::transfer-create token-id sender recipient (opact-contract-guard) amount)
    )

    (defun deposit-poly-fungible-v2
        (sender:string
         recipient:string 
         amount:decimal 
         max-deposit-amount:decimal 
         token:module{kip.poly-fungible-v2}
         token-id:string)
        (enforce (<= amount max-deposit-amount) "amount is larger than maximumDepositAmount")
        (token::transfer-create token-id sender recipient (opact-contract-guard) amount)
    )
    
    (defun withdraw-poly-fungible-v1
        (sender:string 
         recipient:string
         recipient-guard:guard
         amount:decimal 
         token:module{poly-fungible-v1}
         token-id:string)
        (token::transfer-create token-id sender recipient recipient-guard amount)
    )

    (defun withdraw-poly-fungible-v2
        (sender:string 
         recipient:string
         recipient-guard:guard
         amount:decimal 
         token:module{kip.poly-fungible-v2}
         token-id:string)
        (token::transfer-create token-id sender recipient recipient-guard amount)
    )

    (defun transact (proof:object{Proof} ext-data:object{ext-data})
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
            (enforce (= is-known-root true) "Invalid merkle root")

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
        (emit-event (new-commitment output-commitment (at 'index (free.merkle.insert-leaf output-commitment))))
    )

    (defun emit-event-encrypted-value (encrypted-value: string)
        (emit-event (new-transaction encrypted-value))
    )

    (defun emit-event-encrypted-output (encrypted-output: string)
        (emit-event (new-encrypted-output encrypted-output))
    )

    (defun event-transact (proof:object{Proof} ext-data:object{ext-data})
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
(initialize 1000000000000.0)
; (reset-nullifiers)