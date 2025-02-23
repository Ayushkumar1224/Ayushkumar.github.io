import type * as Chunk from "../Collections/Immutable/Chunk/index.js";
import type { SortedSet } from "../Collections/Immutable/SortedSet/index.js";
import * as Fiber from "../Fiber/index.js";
import type { Effect, RIO } from "./effect.js";
/**
 * Acts on the children of this fiber, guaranteeing the specified callback
 * will be invoked, whether or not this effect succeeds.
 *
 * @ets_data_first ensuringChildren_
 */
export declare function ensuringChildren<R1, X>(children: (_: SortedSet<Fiber.Runtime<any, any>>) => RIO<R1, X>, __trace?: string): <R, E, A>(fa: Effect<R, E, A>) => Effect<R & R1, E, A>;
/**
 * Acts on the children of this fiber, guaranteeing the specified callback
 * will be invoked, whether or not this effect succeeds.
 */
export declare function ensuringChildren_<R, E, A, R1, X>(fa: Effect<R, E, A>, children: (_: SortedSet<Fiber.Runtime<any, any>>) => RIO<R1, X>, __trace?: string): Effect<R & R1, E, A>;
/**
 * Acts on the children of this fiber (collected into a single fiber),
 * guaranteeing the specified callback will be invoked, whether or not
 * this effect succeeds.
 */
export declare function ensuringChild_<R, E, A, R2, X>(fa: Effect<R, E, A>, f: (_: Fiber.Fiber<any, Chunk.Chunk<unknown>>) => RIO<R2, X>, __trace?: string): Effect<R & R2, E, A>;
/**
 * Acts on the children of this fiber (collected into a single fiber),
 * guaranteeing the specified callback will be invoked, whether or not
 * this effect succeeds.
 *
 * @ets_data_first ensuringChild_
 */
export declare function ensuringChild<R, E, A, R2, X>(f: (_: Fiber.Fiber<any, Chunk.Chunk<unknown>>) => RIO<R2, X>, __trace?: string): (fa: Effect<R, E, A>) => Effect<R & R2, E, A>;
//# sourceMappingURL=ensuringChildren.d.ts.map