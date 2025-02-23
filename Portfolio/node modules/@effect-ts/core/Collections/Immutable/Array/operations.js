"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  forEachWithIndexF: true,
  forEachF: true,
  separateF: true,
  separateWithIndexF: true,
  compactF: true,
  compactWithIndexF: true,
  elem: true,
  elem_: true,
  difference_: true,
  difference: true,
  getEqual: true,
  getIdentity: true,
  getOrd: true,
  getShow: true,
  intersection_: true,
  intersection: true,
  foldMap: true,
  foldMap_: true,
  foldMapWithIndex: true,
  foldMapWithIndex_: true,
  sort: true,
  sortBy: true,
  union_: true,
  union: true,
  uniq: true,
  partition: true,
  partition_: true,
  partitionMap: true,
  partitionMap_: true,
  partitionMapWithIndex_: true,
  partitionMapWithIndex: true,
  partitionWithIndex: true,
  partitionWithIndex_: true
};
exports.compactWithIndexF = exports.compactF = void 0;
exports.difference = difference;
exports.difference_ = difference_;
exports.elem = elem;
exports.elem_ = elem_;
exports.foldMap = foldMap;
exports.foldMapWithIndex = foldMapWithIndex;
exports.foldMapWithIndex_ = foldMapWithIndex_;
exports.foldMap_ = foldMap_;
exports.forEachWithIndexF = exports.forEachF = void 0;
exports.getEqual = getEqual;
exports.getIdentity = getIdentity;
exports.getOrd = getOrd;
exports.getShow = getShow;
exports.intersection = intersection;
exports.intersection_ = intersection_;
exports.partition = partition;
exports.partitionMap = partitionMap;
exports.partitionMapWithIndex = partitionMapWithIndex;
exports.partitionMapWithIndex_ = partitionMapWithIndex_;
exports.partitionMap_ = partitionMap_;
exports.partitionWithIndex = partitionWithIndex;
exports.partitionWithIndex_ = partitionWithIndex_;
exports.partition_ = partition_;
exports.separateWithIndexF = exports.separateF = void 0;
exports.sort = sort;
exports.sortBy = sortBy;
exports.union = union;
exports.union_ = union_;
exports.uniq = uniq;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Collections/Immutable/Array"));

Object.keys(A).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === A[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return A[key];
    }
  });
});

var _Function = /*#__PURE__*/require("@effect-ts/system/Function");

var _index = /*#__PURE__*/require("../../../Equal/index.js");

var _index2 = /*#__PURE__*/require("../../../Identity/index.js");

var Ord = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Ord/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Prelude/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Chunk/operations.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Tuple/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * `ForEachWithIndex`'s `forEachWithIndexF` function
 */
const forEachWithIndexF = /*#__PURE__*/P.implementForEachWithIndexF()(_ => G => f => fa => G.map(C.toArray)(C.forEachWithIndexF(G)(f)(C.from(fa))));
/**
 * `ForEach`'s `forEachF` function
 */

exports.forEachWithIndexF = forEachWithIndexF;
const forEachF = /*#__PURE__*/P.implementForEachF()(_ => G => f => forEachWithIndexF(G)((_, a) => f(a)));
/**
 * `Wilt`'s `separateF` function
 */

exports.forEachF = forEachF;
const separateF = /*#__PURE__*/P.implementSeparateF()(_ => G => f => x => G.map(A.separate)(forEachF(G)(f)(x)));
/**
 * `Wilt`'s `separateF` function
 */

exports.separateF = separateF;
const separateWithIndexF = /*#__PURE__*/P.implementSeparateWithIndexF()(_ => G => f => x => G.map(A.separate)(forEachWithIndexF(G)(f)(x)));
/**
 * `Wither`'s `compactF` function
 */

exports.separateWithIndexF = separateWithIndexF;
const compactF = /*#__PURE__*/P.implementCompactF()(_ => G => f => x => G.map(A.compact)(forEachF(G)(f)(x)));
/**
 * `WitherWithIndex`'s `compactWithIndexF` function
 */

exports.compactF = compactF;
const compactWithIndexF = /*#__PURE__*/P.implementCompactWithIndexF()(_ => G => f => x => G.map(A.compact)(forEachWithIndexF(G)(f)(x)));
/**
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Array<A>`.
 */

exports.compactWithIndexF = compactWithIndexF;

function elem(E) {
  const elemE = elem_(E);
  return a => as => elemE(as, a);
}
/**
 * Test if a value is a member of an array. Takes a `Equal<A>` as a single
 * argument which returns the function to use to search for a value of type `A` in
 * an array of type `Array<A>`.
 */


function elem_(E) {
  return (as, a) => {
    const predicate = element => E.equals(element, a);

    let i = 0;
    const len = as.length;

    for (; i < len; i++) {
      if (predicate(as[i])) {
        return true;
      }
    }

    return false;
  };
}
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */


function difference_(E) {
  const elemE = elem_(E);
  return (xs, ys) => xs.filter(a => !elemE(ys, a));
}
/**
 * Creates an array of array values not included in the other given array using a `Equal` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */


function difference(E) {
  const elemE = elem_(E);
  return ys => xs => xs.filter(a => !elemE(ys, a));
}
/**
 * Derives an `Equal` over the `Array` of a given element type from the `Equal` of that type. The derived `Equal` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
 * different lengths, the result is non equality.
 */


function getEqual(E) {
  return (0, _index.makeEqual)((xs, ys) => xs === ys || xs.length === ys.length && xs.every((x, i) => E.equals(x, ys[i])));
}
/**
 * Returns a `Identity` for `Array<A>`
 */


function getIdentity() {
  return (0, _index2.makeIdentity)(A.empty(), A.concat_);
}
/**
 * Returns a `Ord` for `Array<A>` given `Ord<A>`
 */


function getOrd(O) {
  return Ord.makeOrd((a, b) => {
    const aLen = a.length;
    const bLen = b.length;
    const len = Math.min(aLen, bLen);

    for (let i = 0; i < len; i++) {
      const ordering = O.compare(a[i], b[i]);

      if (ordering !== 0) {
        return ordering;
      }
    }

    return Ord.number.compare(aLen, bLen);
  });
}
/**
 * Returns a `Show` for `Array<A>` given `Show<A>`
 */


function getShow(S) {
  return {
    show: as => `[${as.map(S.show).join(", ")}]`
  };
}
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */


function intersection_(E) {
  const elemE = elem_(E);
  return (xs, ys) => xs.filter(a => elemE(ys, a));
}
/**
 * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first array.
 */


function intersection(E) {
  const int = intersection_(E);
  return ys => xs => int(xs, ys);
}
/**
 * Fold Identity with a mapping function
 */


function foldMap(M) {
  return f => foldMapWithIndex(M)((_, a) => f(a));
}
/**
 * Fold Identity with a mapping function
 */


function foldMap_(M) {
  return (fa, f) => foldMapWithIndex_(M)(fa, (_, a) => f(a));
}
/**
 * Fold Identity with a mapping function that consider also the index
 */


function foldMapWithIndex(M) {
  return f => fa => foldMapWithIndex_(M)(fa, f);
}
/**
 * Fold Identity with a mapping function that consider also the index
 */


function foldMapWithIndex_(M) {
  return (fa, f) => fa.reduce((b, a, i) => M.combine(b, f(i, a)), M.identity);
}
/**
 * Sort the elements of an array in increasing order
 */


function sort(O) {
  return as => [...as].sort((x, y) => O.compare(x, y));
}
/**
 * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`,
 * then `ords[1]`, then `ords[2]`, etc...
 */


function sortBy(ords) {
  const M = Ord.getIdentity();
  return sort(ords.reduce((x, y) => M.combine(x, y), M.identity));
}
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 */


function union_(E) {
  const elemE = elem_(E);
  return (xs, ys) => A.concat_(xs, ys.filter(a => !elemE(xs, a)));
}
/**
 * Creates an array of unique values, in order, from all given arrays using a `Equal` for equality comparisons
 */


function union(E) {
  const un = union_(E);
  return ys => xs => un(xs, ys);
}
/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 */


function uniq(E) {
  const elemS = elem_(E);
  return as => {
    const r = [];
    const len = as.length;
    let i = 0;

    for (; i < len; i++) {
      const a = as[i];

      if (!elemS(r, a)) {
        r.push(a);
      }
    }

    return len === r.length ? as : r;
  };
}
/**
 * Separate elements based on a apredicate
 */


function partition(predicate) {
  return fa => partitionWithIndex((_, a) => predicate(a))(fa);
}
/**
 * Separate elements based on a apredicate
 */


function partition_(fa, predicate) {
  return partitionWithIndex((_, a) => predicate(a))(fa);
}
/**
 * Separate elements based on a map function
 */


function partitionMap(f) {
  return partitionMapWithIndex((_, a) => f(a));
}
/**
 * Separate elements based on a map function
 */


function partitionMap_(fa, f) {
  return partitionMapWithIndex_(fa, (_, a) => f(a));
}
/**
 * Separate elements based on a map function that also carry the index
 */


function partitionMapWithIndex_(fa, f) {
  const left = [];
  const right = [];

  for (let i = 0; i < fa.length; i++) {
    const e = f(i, fa[i]);

    if (e._tag === "Left") {
      left.push(e.left);
    } else {
      right.push(e.right);
    }
  }

  return Tp.tuple(left, right);
}
/**
 * Separate elements based on a map function that also carry the index
 */


function partitionMapWithIndex(f) {
  return fa => partitionMapWithIndex_(fa, f);
}
/**
 * Separate elements based on a predicate that also carry the index
 */


function partitionWithIndex(predicateWithIndex) {
  return fa => partitionWithIndex_(fa, predicateWithIndex);
}
/**
 * Separate elements based on a predicate that also carry the index
 */


function partitionWithIndex_(fa, predicateWithIndex) {
  const left = [];
  const right = [];

  for (let i = 0; i < fa.length; i++) {
    const a = fa[i];

    if (predicateWithIndex(i, a)) {
      right.push(a);
    } else {
      left.push(a);
    }
  }

  return Tp.tuple(left, right);
}
//# sourceMappingURL=operations.js.map