"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tuple = tuple;
exports.tuplePar = tuplePar;
exports.tupleParN = tupleParN;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var _index2 = /*#__PURE__*/require("../Tracing/index.js");

var _core = /*#__PURE__*/require("./core.js");

var _api = /*#__PURE__*/require("./methods/api.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Like `forEach` + `identity` with a tuple type
 *
 * @ets_trace call
 */
function tuple(...t) {
  const trace = (0, _index2.accessCallTrace)();
  return (0, _core.map_)((0, _api.collectAll)(t, trace), x => Tp.tuple(...x));
}
/**
 * Like tuple but parallel, same as `forEachPar` + `identity` with a tuple type
 */


function tuplePar(...t) {
  return (0, _core.map_)((0, _api.collectAllPar)(t), x => Tp.tuple(...x));
}
/**
 * Like tuplePar but uses at most n fibers concurrently,
 * same as `forEachParN` + `identity` with a tuple type
 */


function tupleParN(n) {
  return (...t) => (0, _core.map_)((0, _api.collectAllParN_)(t, n, (0, _index2.accessCallTrace)()), x => Tp.tuple(...x));
}
//# sourceMappingURL=tuple.js.map