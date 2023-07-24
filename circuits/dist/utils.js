import { buildPoseidon } from "circomlibjs";
const poseidon = await buildPoseidon();
export function poseidonHash(inputs) {
    return Buffer.from(poseidon(inputs)).toString("hex");
}
console.log(poseidonHash([1n, 2n]));
export const R = 21888242871839275222246405745257275088548364400416034343698204186575808495617n;
export function randrange(from, to) {
    if (from == to)
        return from;
    if (from > to)
        [from, to] = [to, from];
    const interval = to - from;
    return from + Math.floor(Math.random() * interval);
}
export function randrangeBigint(from, to) {
    if (from == to)
        return from;
    if (from > to)
        [from, to] = [to, from];
    const interval = to - from;
    return from + BigInt(Math.random()) * interval;
}
export function bigint_to_hex(x, sz) {
    const zeros = "0000000000000000000000000000000000000000000000000000000000000000";
    sz = typeof sz === "undefined" ? 32 : sz;
    const xdata = x.toString(16);
    return "0x" + zeros.substring(x.length, sz * 2) + xdata;
}
export function fr_random() {
    return randrangeBigint(0n, R);
}
export function u160_random() {
    return randrangeBigint(0n, 1n << 160n);
}
//# sourceMappingURL=utils.js.map