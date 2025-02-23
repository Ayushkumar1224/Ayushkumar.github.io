import * as E from "../../../../Either/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as Collect from "./collect.mjs";
import * as RepeatElementsEither from "./repeatElementsEither.mjs";
/**
 * Repeats each element of the stream using the provided schedule. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 */

export function repeatElements_(self, schedule) {
  return Collect.collect_(RepeatElementsEither.repeatElementsEither_(self, schedule), E.fold(() => O.none, a => O.some(a)));
}
/**
 * Repeats each element of the stream using the provided schedule. Repetitions are done in
 * addition to the first execution, which means using `Schedule.recurs(1)` actually results in
 * the original effect, plus an additional recurrence, for a total of two repetitions of each
 * value in the stream.
 *
 * @ets_data_first repeatElements_
 */

export function repeatElements(schedule) {
  return self => repeatElements_(self, schedule);
}
//# sourceMappingURL=repeatElements.mjs.map