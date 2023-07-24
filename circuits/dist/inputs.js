// import assert from "assert";
// import { poseidon } from "circomlibjs";
// import { bn128 } from "snarkjs";
// import { fr_random, u160_random } from "./utils.js";
// const PROOF_LENGTH = 32;
// const MIN_AMOUNT = -1n << 240n;
// const MAX_AMOUNT = 1n << 240n;
// console.log(Buffer.from(poseidon([1, 2])).toString("hex"));
// function owner_commit(pubkey, blinding) {
//     return poseidon([pubkey, blinding]);
// }
// function empty_utxo(token, pubkey) {
//     const blinding = fr_random();
//     const mp_path = 0n;
//     const mp_sibling = Array(PROOF_LENGTH).fill(0n);
//     return utxo(token, 0n, pubkey, blinding, mp_sibling, mp_path);
// }
// function utxo(token, amount, pubkey, blinding, mp_sibling, mp_path) {
//     if (typeof blinding === "undefined") blinding = fr_random();
//     return { token, amount, pubkey, blinding, mp_sibling, mp_path };
// }
// function utxo_hash(utxo) {
//     return poseidon(out_utxo_inputs(utxo));
// }
// function out_utxo_inputs({ token, amount, pubkey, blinding }) {
//     return [token, amount, owner_commit(pubkey, blinding)];
// }
// function in_utxo_inputs({ token, amount, blinding }) {
//     return [token, amount, blinding];
// }
// function obj_utxo_inputs({ token, amount, pubkey, blinding }) {
//     return {
//         token,
//         amount,
//         owner_commit: owner_commit(pubkey, blinding)
//     }
// }
// function utxo_random(fixed) {
//     return {
//         token: u160_random(),
//         amount: u160_random(),
//         pubkey: fr_random(),
//         blinding: fr_random(),
//         ...fixed
//     };
// }
// function nullifier(utxo, secret) {
//     return poseidon([secret, utxo_hash(utxo)]);
// }
// function transfer_compute(sparseTree, root, utxo_in, utxo_out, token, delta, message_hash, secret) {
//     assert(delta > MIN_AMOUNT && delta < MAX_AMOUNT);
//     for (let i in utxo_in) assert(utxo_in[i].amount >= 0n && utxo_in[i].amount < MAX_AMOUNT);
//     for (let i in utxo_out) assert(utxo_out[i].amount >= 0n && utxo_out[i].amount < MAX_AMOUNT);
//     const pubk = get_pubkey(secret);
//     utxo_in = utxo_in.concat(utxo_in, Array(3 - utxo_in.length).fill(0).map(_ => empty_utxo(token, pubk)));
//     if (utxo_out.length == 0) {
//         assert(utxo_in[0].amount + utxo_in[1].amount + delta == 0n);
//         utxo_out = Array(2).fill(0).map(_ => empty_utxo(token, pubk));
//     } else if (utxo_out.length == 1) {
//         const new_amount = delta + utxo_in[0].amount + utxo_in[1].amount - utxo_out[0].amount;
//         assert(new_amount >= 0n);
//         utxo_out.push(utxo(token, new_amount, pubk, undefined, undefined, undefined));
//     } else {
//         assert(utxo_in[0].amount + utxo_in[1].amount + delta == utxo_out[0].amount + utxo_out[1].amount);
//     }
//     assert(utxo_in[0].token == token && utxo_in[1].token == token && utxo_out[0].token == token && utxo_out[1].token == token);
//     const secret_token = token;
//     token = delta != 0n ? token : 0n;
//     delta = delta < 0n ? bn128.r + delta : delta;
//     const inputs = {
//         root,
//         subtree_root: sparseTree.root,
//         nullifier: utxo_in.map(u => nullifier(u, secret)),
//         utxo_out_hash: utxo_out.map(u => utxo_hash(u)),
//         token,
//         delta,
//         message_hash,
//         mp_sibling: utxo_in.map(u => u.mp_sibling),
//         mp_path: utxo_in.map(u => u.mp_path),
//         subtree_mp_sibling: utxo_in.map(u => sparseTree.proof(u.mp_path === 0n ? 1 : u.mp_path)),
//         utxo_in_data: utxo_in.map(u => in_utxo_inputs(u).slice(1)),
//         utxo_out_data: utxo_out.map(u => out_utxo_inputs(u).slice(1)),
//         secret,
//         secret_token
//     };
//     const add_utxo = utxo_out;
//     const add_nullifier = utxo_in.map(u => nullifier(u, secret));
//     return { inputs, add_utxo, add_nullifier }
// }
//     // module.exports = {
//     //     owner_commit,
//     //     empty_utxo,
//     //     PROOF_LENGTH,
//     //     utxo,
//     //     utxo_hash,
//     //     out_utxo_inputs,
//     //     in_utxo_inputs,
//     //     obj_utxo_inputs,
//     //     utxo_random,
//     //     fr_random,
//     //     nullifier,
//     //     transfer_compute
//     // }
//# sourceMappingURL=inputs.js.map