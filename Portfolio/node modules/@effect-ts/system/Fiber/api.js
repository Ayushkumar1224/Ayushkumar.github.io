"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.as = as;
exports.asUnit = asUnit;
exports.await = wait;
exports.collectAll = collectAll;
exports.done = done;
exports.fail = fail;
exports.fold = fold;
exports.fromEffect = fromEffect;
exports.halt = halt;
exports.interruptAll = interruptAll;
exports.interruptAllAs = interruptAllAs;
exports.interruptAs = interruptAs;
exports.interruptFork = interruptFork;
exports.joinAll = joinAll;
exports.makeSynthetic = makeSynthetic;
exports.map = map;
exports.mapFiber = mapFiber;
exports.mapFiber_ = mapFiber_;
exports.mapM = mapM;
exports.map_ = map_;
exports.never = void 0;
exports.orElse = orElse;
exports.orElseEither = orElseEither;
exports.succeed = succeed;
exports.toManaged = toManaged;
exports.unit = void 0;
exports.waitAll = waitAll;
exports.zipLeft_ = zipLeft_;
exports.zipRight_ = zipRight_;
exports.zipWith_ = zipWith_;
exports.zip_ = zip_;

var Cause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Cause/core.js"));

var _reduceRight = /*#__PURE__*/require("../Collections/Immutable/Chunk/api/reduceRight.js");

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/core.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var Exit = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Exit/api.js"));

var _index2 = /*#__PURE__*/require("../Function/index.js");

var IT = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Iterable/index.js"));

var _core3 = /*#__PURE__*/require("../Managed/core.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./_internal/effect-api.js"));

var Fiber = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var _interrupt = /*#__PURE__*/require("./interrupt.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Lifts an IO into a `Fiber`.
 */
function fromEffect(effect) {
  return T.map_(T.result(effect), done);
}
/**
 * Interrupts all fibers as by the specified fiber, awaiting their interruption.
 */


function interruptAllAs(id) {
  return fs => IT.reduce_(fs, T.unit, (io, f) => T.asUnit(T.chain_(io, () => f.interruptAs(id))));
}
/**
 * Interrupts all fibers, awaiting their interruption.
 */


function interruptAll(fs) {
  return T.chain_(T.fiberId, id => interruptAllAs(id)(fs));
}
/**
 * Interrupts the fiber from whichever fiber is calling this method. The
 * interruption will happen in a separate daemon fiber, and the returned
 * effect will always resume immediately without waiting.
 */


function interruptFork(fiber) {
  return T.asUnit(T.forkDaemon((0, _interrupt.interrupt)(fiber)));
}
/**
 * Effectually maps over the value the fiber computes.
 */


function mapM(f) {
  return fiber => ({
    await: T.chain_(fiber.await, Exit.forEach(f)),
    getRef: ref => fiber.getRef(ref),
    inheritRefs: fiber.inheritRefs,
    interruptAs: id => T.chain_(fiber.interruptAs(id), Exit.forEach(f)),
    poll: T.chain_(fiber.poll, O.fold(() => T.succeed(O.none), a => T.map_(Exit.forEach_(a, f), O.some)))
  });
}
/**
 * Maps over the value the fiber computes.
 */


function map(f) {
  return mapM(a => T.succeed(f(a)));
}
/**
 * Joins all fibers, awaiting their _successful_ completion.
 * Attempting to join a fiber that has erred will result in
 * a catchable error, _if_ that error does not result from interruption.
 */


function joinAll(as) {
  return T.tap_(T.chain_(waitAll(as), T.done), () => T.forEach_(as, f => f.inheritRefs));
}
/**
 * Awaits on all fibers to be completed, successfully or not.
 */


function waitAll(as) {
  return T.result(T.forEachPar_(as, f => T.chain_(f.await, T.done)));
}
/**
 * Maps over the value the fiber computes.
 */


function map_(fiber, f) {
  return map(f)(fiber);
}
/**
 * Passes the success of this fiber to the specified callback, and continues
 * with the fiber that it returns.
 */


function mapFiber(f) {
  return fiber => T.map_(fiber.await, e => {
    switch (e._tag) {
      case "Success":
        {
          return f(e.value);
        }

      case "Failure":
        {
          return halt(e.cause);
        }
    }
  });
}
/**
 * Passes the success of this fiber to the specified callback, and continues
 * with the fiber that it returns.
 */


function mapFiber_(fiber, f) {
  return T.map_(fiber.await, e => {
    switch (e._tag) {
      case "Success":
        {
          return f(e.value);
        }

      case "Failure":
        {
          return halt(e.cause);
        }
    }
  });
}
/**
 * Returns a fiber that prefers `this` fiber, but falls back to the
 * `that` one when `this` one fails. Interrupting the returned fiber
 * will interrupt both fibers, sequentially, from left to right.
 */


function orElse(that) {
  return fiber => ({
    await: T.zipWith_(fiber.await, that.await, (a, b) => a._tag === "Success" ? a : b),
    getRef: ref => T.zipWith_(fiber.getRef(ref), that.getRef(ref), (a, b) => a === ref.initial ? b : a),
    inheritRefs: T.chain_(fiber.inheritRefs, () => that.inheritRefs),
    interruptAs: id => T.chain_(fiber.interruptAs(id), () => that.interruptAs(id)),
    poll: T.zipWith_(fiber.poll, that.poll, (a, b) => {
      switch (a._tag) {
        case "Some":
          {
            return a.value._tag === "Success" ? a : b;
          }

        case "None":
          {
            return O.none;
          }
      }
    })
  });
}
/**
 * Returns a fiber that prefers `this` fiber, but falls back to the
 * `that` one when `this` one fails. Interrupting the returned fiber
 * will interrupt both fibers, sequentially, from left to right.
 */


function orElseEither(that) {
  return fiber => orElse(map_(that, E.right))(map_(fiber, E.left));
}
/**
 * Maps the output of this fiber to the specified constant.
 */


function as(b) {
  return fiber => map_(fiber, () => b);
}
/**
 * Maps the output of this fiber to `void`.
 */


function asUnit(fiber) {
  return map_(fiber, () => undefined);
}
/**
 * Zips this fiber with the specified fiber, combining their results using
 * the specified combiner function. Both joins and interruptions are performed
 * in sequential order from left to right.
 */


function zipWith_(fiberA, fiberB, f) {
  return {
    getRef: ref => T.zipWith_(fiberA.getRef(ref), fiberB.getRef(ref), (a, b) => ref.join(a, b)),
    inheritRefs: T.chain_(fiberA.inheritRefs, () => fiberB.inheritRefs),
    interruptAs: id => T.zipWith_(fiberA.interruptAs(id), fiberB.interruptAs(id), (ea, eb) => Exit.zipWith_(ea, eb, f, Cause.combinePar)),
    poll: T.zipWith_(fiberA.poll, fiberB.poll, (oa, ob) => O.chain_(oa, ea => O.map_(ob, eb => Exit.zipWith_(ea, eb, f, Cause.combinePar)))),
    await: T.result(T.zipWithPar_(T.chain_(fiberA.await, T.done), T.chain_(fiberB.await, T.done), f))
  };
}
/**
 * Zips this fiber and the specified fiber together, producing a tuple of their output.
 */


function zip_(fiberA, fiberB) {
  return zipWith_(fiberA, fiberB, (a, b) => [a, b]);
}
/**
 * Same as `zip` but discards the output of the left hand side.
 */


function zipRight_(fiberA, fiberB) {
  return zipWith_(fiberA, fiberB, (_, b) => b);
}
/**
 * Same as `zip` but discards the output of the right hand side.
 */


function zipLeft_(fiberA, fiberB) {
  return zipWith_(fiberA, fiberB, (a, _) => a);
}
/**
 * Collects all fibers into a single fiber producing an in-order list of the
 * results.
 */


function collectAll(fibers) {
  return {
    getRef: ref => T.reduce_(fibers, ref.initial, (a, fiber) => T.map_(fiber.getRef(ref), a2 => ref.join(a, a2))),
    inheritRefs: T.forEachUnit_(fibers, f => f.inheritRefs),
    interruptAs: fiberId => T.map_(T.forEach_(fibers, f => f.interruptAs(fiberId)), (0, _reduceRight.reduceRight)(Exit.succeed(Chunk.empty()), (a, b) => Exit.zipWith_(a, b, (_a, _b) => Chunk.prepend_(_b, _a), Cause.combinePar))),
    poll: T.map_(T.forEach_(fibers, f => f.poll), (0, _reduceRight.reduceRight)(O.some(Exit.succeed(Chunk.empty())), (a, b) => O.fold_(a, () => O.none, ra => O.fold_(b, () => O.none, rb => O.some(Exit.zipWith_(ra, rb, (_a, _b) => Chunk.prepend_(_b, _a), Cause.combinePar)))))),
    await: waitAll(fibers)
  };
}
/**
 * @ets_optimize identity
 */


function makeSynthetic(_) {
  return new Fiber.Synthetic(_.await, _.getRef, _.inheritRefs, _.interruptAs, _.poll);
}
/**
 * Folds over the runtime or synthetic fiber.
 */


function fold(runtime, syntetic) {
  return fiber => {
    switch (fiber._tag) {
      case "RuntimeFiber":
        {
          return runtime(fiber);
        }

      case "SyntheticFiber":
        {
          return syntetic(fiber);
        }
    }
  };
}
/**
 * A fiber that is done with the specified `Exit` value.
 */


function done(exit) {
  return {
    await: T.succeed(exit),
    getRef: ref => T.succeed(ref.initial),
    inheritRefs: T.unit,
    interruptAs: () => T.succeed(exit),
    poll: T.succeed(O.some(exit))
  };
}
/**
 * Returns a fiber that has already succeeded with the specified value.
 */


function succeed(a) {
  return done(Exit.succeed(a));
}
/**
 * A fiber that has already failed with the specified value.
 */


function fail(e) {
  return done(Exit.fail(e));
}
/**
 * Creates a `Fiber` that is halted with the specified cause.
 */


function halt(cause) {
  return done(Exit.halt(cause));
}
/**
 * A fiber that is already interrupted.
 */


function interruptAs(id) {
  return done(Exit.interrupt(id));
}

function toManaged(fiber) {
  return (0, _core3.make)(_interrupt.interrupt)(T.succeed(fiber));
}
/**
 * A fiber that never fails or succeeds.
 */


const never = {
  await: T.never,
  getRef: fiberRef => T.succeed(fiberRef.initial),
  interruptAs: /*#__PURE__*/(0, _index2.constant)(T.never),
  inheritRefs: T.unit,
  poll: /*#__PURE__*/T.succeed(O.none)
};
/**
 * A fiber that has already succeeded with unit.
 */

exports.never = never;
const unit = /*#__PURE__*/succeed(undefined);
/**
 * Awaits the fiber, which suspends the awaiting fiber until the result of the fiber has been determined.
 */

exports.unit = unit;

function wait(fiber) {
  return fiber.await;
}
//# sourceMappingURL=api.js.map