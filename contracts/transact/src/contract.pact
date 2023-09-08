(namespace (read-msg 'ns))

(module opact MODULE_ADMIN
    (defcap MODULE_ADMIN () true)

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

    ;  (defschema Proof
    ;      "Structure representing a proof."
    ;      public_values: [integer]
    ;      a: object{G1Point}
    ;      b: object{G1Point}
    ;      c: object{G1Point}
    ;      z: object{G1Point}
    ;      t_1: object{G1Point}
    ;      t_2: object{G1Point}
    ;      t_3: object{G1Point}
    ;      eval_a: integer
    ;      eval_b: integer
    ;      eval_c: integer
    ;      eval_s1: integer
    ;      eval_s2: integer
    ;      eval_zw: integer
    ;      eval_r: integer
    ;      wxi: object{G1Point}
    ;      wxi_w: object{G1Point}
    ;  )

    (defschema Proof
        "Structure representing a proof."
        public_values: [integer]
        a: object{G1Point}
        b: object{G2Point}
        c: object{G1Point}
    )

    (defschema args
        "Structure representing the arguments to the transact function."
        root: integer
        outputCommitments: [integer]
        publicAmount: decimal
        extDataHash: string
        tokenHash: string
    )

    (defschema ext-data
        "Structure representing a ext-data."
        sender: string
        recipient: string
        extAmount: decimal
        relayer: integer
        fee: decimal
        encryptedOutput1: integer
        encryptedOutput2: integer
        encryptedValue: integer
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

    (defcap new-commitment(commitment: integer index: integer encryptedOutput: integer)
      @event
      true
    )

    (defcap new-nullifier(nullifier: integer)
      @event
      true
    )

    (defcap new-transaction(encryptedValue: integer)
      @event
      true
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

    (defun calculate-public-amount (amount:decimal fee:decimal)
        (enforce (< fee MAX_FEE) "Invalid fee")
        (enforce (and (> amount (* MAX_EXT_AMOUNT -1.0)) (< amount MAX_EXT_AMOUNT)) "Invalid ext amount")
        (
            let*
            (
                (publicAmount amount)
            )
            (if (>= publicAmount 0.0)
                publicAmount
                (- FIELD_SIZE publicAmount)
            )
        )
    )

    (defun initialize (maximumDepositAmount:decimal)
        (configure-limits maximumDepositAmount)
    )

    (defun configure-limits (maximumDepositAmount:decimal)
        (write limits "1" { "maximumDepositAmount": maximumDepositAmount })
    )

    (defun get-maximum-deposit-amount ()
        (at 'maximumDepositAmount (read limits "1")))

    (defun set-nullifierHash (value:integer)
        (write nullifierHashes (int-to-str 10 value) { "value": value }))

    (defun verify-with-length (n:integer proof:object{Proof})
        (if (= n 1) (at 'paired (groth16-1x2.verify proof))
            (if (= n 2) (at 'paired (groth16-2x2.verify proof))
                (if (= n 3) (at 'paired (groth16-3x2.verify proof))
                    (if (= n 4) (at 'paired (groth16-4x2.verify proof))
                        (if (= n 5) (at 'paired (groth16-5x2.verify proof))
                            (if (= n 6) (at 'paired (groth16-6x2.verify proof))
                                (if (= n 7) (at 'paired (groth16-7x2.verify proof))
                                    (if (= n 8) (at 'paired (groth16-8x2.verify proof))
                                        (if (= n 9) (at 'paired (groth16-9x2.verify proof))
                                            (if (= n 10) (at 'paired (groth16-10x2.verify proof))
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
             (length-utxos-in (- (length public-values) 7))) ; subtract: root, subtree_root, utxo_out_hash[2], token, delta, message_hash; the remaining are utxos_in
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
        (token::transfer sender recipient amount)
    )
    
    (defun withdraw-fungible-v2
        (sender:string 
         recipient:string 
         amount:decimal 
         token:module{fungible-v2})
        (token::transfer sender recipient amount)
    )

    (defun deposit-poly-fungible-v1
        (sender:string
         recipient:string 
         amount:decimal 
         max-deposit-amount:decimal 
         token:module{poly-fungible-v1}
         token-id:string)
        (enforce (<= amount max-deposit-amount) "amount is larger than maximumDepositAmount")
        (token::transfer token-id sender recipient amount)
    )
    
    (defun withdraw-poly-fungible-v1
        (sender:string 
         recipient:string 
         amount:decimal 
         token:module{poly-fungible-v1}
         token-id:string)
        (token::transfer token-id sender recipient amount)
    )

    (defun emit-event-new-nullifier (nullifier:integer)
        (emit-event (new-nullifier nullifier))
    )

    (defun transact (args:object{args} proof:object{Proof} ext-data:object{ext-data} token-spec:object{token})
        (
            let*
            (
                (valid-data (validate-transact args proof ext-data token-spec))
                (sender (at 'sender ext-data))
                (recipient (at 'recipient ext-data))
                (amount (at 'extAmount ext-data))
                (maximum-deposit-amount (get-maximum-deposit-amount))
                (fee (at 'fee ext-data))
                
                (token-instance (read-msg 'token-instance))
                (token-name (at 'name (at 'refSpec token-spec)))
                (token-id (at 'id token-spec))
                (public-amount (calculate-public-amount (at 'extAmount ext-data) (at 'fee ext-data)))
            )

            (if (> fee 0.0) (coin.transfer sender "opact-gas-payer" fee) "")

            (if (and (= token-name "fungible-v2") (> amount 0.0)) (deposit-fungible-v2 sender "opact-contract" amount maximum-deposit-amount token-instance) "")
            (if (and (= token-name "fungible-v2") (< amount 0.0)) (withdraw-fungible-v2 "opact-contract" recipient (- amount) token-instance) "")
            (if (and (= token-name "poly-fungible-v1") (> amount 0.0)) (deposit-poly-fungible-v1 sender "opact-contract" amount maximum-deposit-amount token-instance token-id) "")
            (if (and (= token-name "poly-fungible-v1") (< amount 0.0)) (withdraw-poly-fungible-v1 "opact-contract" recipient (- amount) token-instance token-id) "")

            (event-transact args proof ext-data)
            {
                "valid-data": valid-data
            }
        )
    )

    (defun validate-transact (args:object{args} proof:object{Proof} ext-data:object{ext-data} token-spec:object{token})
        (
            let*
            (
                (public-values (at 'public_values proof))
                (public-amount (calculate-public-amount (at 'extAmount ext-data) (at 'fee ext-data)))
                (is-known-root (merkle.is-known-root (at 'root args)))
                (input-nullifiers public-values)
                (were-spent (map (is-spent) input-nullifiers))
                (token-spec-hashed (hash token-spec))
                (ext-data-hashed (hash ext-data))
            )
            (enforce (= token-spec-hashed (at 'tokenHash args)) "Invalid token hash")
            (enforce 
                (= 
                    (format "{}.{}" [(at 'namespace (at 'refName token-spec)) (at 'name (at 'refName token-spec))])
                    (format "{}" [(read-msg "token-instance")] )
                ) "Invalid token instance")
            (enforce (= is-known-root true) "Invalid merkle root")
            (map (validate-spent) were-spent)
            (enforce (= (at 'publicAmount args) public-amount) "Invalid public amount")
            (enforce (= (verify-proof proof) true) "Invalid transaction proof")
            (enforce (= ext-data-hashed (at 'extDataHash args)) "Invalid ext-data hash")
            {
                "ext-data-hashed": ext-data-hashed
                ,"token-spec-hashed": token-spec-hashed
                ,"public-amount": public-amount
            }
        )
    )

    (defun event-transact (args:object{args} proof:object{Proof} ext-data:object{ext-data})
        (
            let*
            (
                (output-commitments (at 'outputCommitments args))
                (encrypted-output_0 (at 'encryptedOutput1 ext-data))
                (encrypted-output_1 (at 'encryptedOutput2 ext-data))
                (encrypted-value (at 'encryptedValue ext-data))
                (public-values (at 'public_values proof))
                (input-nullifiers public-values)
                (output-commitment_0 (at 0 output-commitments))
                (output-commitment_1 (at 1 output-commitments))
            )
            (map (set-nullifierHash) input-nullifiers)
            (emit-event (new-commitment output-commitment_0 (at 'index (merkle.insert-leaf output-commitment_0)) encrypted-output_0))
            (emit-event (new-commitment output-commitment_1 (at 'index (merkle.insert-leaf output-commitment_1)) encrypted-output_1))
            (emit-event (new-transaction encrypted-value))
            (map (emit-event-new-nullifier) input-nullifiers)
        )
    )
)

(create-table nullifierHashes)
(create-table limits)
(initialize 1000000000000.0)