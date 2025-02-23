import type { Any } from "../Any/index.js";
import type { Covariant } from "../Covariant/index.js";
import type * as HKT from "../HKT/index.js";
import type { Monad } from "../Monad/index.js";
export declare function doF<F extends HKT.URIS, C = HKT.Auto>(F: Any<F, C> & Covariant<F, C>): HKT.Kind<F, C, HKT.Initial<C, "K">, HKT.Initial<C, "Q">, HKT.Initial<C, "W">, HKT.Initial<C, "X">, HKT.Initial<C, "I">, HKT.Initial<C, "S">, HKT.Initial<C, "R">, HKT.Initial<C, "E">, {}>;
export declare function bindF<F extends HKT.URIS, C = HKT.Auto>(F: Monad<F, C>): <K2, Q2, W2, X2, I2, S2, R2, E2, BK, BN extends string, BA>(tag: Exclude<BN, keyof BK>, f: (a: BK) => HKT.Kind<F, C, K2, Q2, W2, X2, I2, S2, R2, E2, BA>) => <K, Q, W, X, I, S, R, E>(fa: HKT.Kind<F, C, HKT.Intro<C, "K", K2, K>, HKT.Intro<C, "Q", Q2, Q>, HKT.Intro<C, "W", W2, W>, HKT.Intro<C, "X", X2, X>, HKT.Intro<C, "I", I2, I>, HKT.Intro<C, "S", S2, S>, HKT.Intro<C, "R", R2, R>, HKT.Intro<C, "E", E2, E>, BK>) => HKT.Kind<F, C, HKT.Mix<C, "K", [K2, K]>, HKT.Mix<C, "Q", [Q2, Q]>, HKT.Mix<C, "W", [W2, W]>, HKT.Mix<C, "X", [X2, X]>, HKT.Mix<C, "I", [I2, I]>, HKT.Mix<C, "S", [S2, S]>, HKT.Mix<C, "R", [R2, R]>, HKT.Mix<C, "X", [E2, E]>, BK & {
    [k in BN]: BA;
}>;
export declare function letF<F extends HKT.URIS, C = HKT.Auto>(F: Monad<F, C>): <BK, BN extends string, BA>(tag: Exclude<BN, keyof BK>, f: (a: BK) => BA) => <K, Q, W, X, I, S, R, E>(fa: HKT.Kind<F, C, K, Q, W, X, I, S, R, E, BK>) => HKT.Kind<F, C, K, Q, W, X, I, S, R, E, BK & {
    [k in BN]: BA;
}>;
//# sourceMappingURL=do.d.ts.map