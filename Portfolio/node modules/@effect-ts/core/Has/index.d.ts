import "../Operator/index.js";
import * as T from "@effect-ts/system/Effect";
import type { Has, Tag } from "@effect-ts/system/Has";
import type { Compute, IsEqualTo, UnionToIntersection } from "@effect-ts/system/Utils";
export * from "@effect-ts/system/Has";
export declare type DerivedFunctions<A> = UnionToIntersection<{
    [K in keyof A]: [A[K]] extends [
        (...args: infer ARGS) => T.Effect<infer RX, infer EX, infer AX>
    ] ? IsEqualTo<(...args: ARGS) => T.Effect<RX, EX, AX>, A[K]> extends true ? {
        [H in K]: (...args: ARGS) => T.Effect<RX & Has<A>, EX, AX>;
    } : never : never;
}[keyof A]>;
export declare function deriveFunctions<TX, Ks extends readonly (keyof DerivedFunctions<TX>)[]>(self: Tag<TX>, ...keys: Ks): Compute<UnionToIntersection<{
    [k in keyof Ks]: Ks[k] extends keyof DerivedFunctions<TX> ? {
        [H in Ks[k]]: DerivedFunctions<TX>[Ks[k]];
    } : never;
}[number]>, "flat">;
//# sourceMappingURL=index.d.ts.map