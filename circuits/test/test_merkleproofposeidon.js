import { assert } from "chai";
import path from "path";
import snarkjs_0_1_20 from "../node_modules/snarkjs_0_1_20/index.js";
import crypto from "crypto";
import buildBabyjub from "../node_modules/circomlibjs/src/babyjub.js";
import { buildPoseidon as buildPoseidonWasm } from "../node_modules/circomlibjs/src/poseidon_wasm.js";
import wasmTester from "circom_tester/wasm/tester.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { bigInt } = snarkjs_0_1_20;
const babyJub = await buildBabyjub();
const poseidon = await buildPoseidonWasm();

const randrange = function (from, to) {
  if (from == to) return from;
  if (from > to) [from, to] = [to, from];
  const interval = to - from;
  let t = 0;
  while (interval > bigInt.one.shl(t)) t++;
  return from + (bigInt.leBuff2int(crypto.randomBytes(t)) % interval);
};

describe("Merkle proof circuit test", function () {
  this.timeout(200000);

  it("Should create and test a merkle proof circuit", async () => {
    const n = 10;
    const leaf = randrange(0n, babyJub.p);
    const _path = Array(n)
      .fill(0)
      .map((x) => (Math.random() < 0.5 ? 1n : 0n));
    const sibling = Array(n);
    let root = leaf;
    for (let i = 0; i < n; i++) {
      sibling[i] = randrange(0n, babyJub.p);
      root =
        _path[i] == 0n
          ? poseidon.F.toObject(poseidon([root, sibling[i]]))
          : poseidon.F.toObject(poseidon([sibling[i], root]));
    }

    const circuit = await wasmTester(
      path.join(__dirname, "circuits", "test_merkleproofposeidon.circom")
    );

    const witness = await circuit.calculateWitness({
      sibling,
      path: _path,
      leaf,
    });

    assert(witness[1].equals(root));
  });
});
