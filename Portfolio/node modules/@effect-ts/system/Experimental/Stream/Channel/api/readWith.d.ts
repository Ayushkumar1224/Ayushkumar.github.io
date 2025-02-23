import * as C from "../core.js";
/**
 * Reads an input and continue exposing both error and completion
 */
export declare function readWith<Env, Env1, Env2, InErr, InElem, InDone, OutErr, OutErr1, OutErr2, OutElem, OutElem1, OutElem2, OutDone, OutDone1, OutDone2>(inp: (i: InElem) => C.Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>, error: (e: InErr) => C.Channel<Env1, InErr, InElem, InDone, OutErr1, OutElem1, OutDone1>, done: (d: InDone) => C.Channel<Env2, InErr, InElem, InDone, OutErr2, OutElem2, OutDone2>): C.Channel<Env & Env1 & Env2, InErr, InElem, InDone, OutErr | OutErr1 | OutErr2, OutElem | OutElem1 | OutElem2, OutDone | OutDone1 | OutDone2>;
//# sourceMappingURL=readWith.d.ts.map