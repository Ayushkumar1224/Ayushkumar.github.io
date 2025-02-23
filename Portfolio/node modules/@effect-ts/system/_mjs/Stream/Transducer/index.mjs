// ets_tracing: off
import "../../Operator/index.mjs";
import * as Chunk from "../../Collections/Immutable/Chunk/index.mjs";
import * as Map from "../../Collections/Immutable/Map/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as Ex from "../../Exit/index.mjs";
import { not, pipe, tuple } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as RM from "../../RefM/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as R from "../_internal/ref.mjs"; // Contract notes for transducers:
// - When a None is received, the transducer must flush all of its internal state
//   and remain empty until subsequent Some(Chunk) values.
//
//   Stated differently, after a first push(None), all subsequent push(None) must
//   result in empty [].

export class Transducer {
  constructor(push) {
    this.push = push;
  }

}
/**
 * Contract notes for transducers:
 * - When a None is received, the transducer must flush all of its internal state
 *   and remain empty until subsequent Some(Chunk) values.
 *
 *   Stated differently, after a first push(None), all subsequent push(None) must
 *   result in empty [].
 */

export const transducer = push => new Transducer(push);
/**
 * Compose this transducer with another transducer, resulting in a composite transducer.
 */

export const andThen = that => self => transducer(M.zipWith_(self.push, that.push, (pushLeft, pushRight) => O.fold(() => T.chain_(pushLeft(O.none), cl => Chunk.isEmpty(cl) ? pushRight(O.none) : T.zipWith_(pushRight(O.some(cl)), pushRight(O.none), Chunk.concat_)), inputs => T.chain_(pushLeft(O.some(inputs)), cl => pushRight(O.some(cl))))));
/**
 * Transforms the outputs of this transducer.
 */

export function map_(fa, f) {
  return new Transducer(M.map_(fa.push, push => input => T.map_(push(input), Chunk.map(f))));
}
/**
 * Transforms the outputs of this transducer.
 */

export function map(f) {
  return fa => map_(fa, f);
}
/**
 * Transforms the chunks emitted by this transducer.
 */

export function mapChunks_(fa, f) {
  return new Transducer(M.map_(fa.push, push => input => T.map_(push(input), f)));
}
/**
 * Transforms the chunks emitted by this transducer.
 */

export function mapChunks(f) {
  return fa => mapChunks_(fa, f);
}
/**
 * Effectfully transforms the chunks emitted by this transducer.
 */

export function mapChunksM_(fa, f) {
  return new Transducer(M.map_(fa.push, push => input => T.chain_(push(input), f)));
}
/**
 * Effectfully transforms the chunks emitted by this transducer.
 */

export function mapChunksM(f) {
  return fa => mapChunksM_(fa, f);
}
/**
 * Effectually transforms the outputs of this transducer
 */

export function mapM_(fa, f) {
  return new Transducer(M.map_(fa.push, push => input => T.chain_(push(input), Chunk.mapEffect(f))));
}
/**
 * Effectually transforms the outputs of this transducer
 */

export function mapM(f) {
  return fa => mapM_(fa, f);
}
/**
 * Transforms the errors of this transducer.
 */

export function mapError_(pab, f) {
  return new Transducer(M.map_(pab.push, push => is => T.mapError_(push(is), f)));
}
/**
 * Transforms the errors of this transducer.
 */

export function mapError(f) {
  return pab => mapError_(pab, f);
}
/**
 * Creates a transducer that always fails with the specified failure.
 */

export function fail(e) {
  return new Transducer(M.succeed(_ => T.fail(e)));
}
/**
 * Creates a transducer that always dies with the specified exception.
 */

export function die(error) {
  return new Transducer(M.succeed(_ => T.die(error)));
}
/**
 * Creates a transducer that always fails with the specified cause.
 */

export function halt(c) {
  return new Transducer(M.succeed(_ => T.halt(c)));
}
/**
 * The identity transducer. Passes elements through.
 */

export function identity() {
  return fromPush(O.fold(() => T.succeed(Chunk.empty()), T.succeed));
}
/**
 * Creates a transducer from a chunk processing function.
 */

export function fromPush(push) {
  return new Transducer(M.succeed(push));
}
/**
 * Creates a transducer that always evaluates the specified effect.
 */

export function fromEffect(task) {
  return new Transducer(M.succeed(_ => T.map_(task, Chunk.single)));
}
/**
 * Creates a transducer that purely transforms incoming values.
 */

export function fromFunction(f) {
  return map_(identity(), f);
}
/**
 * Creates a transducer that effectfully transforms incoming values.
 */

export function fromFunctionM(f) {
  return mapM_(identity(), f);
}
/**
 * Creates a transducer that returns the first element of the stream, if it exists.
 */

export function head() {
  return foldLeft(O.none, (acc, o) => O.fold_(acc, () => O.some(o), () => acc));
}
/**
 * Creates a transducer that returns the last element of the stream, if it exists.
 */

export function last() {
  return foldLeft(O.none, (_, o) => O.some(o));
}
/**
 * Emits the provided chunk before emitting any other value.
 */

export function prepend(values) {
  return new Transducer(M.map_(R.makeManagedRef(values), state => is => O.fold_(is, () => R.getAndSet_(state, Chunk.empty()), os => T.map_(R.getAndSet_(state, Chunk.empty()), c => Chunk.isEmpty(c) ? os : Chunk.concat_(c, os)))));
}
/**
 * Reads the first n values from the stream and uses them to choose the transducer that will be used for the remainder of the stream.
 * If the stream ends before it has collected n values the partial chunk will be provided to f.
 */

export function branchAfter(n, f) {
  const initialState = {
    _tag: "Collecting",
    data: Chunk.empty()
  };
  const toCollect = Math.max(0, n);
  return new Transducer(M.chain_(M.scope, allocate => M.map_(RM.makeManagedRefM(initialState), state => is => O.fold_(is, () => T.chain_(RM.getAndSet_(state, initialState), s => {
    switch (s._tag) {
      case "Collecting":
        {
          return M.use_(f(s.data).push, f => f(O.none));
        }

      case "Emitting":
        {
          return T.zipLeft_(s.push(O.none), s.finalizer(Ex.unit));
        }
    }
  }), data => RM.modify_(state, s => {
    switch (s._tag) {
      case "Emitting":
        {
          return T.map_(s.push(O.some(data)), _ => Tp.tuple(_, s));
        }

      case "Collecting":
        {
          if (Chunk.isEmpty(data)) {
            return T.succeed(Tp.tuple(Chunk.empty(), s));
          } else {
            const remaining = toCollect - Chunk.size(s.data);

            if (remaining <= Chunk.size(data)) {
              const {
                tuple: [newCollected, remainder]
              } = Chunk.splitAt_(data, remaining);
              return T.chain_(allocate(f(Chunk.concat_(s.data, newCollected)).push), ({
                tuple: [finalizer, push]
              }) => T.map_(push(O.some(remainder)), _ => Tp.tuple(_, {
                _tag: "Emitting",
                finalizer,
                push
              })));
            } else {
              return T.succeed(Tp.tuple(Chunk.empty(), {
                _tag: "Collecting",
                data: Chunk.concat_(s.data, data)
              }));
            }
          }
        }
    }
  })))));
}
/**
 * Creates a transducer that starts consuming values as soon as one fails
 * the predicate `p`.
 */

export function dropWhile(predicate) {
  return new Transducer(M.map_(R.makeManagedRef(true), dropping => is => O.fold_(is, () => T.succeed(Chunk.empty()), is => R.modify_(dropping, b => {
    switch (b) {
      case true:
        {
          const is1 = Chunk.dropWhile_(is, predicate);
          return Tp.tuple(is1, Chunk.isEmpty(is1));
        }

      case false:
        {
          return Tp.tuple(is, false);
        }
    }
  }))));
}
/**
 * Creates a transducer that starts consuming values as soon as one fails
 * the effectful predicate `p`.
 */

export function dropWhileM(p) {
  return new Transducer(M.map_(M.let_(M.bind_(M.do, "dropping", () => R.makeManagedRef(true)), "push", ({
    dropping
  }) => is => O.fold_(is, () => T.succeed(Chunk.empty()), is => T.chain_(T.chain_(dropping.get, b => b ? T.map_(Chunk.dropWhileEffect_(is, p), l => [l, Chunk.isEmpty(l)]) : T.succeed([is, false])), ([is, pt]) => T.as_(dropping.set(pt), is)))), ({
    push
  }) => push));
}

function foldGo(in_, state, progress, initial, contFn, f) {
  return Chunk.reduce_(in_, [Chunk.empty(), state, progress], ([os0, state, _], i) => {
    const o = f(state, i);

    if (contFn(o)) {
      return [os0, o, true];
    } else {
      return [Chunk.append_(os0, o), initial, false];
    }
  });
}
/**
 * Creates a transducer by folding over a structure of type `O` for as long as
 * `contFn` results in `true`. The transducer will emit a value when `contFn`
 * evaluates to `false` and then restart the folding.
 */


export function fold(initial, contFn, f) {
  return new Transducer(M.map_(R.makeManagedRef(O.some(initial)), state => is => O.fold_(is, () => T.map_(R.getAndSet_(state, O.none), O.fold(() => Chunk.empty(), Chunk.single)), in_ => R.modify_(state, s => {
    const [o, s2, progress] = foldGo(in_, O.getOrElse_(s, () => initial), O.isSome(s), initial, contFn, f);

    if (progress) {
      return Tp.tuple(o, O.some(s2));
    } else {
      return Tp.tuple(o, O.none);
    }
  }))));
}
/**
 * Creates a transducer by folding over a structure of type `O`. The transducer will
 * fold the inputs until the stream ends, resulting in a stream with one element.
 */

export function foldLeft(initial, f) {
  return fold(initial, () => true, f);
}
/**
 * Creates a sink by effectfully folding over a structure of type `S`.
 */

export function foldM(initial, contFn, f) {
  const init = O.some(initial);

  const go = (in_, state, progress) => Chunk.reduce_(in_, T.succeed([Chunk.empty(), state, progress]), (b, i) => T.chain_(b, ([os0, state, _]) => T.map_(f(state, i), o => {
    if (contFn(o)) {
      return [os0, o, true];
    } else {
      return [Chunk.append_(os0, o), initial, false];
    }
  })));

  return new Transducer(M.map_(R.makeManagedRef(init), state => is => O.fold_(is, () => T.map_(R.getAndSet_(state, O.none), O.fold(() => Chunk.empty(), Chunk.single)), in_ => T.chain_(T.chain_(state.get, s => go(in_, O.getOrElse_(s, () => initial), O.isSome(s))), ([os, s, progress]) => progress ? T.zipRight_(state.set(O.some(s)), T.succeed(os)) : T.zipRight_(state.set(O.none), T.succeed(os))))));
}
/**
 * Creates a transducer by effectfully folding over a structure of type `O`. The transducer will
 * fold the inputs until the stream ends, resulting in a stream with one element.
 */

export function foldLeftM(initial, f) {
  return foldM(initial, () => true, f);
}
/**
 * Creates a transducer that folds elements of type `I` into a structure
 * of type `O` until `max` elements have been folded.
 *
 * Like `foldWeighted`, but with a constant cost function of 1.
 */

export function foldUntil(initial, max, f) {
  return map(t => t[0])(fold(tuple(initial, 0), ([_, n]) => n < max, ([o, count], i) => [f(o, i), count + 1]));
}
/**
 * Creates a transducer that effectfully folds elements of type `I` into a structure
 * of type `O` until `max` elements have been folded.
 *
 * Like `foldWeightedM`, but with a constant cost function of 1.
 */

export function foldUntilM(initial, max, f) {
  return map(t => t[0])(foldM(tuple(initial, 0), ([_, n]) => n < max, ([o, count], i) => T.map_(f(o, i), o => [o, count + 1])));
}
/**
 * Creates a transducer that folds elements of type `I` into a structure
 * of type `O`, until `max` worth of elements (determined by the `costFn`)
 * have been folded.
 *
 * The `decompose` function will be used for decomposing elements that
 * cause an `O` aggregate to cross `max` into smaller elements.
 *
 * Be vigilant with this function, it has to generate "simpler" values
 * or the fold may never end. A value is considered indivisible if
 * `decompose` yields the empty chunk or a single-valued chunk. In
 * these cases, there is no other choice than to yield a value that
 * will cross the threshold.
 *
 * The foldWeightedDecomposeM allows the decompose function
 * to return an `Effect` value, and consequently it allows the transducer
 * to fail.
 */

export function foldWeightedDecompose(initial, costFn, max, decompose, f) {
  const initialState = {
    result: initial,
    cost: 0
  };

  const go = (in_, os0, state, dirty) => Chunk.reduce_(in_, [os0, state, dirty], ([os0, state, _], i) => {
    const total = state.cost + costFn(state.result, i);

    if (total > max) {
      const is = decompose(i);

      if (Chunk.size(is) <= 1 && !dirty) {
        return [Chunk.append_(os0, f(state.result, !Chunk.isEmpty(is) ? Chunk.unsafeGet_(is, 0) : i)), initialState, false];
      } else if (Chunk.size(is) <= 1 && dirty) {
        const elem = !Chunk.isEmpty(is) ? Chunk.unsafeGet_(is, 0) : i;
        return [Chunk.append_(os0, state.result), {
          result: f(initialState.result, elem),
          cost: costFn(initialState.result, elem)
        }, true];
      } else {
        return go(is, os0, state, dirty);
      }
    } else {
      return [os0, {
        result: f(state.result, i),
        cost: total
      }, true];
    }
  });

  return new Transducer(M.map_(R.makeManagedRef(O.some(initialState)), state => is => O.fold_(is, () => T.map_(R.getAndSet_(state, O.none), O.fold(() => Chunk.empty(), s => Chunk.single(s.result))), in_ => R.modify_(state, s => {
    const [o, s2, dirty] = go(in_, Chunk.empty(), O.getOrElse_(s, () => initialState), O.isSome(s));

    if (dirty) {
      return Tp.tuple(o, O.some(s2));
    } else {
      return Tp.tuple(o, O.none);
    }
  }))));
}
/**
 * Creates a transducer that effectfully folds elements of type `I` into a structure
 * of type `S`, until `max` worth of elements (determined by the `costFn`) have
 * been folded.
 *
 * The `decompose` function will be used for decomposing elements that
 * cause an `S` aggregate to cross `max` into smaller elements. Be vigilant with
 * this function, it has to generate "simpler" values or the fold may never end.
 * A value is considered indivisible if `decompose` yields the empty chunk or a
 * single-valued chunk. In these cases, there is no other choice than to yield
 * a value that will cross the threshold.
 *
 * See foldWeightedDecompose for an example.
 */

export function foldWeightedDecomposeM(initial, costFn, max, decompose, f) {
  const initialState = {
    result: initial,
    cost: 0
  };

  const go = (in_, os, state, dirty) => Chunk.reduce_(in_, T.succeed([os, state, dirty]), (o, i) => T.chain_(o, ([os, state, _]) => T.chain_(costFn(state.result, i), cost => {
    const total = cost + state.cost;

    if (total > max) {
      return T.chain_(decompose(i), is => {
        if (Chunk.size(is) <= 1 && !dirty) {
          return T.map_(f(state.result, !Chunk.isEmpty(is) ? Chunk.unsafeGet_(is, 0) : i), o => [Chunk.append_(os, o), initialState, false]);
        } else if (Chunk.size(is) <= 1 && dirty) {
          const elem = !Chunk.isEmpty(is) ? Chunk.unsafeGet_(is, 0) : i;
          return T.zipWith_(f(initialState.result, elem), costFn(initialState.result, elem), (result, cost) => [Chunk.append_(os, state.result), {
            result,
            cost
          }, true]);
        } else {
          return go(is, os, state, dirty);
        }
      });
    } else {
      return T.map_(f(state.result, i), o => [os, {
        result: o,
        cost: total
      }, true]);
    }
  })));

  return new Transducer(M.map_(R.makeManagedRef(O.some(initialState)), state => is => O.fold_(is, () => T.map_(R.getAndSet_(state, O.none), O.fold(() => Chunk.empty(), s => Chunk.single(s.result))), in_ => T.chain_(T.chain_(state.get, s => go(in_, Chunk.empty(), O.getOrElse_(s, () => initialState), O.isSome(s))), ([os, s, dirty]) => dirty ? T.zipRight_(state.set(O.some(s)), T.succeed(os)) : T.zipRight_(state.set(O.none), T.succeed(os))))));
}
/**
 * Creates a transducer that folds elements of type `I` into a structure
 * of type `O`, until `max` worth of elements (determined by the `costFn`)
 * have been folded.
 *
 * @note Elements that have an individual cost larger than `max` will
 * force the transducer to cross the `max` cost. See `foldWeightedDecompose`
 * for a variant that can handle these cases.
 */

export function foldWeighted(initial, costFn, max, f) {
  return foldWeightedDecompose(initial, costFn, max, Chunk.single, f);
}

function collectAllNGo(n, in_, leftover, acc) {
  // eslint-disable-next-line no-constant-condition
  while (1) {
    const {
      tuple: [left, nextIn]
    } = Chunk.splitAt_(in_, n - Chunk.size(leftover));
    if (Chunk.size(leftover) + Chunk.size(left) < n) return Tp.tuple(acc, Chunk.concat_(leftover, left));else {
      const nextOut = !Chunk.isEmpty(leftover) ? Chunk.append_(acc, Chunk.concat_(leftover, left)) : Chunk.append_(acc, left);
      in_ = nextIn;
      leftover = Chunk.empty();
      acc = nextOut;
    }
  }

  throw new Error("Bug");
}
/**
 * Creates a transducer accumulating incoming values into chunks of maximum size `n`.
 */


export function collectAllN(n) {
  return new Transducer(M.map_(R.makeManagedRef(Chunk.empty()), state => is => O.fold_(is, () => T.map_(R.getAndSet_(state, Chunk.empty()), leftover => !Chunk.isEmpty(leftover) ? Chunk.single(leftover) : Chunk.empty()), in_ => R.modify_(state, leftover => collectAllNGo(n, in_, leftover, Chunk.empty())))));
}
/**
 * Creates a transducer accumulating incoming values into maps of up to `n` keys. Elements
 * are mapped to keys using the function `key`; elements mapped to the same key will
 * be merged with the function `f`.
 */

export function collectAllToMapN(n, key, merge) {
  return filter(not(Map.isEmpty))(foldWeighted(Map.empty, (acc, i) => acc.has(key(i)) ? 0 : 1, n, (acc, i) => {
    const k = key(i);
    if (acc.has(k)) return Map.insert(k, merge(acc.get(k), i))(acc);else return Map.insert(k, i)(acc);
  }));
}
/**
 * Accumulates incoming elements into a chunk as long as they verify predicate `p`.
 */

export function collectAllWhile(p) {
  return filter(x => !Chunk.isEmpty(x))(map(t => t[0])(fold([Chunk.empty(), true], t => t[1], ([is, _], i) => p(i) ? [Chunk.append_(is, i), true] : [is, false])));
}
/**
 * Accumulates incoming elements into a chunk as long as they verify effectful predicate `p`.
 */

export function collectAllWhileM(p) {
  return filter(x => !Chunk.isEmpty(x))(map(t => t[0])(foldM([Chunk.empty(), true], t => t[1], ([is, _], i) => T.map_(p(i), b => b ? [Chunk.append_(is, i), true] : [is, false]))));
}
export function filter_(fa, predicate) {
  return new Transducer(M.map_(fa.push, push => is => T.map_(push(is), Chunk.filter(predicate))));
}
export function filter(predicate) {
  return fa => filter_(fa, predicate);
}
export function filterInput_(fa, predicate) {
  return new Transducer(M.map_(fa.push, push => is => push(O.map_(is, Chunk.filter(predicate)))));
}
export function filterInput(predicate) {
  return fa => filterInput_(fa, predicate);
}
/**
 * Effectually filters the inputs of this transducer.
 */

export function filterInputM_(fa, predicate) {
  return new Transducer(M.map_(fa.push, push => is => O.fold_(is, () => push(O.none), x => T.chain_(Chunk.filterEffect_(x, predicate), in_ => push(O.some(in_))))));
}
/**
 * Effectually filters the inputs of this transducer.
 */

export function filterInputM(predicate) {
  return fa => filterInputM_(fa, predicate);
}
/**
 * Creates a transducer produced from an effect.
 */

export function unwrap(effect) {
  return unwrapManaged(T.toManaged(effect));
}
/**
 * Creates a transducer produced from a managed effect.
 */

export function unwrapManaged(managed) {
  return new Transducer(M.chain_(M.fold_(managed, err => fail(err), _ => _), _ => _.push));
}
//# sourceMappingURL=index.mjs.map