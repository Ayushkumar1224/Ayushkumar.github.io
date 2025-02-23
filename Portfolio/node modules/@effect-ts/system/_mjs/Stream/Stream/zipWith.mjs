// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as E from "../../Either/index.mjs";
import * as Ex from "../../Exit/api.mjs";
import { pipe, tuple } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import { zipChunks_ } from "../_internal/utils.mjs";
import { combineChunks_ } from "./combineChunks.mjs";
/**
 * Zips this stream with another point-wise and applies the function to the paired elements.
 *
 * The new stream will end when one of the sides ends.
 *
 * By default pull is executed in parallel to preserve async semanthics, see `zipWithSeq` for
 * a sequential alternative
 */

export function zipWith_(self, that, f) {
  const handleSuccess = (leftUpd, rightUpd, excess) => {
    const [leftExcess, rightExcess] = E.fold_(excess, l => tuple(l, A.empty()), r => tuple(A.empty(), r));
    const [left, right] = [O.fold_(leftUpd, () => leftExcess, upd => A.concat_(leftExcess, upd)), O.fold_(rightUpd, () => rightExcess, upd => A.concat_(rightExcess, upd))];
    const [emit, newExcess] = zipChunks_(left, right, f);

    if (O.isSome(leftUpd) && O.isSome(rightUpd)) {
      return Ex.succeed(Tp.tuple(emit, {
        _tag: "Running",
        excess: newExcess
      }));
    } else if (O.isNone(leftUpd) && O.isNone(rightUpd)) {
      return Ex.fail(O.none);
    } else {
      return Ex.succeed(Tp.tuple(emit, E.fold_(newExcess, l => !A.isEmpty(l) ? {
        _tag: "LeftDone",
        excessL: l
      } : {
        _tag: "End"
      }, r => !A.isEmpty(r) ? {
        _tag: "RightDone",
        excessR: r
      } : {
        _tag: "End"
      })));
    }
  };

  return combineChunks_(self, that, {
    _tag: "Running",
    excess: E.left(A.empty())
  }, (st, p1, p2) => {
    switch (st._tag) {
      case "End":
        {
          return T.succeed(Ex.fail(O.none));
        }

      case "Running":
        {
          return T.catchAllCause_(T.zipWithPar(T.optional(p2), (l, r) => handleSuccess(l, r, st.excess))(T.optional(p1)), e => T.succeed(Ex.halt(C.map(O.some)(e))));
        }

      case "LeftDone":
        {
          return T.catchAllCause_(T.map_(T.optional(p2), r => handleSuccess(O.none, r, E.left(st.excessL))), e => T.succeed(Ex.halt(C.map(O.some)(e))));
        }

      case "RightDone":
        {
          return T.catchAllCause_(T.map_(T.optional(p1), l => handleSuccess(l, O.none, E.right(st.excessR))), e => T.succeed(Ex.halt(C.map(O.some)(e))));
        }
    }
  });
}
/**
 * Zips this stream with another point-wise and applies the function to the paired elements.
 *
 * The new stream will end when one of the sides ends.
 *
 * By default pull is executed in parallel to preserve async semanthics, see `zipWithSeq` for
 * a sequential alternative
 */

export function zipWith(that, f) {
  return self => zipWith_(self, that, f);
}
//# sourceMappingURL=zipWith.mjs.map