import type * as C from "../core.js";
export declare function zipParRight_<Env, Env1, InErr, InErr1, InElem, InElem1, InDone, InDone1, OutErr, OutErr1, OutElem, OutElem1, OutDone, OutDone1>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, that: C.Channel<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, OutDone1>): C.Channel<Env1 & Env, InErr & InErr1, InElem & InElem1, InDone & InDone1, OutErr | OutErr1, OutElem | OutElem1, OutDone1>;
/**
 * @ets_data_first zipParRight_
 */
export declare function zipParRight<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, OutDone1>(that: C.Channel<Env1, InErr1, InElem1, InDone1, OutErr1, OutElem1, OutDone1>): <Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>(self: C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>) => C.Channel<Env1 & Env, InErr & InErr1, InElem & InElem1, InDone & InDone1, OutErr1 | OutErr, OutElem1 | OutElem, OutDone1>;
//# sourceMappingURL=zipParRight.d.ts.map