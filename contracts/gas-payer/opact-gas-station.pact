(namespace 'free)

(module opact-gas-station GOVERNANCE
  @doc 
  "This module, is designed to manage gas payments for transactions on the blockchain. \
  \ It ensures that only authorized users (typically admin) can update the smart contract. \
  \ The module implements a gas payment system, following the gas-payer-v1 interface, to handle transaction fees."

  (defcap GOVERNANCE ()
    @doc
    "Capability ensuring that only the admin account can update the smart contract. \
    \ This is a governance measure to maintain control over the module's functionality."
   
    (enforce-keyset "free.opact-admin")
  )

  (implements gas-payer-v1)
  (use coin)

  (defschema gas
    @doc
    "Schema defining the structure for gas accounting. \
    \ It includes the balance of gas available and the guard for security, \ 
    \ governing who can access and use the gas."

    balance:decimal
    guard:guard)

  (deftable ledger:{gas})

  (defcap GAS_PAYER:bool
     ( user:string
      limit:integer
      price:decimal
    )
    @doc
    "Capability defining the conditions under which a user can pay for gas. \
    \ It checks for specific transaction types and ensures that only cals from free.opact are allowed."
    
    (enforce (= "exec" (at "tx-type" (read-msg))) "Inside an exec")
    (enforce (= 1 (length (at "exec-code" (read-msg)))) "Tx of only one pact function")
    (enforce (= "(free.opact" (take 11 (at 0 (at "exec-code" (read-msg))))) "only opact smart contract")
    (compose-capability (ALLOW_GAS))
  )

  (defcap ALLOW_GAS ()
    @doc
    "An unparameterized capability that allows for gas usage. \
    \ It always returns true, signifying that gas allowance is granted."
   
  true)

  (defun create-gas-payer-guard:guard ()
    @doc 
    "Function to create a guard for a coin account that can pay gas. \
    \ This utilizes the custom gas-payer-guard to ensure proper control and authorization for gas payment."
 
    (create-user-guard (gas-payer-guard))
  )

  (defun gas-payer-guard ()
    @doc
    "The guard function for gas payment. \
    \ It requires both the GAS and ALLOW_GAS capabilities to be in scope, \
    \ ensuring that gas payments are authorized."

    (require-capability (GAS))
    (require-capability (ALLOW_GAS))
  )
)

; This code is used to create the opact-gas-payer account using the gas-payer-guard and 
; transfer an initial balance of 2.0 to it from the opact-deployer account.
(coin.transfer-create "opact-deployer" "opact-gas-payer" (free.opact-gas-station.create-gas-payer-guard) 2.0)