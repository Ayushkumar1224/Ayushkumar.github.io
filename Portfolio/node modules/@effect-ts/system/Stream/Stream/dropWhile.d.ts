import type { Predicate } from "../../Function/index.js";
import { Stream } from "./definitions.js";
/**
 * Drops all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 */
export declare function dropWhile_<R, E, O>(self: Stream<R, E, O>, pred: Predicate<O>): Stream<R, E, O>;
/**
 * Drops all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 */
export declare function dropWhile<O>(pred: Predicate<O>): <R, E>(self: Stream<R, E, O>) => Stream<R, E, O>;
//# sourceMappingURL=dropWhile.d.ts.map