import * as T from "../../Effect/index.js";
import * as L from "../../Layer/index.js";
export declare const LiveId: unique symbol;
/**
 * The `Live` trait provides access to the "live" environment from within the
 * test environment for effects such as printing test results to the console or
 * timing out tests where it is necessary to access the real environment.
 *
 * The easiest way to access the "live" environment is to use the `live` method
 * with an effect that would otherwise access the test environment.
 *
 * The `withLive` method can be used to apply a transformation to an effect
 * with the live environment while ensuring that the effect itself still runs
 * with the test environment, for example to time out a test. Both of these
 * methods are re-exported in the `environment` package for easy availability.
 */
export interface Live {
    readonly serviceId: typeof LiveId;
    readonly provide: <E, A>(effect: T.Effect<T.DefaultEnv, E, A>) => T.Effect<unknown, E, A>;
}
export declare const Live: import("../../Has/index.js").Tag<Live>;
export declare const live: L.Layer<T.DefaultEnv, never, import("../../Has/index.js").Has<Live>>;
//# sourceMappingURL=index.d.ts.map