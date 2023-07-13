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

    (defschema Args
        "Structure representing the arguments to the transact function."
        root: integer
        outputCommitments: [integer]
        publicAmount: decimal
        extDataHash: string
        tokenHash: string
    )

    (defschema ExtData
        "Structure representing a ExtData."
        sender: string
        recipient: string
        extAmount: decimal
        relayer: integer
        fee: decimal
        encryptedOutput1: integer
        encryptedOutput2: integer
        token: object{Token}
    )

    (defschema Token
        "Structure representing a token."
        chainId: integer
        type: string
        contract-kip-0005:module{fungible-v2}
        contract-kip-0011:module{poly-fungible-v1}
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

    (defun kip-0005-deposit 
        (sender:string
         recipient:string 
         amount:decimal 
         max-deposit-amount:decimal 
         token:module{fungible-v2})
        (enforce (<= amount max-deposit-amount) "amount is larger than maximumDepositAmount")
        (token::transfer sender recipient amount)
    )
    
    (defun kip-0005-withdraw 
        (sender:string 
         recipient:string 
         amount:decimal 
         token:module{fungible-v2})
        (token::transfer sender recipient amount)
    )

    (defun kip-0011-deposit 
        (sender:string
         recipient:string 
         amount:decimal 
         max-deposit-amount:decimal 
         token:module{poly-fungible-v1}
         token-id:string)
        (enforce (<= amount max-deposit-amount) "amount is larger than maximumDepositAmount")
        (token::transfer token-id sender recipient amount)
    )
    
    (defun kip-0011-withdraw 
        (sender:string 
         recipient:string 
         amount:decimal 
         token:module{poly-fungible-v1}
         token-id:string)
        (token::transfer token-id sender recipient amount)
    )

    (defun hash-extData (extData:object{ExtData})
        (let* ((recipient (at 'recipient extData))
            (amount (at 'extAmount extData))
            (fee (at 'fee extData))
            (json-string (format "{{},{},{}}" [recipient amount fee])))
        (hash json-string))
    )

    (defun hash-token (token:object{Token})
        (let* ((chainId (at 'chainId token))
            (contract (at 'contract-kip-0005 token))
            (type (at 'type token))
            (id (at 'id token))
            (json-string (format "{{},{},{},{}}" [chainId contract type id])))
        (hash json-string))
    )

    (defun emit-event-new-nullifier (nullifier:integer)
        (emit-event (new-nullifier nullifier))
    )
    
    (defun transact (args:object{Args} proof:object{Proof} extData:object{ExtData})
        (
            let*
            (
                (maximumDepositAmount (get-maximum-deposit-amount))

                ; args
                (root (at 'root args))
                (tokenHash (at 'tokenHash args))
                (extDataHash (at 'extDataHash args))
                (outputCommitments (at 'outputCommitments args))

                ; proof
                (publicValues (at 'public_values proof))

                ; extData
                (sender (at 'sender extData))
                (recipient (at 'recipient extData))
                (amount (at 'extAmount extData))
                (fee (at 'fee extData))
                (token (at 'token extData))
                (encryptedOutput_0 (at 'encryptedOutput1 extData))
                (encryptedOutput_1 (at 'encryptedOutput2 extData))

                (tokenHashed (hash-token token))
                (extDataHashed (hash-extData extData))

                ; extData/token
                (tokenContractKip0005 (at 'contract-kip-0005 token))
                (tokenContractKip0011 (at 'contract-kip-0011 token))
                (tokenType (at 'type token))
                (tokenId (at 'id token))

                (isKnownRoot (merkle.is-known-root root))
                (publicAmount (calculate-public-amount amount fee))

                (inputNullifiers publicValues)

                (wereSpent (map (is-spent) inputNullifiers))

                (outputCommitment_0 (at 0 outputCommitments))
                (outputCommitment_1 (at 1 outputCommitments))
            )

            ; validations
            (enforce (= isKnownRoot true) "Invalid merkle root")
            (map (validate-spent) wereSpent)
            (enforce (= (at 'publicAmount args) publicAmount) "Invalid public amount")
            (enforce (= (verify-proof proof) true) "Invalid transaction proof")
            (enforce (= tokenHashed tokenHash) "Invalid token hash")
            (enforce (= extDataHashed extDataHash) "Invalid extData hash")

            ; actions
            (map (set-nullifierHash) inputNullifiers)

            (if (and (= tokenType "kip-0005") (> amount 0.0)) (kip-0005-deposit sender "contract-address" amount maximumDepositAmount tokenContractKip0005) "")
            (if (and (= tokenType "kip-0005") (< amount 0.0)) (kip-0005-withdraw "contract-address" recipient (- amount) tokenContractKip0005) "")

            (if (and (= tokenType "kip-0011") (> amount 0.0)) (kip-0011-deposit sender "contract-address" amount maximumDepositAmount tokenContractKip0011 tokenId) "")
            (if (and (= tokenType "kip-0011") (< amount 0.0)) (kip-0011-withdraw "contract-address" recipient (- amount) tokenContractKip0011 tokenId) "")

            ; events
            (emit-event (new-commitment outputCommitment_0 (at 'index (merkle.insert-leaf outputCommitment_0)) encryptedOutput_0))
            (emit-event (new-commitment outputCommitment_1 (at 'index (merkle.insert-leaf outputCommitment_1)) encryptedOutput_1))
            (map (emit-event-new-nullifier) inputNullifiers)

            { 
                "tokenHashed": tokenHashed,
                "extDataHash": extDataHash
            }
        )
    )
)

(create-table nullifierHashes)
(create-table limits)
(initialize 1000000000000.0)