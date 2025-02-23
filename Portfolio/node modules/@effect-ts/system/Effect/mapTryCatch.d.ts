import type { Effect } from "./effect.js";
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 */
export declare function mapTryCatch_<R, E1, E, A, B>(self: Effect<R, E1, A>, f: (a: A) => B, onThrow: (u: unknown) => E, __trace?: string): Effect<R, E1 | E, B>;
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 *
 * @ets_data_first mapTryCatch_
 */
export declare function mapTryCatch<E, A, B>(f: (a: A) => B, onThrow: (u: unknown) => E, __trace?: string): <R, E1>(self: Effect<R, E1, A>) => Effect<R, E | E1, B>;
//# sourceMappingURL=mapTryCatch.d.ts.map