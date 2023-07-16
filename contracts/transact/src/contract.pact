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
    )

    (defschema token-kip-0005
        "Structure representing a fungible token."
        chainId: integer
        type: string
        contract:module{fungible-v2}
    )

    (defschema token-kip-0011
        "Structure representing a poly-fungible token."
        chainId: integer
        type: string
        contract:module{poly-fungible-v1}
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
                (publicAmount (- amount fee))
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

    (defun verify-proof (proof:object{Proof})
        (at 'paired (groth16.verify proof))
    )

    (defun deposit-kip-0005
        (sender:string
         recipient:string 
         amount:decimal 
         max-deposit-amount:decimal 
         token:module{fungible-v2})
        (enforce (<= amount max-deposit-amount) "amount is larger than maximumDepositAmount")
        (token::transfer sender recipient amount)
    )
    
    (defun withdraw-kip-0005
        (sender:string 
         recipient:string 
         amount:decimal 
         token:module{fungible-v2})
        (token::transfer sender recipient amount)
    )

    (defun deposit-kip-0011
        (sender:string
         recipient:string 
         amount:decimal 
         max-deposit-amount:decimal 
         token:module{poly-fungible-v1}
         token-id:string)
        (enforce (<= amount max-deposit-amount) "amount is larger than maximumDepositAmount")
        (token::transfer token-id sender recipient amount)
    )
    
    (defun withdraw-kip-0011
        (sender:string 
         recipient:string 
         amount:decimal 
         token:module{poly-fungible-v1}
         token-id:string)
        (token::transfer token-id sender recipient amount)
    )

    (defun hash-ext-data (ext-data:object{ext-data})
        (let* ((recipient (at 'recipient ext-data))
            (amount (at 'extAmount ext-data))
            (fee (at 'fee ext-data))
            (json-string (format "{{},{},{}}" [recipient amount fee])))
        (hash json-string))
    )

    (defun hash-token-kip-0005 (token:object{token-kip-0005})
        (let* ((chainId (at 'chainId token))
            (contract (at 'contract token))
            (type (at 'type token))
            (json-string (format "{{},{},{}}" [chainId contract type])))
        (hash json-string))
    )

    (defun hash-token-kip-0011 (token:object{token-kip-0011})
        (let* ((chainId (at 'chainId token))
            (contract (at 'contract token))
            (type (at 'type token))
            (id (at 'id token))
            (json-string (format "{{},{},{},{}}" [chainId contract type id])))
        (hash json-string))
    )

    (defun emit-event-new-nullifier (nullifier:integer)
        (emit-event (new-nullifier nullifier))
    )

    (defun transact-kip-0005 (args:object{args} proof:object{Proof} ext-data:object{ext-data} token:object{token-kip-0005})
        (validate-transact args proof ext-data)
        (
            let*
            (
                (token-hash (at 'tokenHash args))
                (token-hashed (hash-token-kip-0005 token))
                (sender (at 'sender ext-data))
                (recipient (at 'recipient ext-data))
                (amount (at 'extAmount ext-data))
                (maximum-deposit-amount (get-maximum-deposit-amount))
                (contract (at 'contract token))
            )
            (enforce (= token-hashed token-hash) "Invalid token hash")
            (if (> amount 0.0) (deposit-kip-0005 sender "contract-address" amount maximum-deposit-amount contract) "")
            (if (< amount 0.0) (withdraw-kip-0005 "contract-address" recipient (- amount) contract) "")
            (event-transact args proof ext-data)
            {
                "token-hashed": token-hashed
            }
        )
    )

    (defun transact-kip-0011 (args:object{args} proof:object{Proof} ext-data:object{ext-data} token:object{token-kip-0011})
        (validate-transact args proof ext-data)
        (
            let*
            (
                (token-hash (at 'tokenHash args))
                (token-hashed (hash-token-kip-0011 token))
                (sender (at 'sender ext-data))
                (recipient (at 'recipient ext-data))
                (amount (at 'extAmount ext-data))
                (maximum-deposit-amount (get-maximum-deposit-amount))
                (contract (at 'contract token))
                (tokenId (at 'id token))
            )
            (enforce (= token-hashed token-hash) "Invalid token hash")
            (if (> amount 0.0) (deposit-kip-0011 sender "contract-address" amount maximum-deposit-amount contract tokenId) "")
            (if (< amount 0.0) (withdraw-kip-0011 "contract-address" recipient (- amount) contract tokenId) "")
            (event-transact args proof ext-data)
            {
                "token-hashed": token-hashed
            }
        )
    )

    (defun validate-transact (args:object{args} proof:object{Proof} ext-data:object{ext-data})
        (
            let*
            (
                (root (at 'root args))
                (ext-data-hash (at 'extDataHash args))
                (public-values (at 'public_values proof))
                (amount (at 'extAmount ext-data))
                (fee (at 'fee ext-data))
                (ext-data-hashed (hash-ext-data ext-data))
                (is-known-root (merkle.is-known-root root))
                (public-amount (calculate-public-amount amount fee))
                (input-nullifiers public-values)
                (were-spent (map (is-spent) input-nullifiers))
            )
            (enforce (= is-known-root true) "Invalid merkle root")
            (map (validate-spent) were-spent)
            (enforce (= (at 'publicAmount args) public-amount) "Invalid public amount")
            (enforce (= (verify-proof proof) true) "Invalid transaction proof")
            (enforce (= ext-data-hashed ext-data-hash) "Invalid ext-data hash")
        )
    )

    (defun event-transact (args:object{args} proof:object{Proof} ext-data:object{ext-data})
        (
            let*
            (
                (output-commitments (at 'outputCommitments args))
                (encrypted-output_0 (at 'encryptedOutput1 ext-data))
                (encrypted-output_1 (at 'encryptedOutput2 ext-data))
                (public-values (at 'public_values proof))
                (input-nullifiers public-values)
                (output-commitment_0 (at 0 output-commitments))
                (output-commitment_1 (at 1 output-commitments))
            )
            (map (set-nullifierHash) input-nullifiers)
            (emit-event (new-commitment output-commitment_0 (at 'index (merkle.insert-leaf output-commitment_0)) encrypted-output_0))
            (emit-event (new-commitment output-commitment_1 (at 'index (merkle.insert-leaf output-commitment_1)) encrypted-output_1))
            (map (emit-event-new-nullifier) input-nullifiers)
        )
    )
)

(create-table nullifierHashes)
(create-table limits)
(initialize 1000000000000.0)