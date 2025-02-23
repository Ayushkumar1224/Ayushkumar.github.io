import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 */
export declare function runForEach_<R, R1, E, E1, A, X>(self: C.Stream<R, E, A>, f: (a: A) => T.Effect<R1, E1, X>): T.Effect<R & R1, E | E1, void>;
/**
 * Consumes all elements of the stream, passing them to the specified callback.
 *
 * @ets_data_first runForEach_
 */
export declare function runForEach<R1, E1, A, X>(f: (a: A) => T.Effect<R1, E1, X>): <R, E>(self: C.Stream<R, E, A>) => T.Effect<R & R1, E1 | E, void>;
//# sourceMappingURL=runForEach.d.ts.map