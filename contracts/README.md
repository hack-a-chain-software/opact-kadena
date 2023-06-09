## Generate lib

```bash
pnpm generate-plonk
```

## Load module

```bash
pact> (load "lib.repl")
```

## Interact with the module

```bash
pact> (check-value 1 2)
true
```

## Run the test

```bash
pnpm test-plonk
```

If everything is ok, you should see the following output:

```bash
Load successful
```

If any test fails, you should see something like this:

```bash
plonk-verifier/tests/plonk-tests.repl:7:0:ExecError: FAILURE: verify: expected {"paired": true}:object:*, received {"paired": false}:object:*
Load failed
```