
(namespace "free")

(module token-policy-v1-reference GOVERNANCE

  (defcap GOVERNANCE ()
    ;(enforce-guard (keyset-ref-guard "free.luzz-ledger-admin" ))
    true
  )

  (implements kip.token-policy-v1)
  (use kip.token-policy-v1 [token-info])

  (defschema guards
    mint-guard:guard
    burn-guard:guard
    sale-guard:guard
    transfer-guard:guard
  )

  (deftable policy-guards:{guards})

  (defun get-guards:object{guards} (token:object{token-info})
    (read policy-guards (at 'id token))
  )

  (defun enforce-ledger:bool ()
    ;(enforce-guard (marmalade.ledger.ledger-guard))
    true
  )

  (defun enforce-mint:bool
    ( token:object{token-info}
      account:string
      guard:guard
      amount:decimal
    )
    (enforce-ledger)
    (enforce-guard (at 'mint-guard (get-guards token)))
  )

  (defun enforce-burn:bool
    ( token:object{token-info}
      account:string
      amount:decimal
    )
    (enforce-ledger)
    (enforce-guard (at 'burn-guard (get-guards token)))
  )

  (defun enforce-init:bool
    ( token:object{token-info}

    )
    (enforce-ledger)
    (insert policy-guards (at 'id token)
      { 'mint-guard: (read-keyset 'guard)
      , 'burn-guard: (read-keyset 'guard)
      , 'sale-guard: (read-keyset 'guard)
      , 'transfer-guard: (read-keyset 'guard) })
    true
  )


  (defun enforce-offer:bool
    ( token:object{token-info}
      seller:string
      amount:decimal
      sale-id:string )
    (enforce-ledger)
    (enforce-sale-pact sale-id)
    true
  )

  (defun enforce-buy:bool
    ( token:object{token-info}
      seller:string
      buyer:string
      buyer-guard:guard
      amount:decimal
      sale-id:string )
    (enforce-ledger)
    (enforce-sale-pact sale-id)
    true
  )

  (defun enforce-sale-pact:bool (sale:string)
    "Enforces that SALE is id for currently executing pact"
    (enforce (= sale (pact-id)) "Invalid pact/sale id")
  )

  (defun enforce-transfer:bool
    ( token:object{token-info}
      sender:string
      guard:guard
      receiver:string
      amount:decimal )
    (enforce-ledger)
    true
  )

  (defun enforce-crosschain:bool
    ( token:object{token-info}
      sender:string
      guard:guard
      receiver:string
      target-chain:string
      amount:decimal )
    (enforce-ledger)
    true
  )
)

;  (if (read-msg 'upgrade)
;    ["upgrade complete"]
;    [ (create-table policy-guards) ])

(create-table policy-guards)