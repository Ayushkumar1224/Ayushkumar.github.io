// ets_tracing: off

import { identity } from "../../../../Function/index.js"
import type * as C from "../core.js"
import * as ZipAllWith from "./zipAllWith.js"

/**
 * Zips this stream with another point-wise, and keeps only elements from the other stream.
 *
 * The provided default value will be used if this stream ends before the other one.
 */
export function zipAllRight_<R, R1, E, E1, A, A1>(
  self: C.Stream<R, E, A>,
  that: C.Stream<R1, E1, A1>,
  default_: A1
): C.Stream<R & R1, E | E1, A1> {
  return ZipAllWith.zipAllWith_(
    self,
    that,
    (_) => default_,
    identity,
    (_, o) => o
  )
}

/**
 * Zips this stream with another point-wise, and keeps only elements from the other stream.
 *
 * The provided default value will be used if this stream ends before the other one.
 *
 * @ets_data_first zipAllRight_
 */
export function zipAllRight<R1, E1, A1>(that: C.Stream<R1, E1, A1>, default_: A1) {
  return <R, E, A>(self: C.Stream<R, E, A>) => zipAllRight_(self, that, default_)
}
