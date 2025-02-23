import type * as CS from "../../../../Cause/index.js";
import * as C from "../core.js";
/**
 * A more powerful version of `mapError` which also surfaces the `Cause` of the channel failure
 */
export declare function mapErrorCause_<Env, InErr, InElem, InDone, OutErr, OutErr2, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, f: (cause: CS.Cause<OutErr>) => CS.Cause<OutErr2>): C.Channel<Env, InErr, InElem, InDone, OutErr2, OutElem, OutDone>;
/**
 * A more powerful version of `mapError` which also surfaces the `Cause` of the channel failure
 *
 * @ets_data_first mapErrorCause_
 */
export declare function mapErrorCause<OutErr, OutErr2>(f: (cause: CS.Cause<OutErr>) => CS.Cause<OutErr2>): <Env, InErr, InElem, InDone, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env, InErr, InElem, InDone, OutErr2, OutElem, OutDone>;
//# sourceMappingURL=mapErrorCause.d.ts.map