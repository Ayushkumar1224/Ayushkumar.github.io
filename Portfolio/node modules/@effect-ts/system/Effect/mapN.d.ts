import type { NonEmptyArray } from "../Collections/Immutable/NonEmptyArray/index.js";
import type * as Tp from "../Collections/Immutable/Tuple/index.js";
import type { _A, _E, _R, ForcedArray } from "../Utils/index.js";
import type { Effect } from "./effect.js";
/**
 * Sequentially zips the specified effects using the specified combiner
 * function.
 *
 * @ets_data_first mapN_
 */
export declare function mapN<T extends NonEmptyArray<Effect<any, any, any>>, B>(f: (..._: ForcedArray<{
    [k in keyof T]: _A<T[k]>;
}>) => B, __trace?: string): (t: Tp.Tuple<T>) => Effect<_R<T[number]>, _E<T[number]>, B>;
/**
 * Sequentially zips the specified effects using the specified combiner
 * function.
 */
export declare function mapN_<T extends NonEmptyArray<Effect<any, any, any>>, B>(t: Tp.Tuple<T>, f: (..._: ForcedArray<{
    [k in keyof T]: _A<T[k]>;
}>) => B, __trace?: string): Effect<_R<T[number]>, _E<T[number]>, B>;
/**
 * Zips the specified effects in parallel using the specified combiner
 * function.
 *
 * @ets_data_first mapNPar_
 */
export declare function mapNPar<T extends NonEmptyArray<Effect<any, any, any>>, B>(f: (..._: ForcedArray<{
    [k in keyof T]: _A<T[k]>;
}>) => B, __trace?: string): (t: Tp.Tuple<T>) => Effect<_R<T[number]>, _E<T[number]>, B>;
/**
 * Zips the specified effects in parallel using the specified combiner
 * function.
 */
export declare function mapNPar_<T extends NonEmptyArray<Effect<any, any, any>>, B>(t: Tp.Tuple<T>, f: (..._: ForcedArray<{
    [k in keyof T]: _A<T[k]>;
}>) => B, __trace?: string): Effect<_R<T[number]>, _E<T[number]>, B>;
/**
 * Zips the specified effects in parallel using the specified combiner
 * function.
 *
 * This variant uses up to N fibers.
 */
export declare function mapNParN<T extends NonEmptyArray<Effect<any, any, any>>, B>(n: number, f: (..._: ForcedArray<{
    [k in keyof T]: _A<T[k]>;
}>) => B, __trace?: string): (t: Tp.Tuple<T>) => Effect<_R<T[number]>, _E<T[number]>, B>;
/**
 * Zips the specified effects in parallel using the specified combiner
 * function.
 *
 * This variant uses up to N fibers.
 */
export declare function mapNParN_<T extends NonEmptyArray<Effect<any, any, any>>, B>(t: Tp.Tuple<T>, n: number, f: (..._: ForcedArray<{
    [k in keyof T]: _A<T[k]>;
}>) => B, __trace?: string): Effect<_R<T[number]>, _E<T[number]>, B>;
//# sourceMappingURL=mapN.d.ts.map