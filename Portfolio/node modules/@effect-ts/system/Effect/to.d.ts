import type { Promise } from "../Promise/promise.js";
import type { Effect } from "./effect.js";
/**
 * Returns an effect that keeps or breaks a promise based on the result of
 * this effect. Synchronizes interruption, so if this effect is interrupted,
 * the specified promise will be interrupted, too.
 *
 * @ets_data_first to_
 */
export declare function to<E, A>(p: Promise<E, A>, __trace?: string): <R>(effect: Effect<R, E, A>) => Effect<R, never, boolean>;
/**
 * Returns an effect that keeps or breaks a promise based on the result of
 * this effect. Synchronizes interruption, so if this effect is interrupted,
 * the specified promise will be interrupted, too.
 */
export declare function to_<R, E, A>(effect: Effect<R, E, A>, p: Promise<E, A>, __trace?: string): Effect<R, never, boolean>;
//# sourceMappingURL=to.d.ts.map