import type { Stream } from "./definitions.js";
/**
 * Recovers from specified error.
 *
 * @ets_data_first catchTag_
 */
export declare function catchTag<K extends E["_tag"] & string, E extends {
    _tag: string;
}, R1, E1, A1>(k: K, f: (e: Extract<E, {
    _tag: K;
}>) => Stream<R1, E1, A1>): <R, A>(self: Stream<R, E, A>) => Stream<R & R1, E1 | Exclude<E, {
    _tag: K;
}>, A1 | A>;
/**
 * Recovers from specified error.
 */
export declare function catchTag_<K extends E["_tag"] & string, E extends {
    _tag: string;
}, R, A, R1, E1, A1>(self: Stream<R, E, A>, k: K, f: (e: Extract<E, {
    _tag: K;
}>) => Stream<R1, E1, A1>): Stream<R & R1, Exclude<E, {
    _tag: K;
}> | E1, A | A1>;
//# sourceMappingURL=catchTag.d.ts.map